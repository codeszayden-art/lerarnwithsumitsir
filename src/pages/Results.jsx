import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// import './Results.css'

/**
 * Route:  <Route path='/results' element={<Results />} />
 *
 * Images are loaded automatically from folders (no file names need to be written in code):
 *   src/assets/images/results/banner.jpg      -> banner background image (file name must start with "banner")
 *   src/assets/images/results/rankers/        -> Top Rankers slider
 *   src/assets/images/results/champions/      -> Champions Who Made Us Proud slider
 *   src/assets/images/results/services/       -> Services Entries slider
 *   src/assets/images/results/graduate/       -> Graduate Entries slider
 * Images appear in each slider in file-name order (01.jpg, 02.jpg ... or 1.jpg, 2.jpg ...).
 */
const files = import.meta.glob('/src/assets/**/results/**/*.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' })
const ALL = Object.entries(files).map(([path, url]) => ({ path, url, name: path.split('/').pop() }))

const nat = (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
const altOf = (name, i) => {
  const base = name.replace(/\.[a-z0-9]+$/i, '').replace(/[-_]+/g, ' ').trim()
  return /^\d+$/.test(base) || !base ? `Result poster ${i + 1}` : base
}
const pick = (folder) =>
  ALL.filter((f) => new RegExp(`/results/${folder}/`).test(f.path)).sort(nat).map((f, i) => ({ src: f.url, alt: altOf(f.name, i) }))

const BANNER = (ALL.find((f) => /\/results\/banner[^/]*$/i.test(f.path)) || {}).url

const EYEBROW = 'Excellence in NDA, TES & NCC Selections'
const SECTIONS = [
  { id: 'rankers', folder: 'rankers', title: 'Top Rankers in NDA 156 (NDA 2 2025)', items: pick('rankers') },
  { id: 'champions', folder: 'champions', eyebrow: EYEBROW, title: ['Champions', 'Who Made Us Proud'], items: pick('champions') },
  { id: 'services', folder: 'services', eyebrow: EYEBROW, title: ['Services', 'Entries'], items: pick('services') },
  { id: 'graduate', folder: 'graduate', eyebrow: EYEBROW, title: ['Graduate', 'Entries'], items: pick('graduate') },
]

const Ic = ({ d, s = 18, w = 2.4 }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
)
const LEFT = 'M19 12H5M11 6l-6 6 6 6'
const RIGHT = 'M5 12h14M13 6l6 6-6 6'
const CLOSE = 'M6 6l12 12M18 6L6 18'
const ZOOM = 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.5-4.5M11 8v6M8 11h6'

const getPv = () => {
  if (typeof window === 'undefined') return 5
  const w = window.innerWidth
  return w >= 1100 ? 5 : w >= 860 ? 4 : w >= 600 ? 3 : 2
}

/* Poster slider: swipe, arrows, dots and autoplay (autoplay pauses on hover, touch or while the lightbox is open) */
function Slider({ items, label, paused, onOpen }) {
  const track = useRef(null)
  const holdUntil = useRef(0)
  const [pv, setPv] = useState(getPv)
  const [idx, setIdx] = useState(0)
  const max = Math.max(0, items.length - pv)
  const canSlide = max > 0

  useEffect(() => {
    const onResize = () => setPv(getPv())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (track.current) track.current.scrollTo({ left: 0 })
    setIdx(0)
  }, [pv])

  const step = () => {
    const t = track.current
    if (!t || t.children.length < 2) return 0
    return t.children[1].offsetLeft - t.children[0].offsetLeft
  }

  const go = (i) => {
    const t = track.current
    if (!t) return
    const n = Math.min(Math.max(i, 0), max)
    t.scrollTo({ left: n * step(), behavior: 'smooth' })
    setIdx(n)
  }

  const onScroll = () => {
    const s = step()
    if (!s || !track.current) return
    setIdx(Math.min(Math.round(track.current.scrollLeft / s), max))
  }

  useEffect(() => {
    if (!canSlide || paused) return undefined
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const id = setInterval(() => {
      if (document.hidden || Date.now() < holdUntil.current) return
      go(idx >= max ? 0 : idx + 1)
    }, 3500)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, max, canSlide, paused])

  const hold = (ms) => { holdUntil.current = Date.now() + ms }

  return (
    <div
      className={'rsp-sl' + (canSlide ? '' : ' is-static')}
      style={{ '--pv': pv }}
      onMouseEnter={() => hold(1e9)}
      onMouseLeave={() => hold(1500)}
      onFocus={() => hold(1e9)}
      onBlur={() => hold(1500)}
      onTouchStart={() => hold(9000)}
    >
      <div className="rsp-track" ref={track} onScroll={onScroll} role="region" aria-roledescription="carousel" aria-label={label}>
        {items.map((it, i) => (
          <div className="rsp-slide" key={it.src}>
            <button type="button" className="rsp-card" onClick={() => onOpen(i)} aria-label={`View larger: ${it.alt}`}>
              <img src={it.src} alt={it.alt} loading="lazy" decoding="async" />
              <span className="rsp-zoom"><Ic d={ZOOM} s={18} w={2} /></span>
            </button>
          </div>
        ))}
      </div>

      {canSlide && (
        <>
          <button type="button" className="rsp-nav prev" aria-label="Previous" onClick={() => go(idx <= 0 ? max : idx - 1)}><Ic d={LEFT} /></button>
          <button type="button" className="rsp-nav next" aria-label="Next" onClick={() => go(idx >= max ? 0 : idx + 1)}><Ic d={RIGHT} /></button>
          <div className="rsp-dots">
            {Array.from({ length: max + 1 }, (_, i) => (
              <button key={i} type="button" className={i === idx ? 'on' : ''} aria-label={`Go to position ${i + 1}`} aria-current={i === idx} onClick={() => go(i)} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* Large preview: clicking a poster opens it bigger; use arrows or Esc to control */
function Lightbox({ items, index, onClose, onGo }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onGo(index + 1)
      else if (e.key === 'ArrowLeft') onGo(index - 1)
    }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey) }
  }, [index, onClose, onGo])

  const it = items[index]
  return (
    <div className="rsp-lb" role="dialog" aria-modal="true" aria-label="Result poster" onClick={onClose}>
      <button type="button" className="rsp-lb-x" aria-label="Close" onClick={onClose}><Ic d={CLOSE} /></button>
      <button type="button" className="rsp-lb-n prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); onGo(index - 1) }}><Ic d={LEFT} /></button>
      <img key={it.src} src={it.src} alt={it.alt} onClick={(e) => e.stopPropagation()} />
      <button type="button" className="rsp-lb-n next" aria-label="Next" onClick={(e) => { e.stopPropagation(); onGo(index + 1) }}><Ic d={RIGHT} /></button>
      <span className="rsp-lb-c">{index + 1} / {items.length}</span>
    </div>
  )
}

export default function Results() {
  const [lb, setLb] = useState(null) // { s: section index, i: image index }
  const lbItems = lb ? SECTIONS[lb.s].items : []
  const goLb = (i) => setLb((cur) => (cur ? { s: cur.s, i: (i + lbItems.length) % lbItems.length } : cur))

  return (
    <main className="rsp">
      <section className="rsp-hero" style={BANNER ? { '--rsp-bg': `url("${BANNER}")` } : undefined}>
        <div className="rsp-w">
          <div className="rsp-crumb"><Link to="/">Home</Link> › Results</div>
          <span className="rsp-chip">Our Results</span>
          <h1>Results That <span>Speak</span></h1>
          <p>Meet the LWS students who made it to NDA, TES, NCC and other service selections.</p>
        </div>
      </section>

      {SECTIONS.map((sec, si) => {
        const has = sec.items.length > 0
        if (!has && !import.meta.env.DEV) return null
        return (
          <section className={'rsp-sec' + (si % 2 ? ' alt' : '') + (si === 0 ? ' first' : '')} id={'rsp-' + sec.id} key={sec.id}>
            <div className="rsp-w">
              <div className="rsp-head">
                {sec.eyebrow && <p className="rsp-eyebrow">{sec.eyebrow}</p>}
                <h2>
                  {Array.isArray(sec.title)
                    ? <>{sec.title[0]} <span>{sec.title[1]}</span></>
                    : sec.title}
                </h2>
                <div className="rsp-dotline" aria-hidden="true"><i /><i /><i /><u /></div>
              </div>

              {has ? (
                <Slider items={sec.items} label={Array.isArray(sec.title) ? sec.title.join(' ') : sec.title} paused={!!lb} onOpen={(i) => setLb({ s: si, i })} />
              ) : (
                <p className="rsp-empty">Dev note: add images for this slider in <b>src/assets/images/results/{sec.folder}/</b>.</p>
              )}
            </div>
          </section>
        )
      })}

      {lb && <Lightbox items={lbItems} index={lb.i} onClose={() => setLb(null)} onGo={goLb} />}
    </main>
  )
}