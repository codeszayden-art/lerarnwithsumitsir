import { useEffect, useMemo, useRef, useState } from 'react'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
// import '@/styles/sections/gallery.css';

/* Banner image: apni image ka path yahan daalo */
const HERO_IMG = 'https://learnwithsumit.in/wp-content/uploads/2026/05/VIS_0246-scaled.jpg'
const CONTACT_URL = '/contact'

const A = 'https://learnwithsumit.in/wp-content/uploads'

const GROUPS = [
  {
    id: 'ssb',
    icon: '🎖️',
    title: 'SSB Class & GTO',
    imgs: [
      'Untitled-design-9',
      'Untitled-design-8',
      'Untitled-design-7',
      'Untitled-design-5',
      'Untitled-design-4',
      'Untitled-design',
      'Untitled-design-3',
      'Untitled-design-2',
      'Untitled-design-1',
    ].map(n => `${A}/2025/10/${n}.webp`),
  },
  {
    id: 'campus',
    icon: '🏫',
    title: 'Hostel & Campus',
    imgs: [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2].map(n => `${A}/2026/01/${n}-scaled.webp`),
  },
  {
    id: 'moments',
    icon: '📸',
    title: 'Campus Moments',
    imgs: [
      'VIS_0246-scaled.jpg',
      'VIS_0254-scaled.jpg',
      'VIS_0256-scaled.jpg',
      '1-Copy-scaled.webp',
      '1-scaled.webp',
      '2-Copy-scaled.webp',
      '5-scaled.webp',
      '7-scaled.webp',
      '9-scaled.webp',
      '10-scaled.webp',
      '11-scaled.webp',
      '12-scaled.webp',
      '13-scaled.webp',
      '14-scaled.webp',
      'VIS_0009-scaled.webp',
      'VIS_0010-scaled.webp',
      'VIS_0041-scaled.webp',
      'VIS_0042-scaled.webp',
      'VIS_0049-scaled.webp',
    ].map(f => `${A}/2026/05/${f}`),
  },
]

const TOTAL = GROUPS.reduce((n, g) => n + g.imgs.length, 0)

export default function GalleryPage () {
  const [cat, setCat] = useState('all')
  const wrapRef = useRef(null)

  const items = useMemo(
    () =>
      GROUPS.filter(g => cat === 'all' || cat === g.id).flatMap(g =>
        g.imgs.map(src => ({ src, title: g.title })),
      ),
    [cat],
  )

  /* Fancybox: ek baar bind, delegation se har filter pe kaam karega */
  useEffect(() => {
    const el = wrapRef.current
    Fancybox.bind(el, '[data-fancybox]', {
      Thumbs: { type: 'classic' },
    })
    return () => {
      Fancybox.unbind(el)
      Fancybox.close()
    }
  }, [])

  return (
    <main className='gal'>
      {/* BANNER */}
      <div className='gal-hero' style={{ '--hero': `url("${HERO_IMG}")` }}>
        <div className='gal-hero-in'>
          <span className='gal-pill'>📸 LWS Gallery</span>
          <h1>
            Life at <em>LWS Academy</em>
          </h1>
          <p>
            SSB classes, GTO ground activities, hostel life and campus moments, see how our aspirants train,
            learn and grow.
          </p>
          <div className='gal-stats'>
            <div>
              <b>{TOTAL}+</b>Photos
            </div>
            <div>
              <b>{GROUPS.length}</b>Albums
            </div>
            <div>
              <b>GTO</b>Ground Training
            </div>
          </div>
        </div>
      </div>

      {/* GAP + FILTERS */}
      <div className='gal-w'>
        <div className='gal-head'>
          <small>Photo Gallery</small>
          <h2>Moments That Define Us</h2>
          <p>Kisi bhi photo par click karo aur full screen me dekho.</p>
        </div>

        <div className='gal-tabs' role='tablist' aria-label='Gallery albums'>
          <button
            role='tab'
            aria-selected={cat === 'all'}
            className={cat === 'all' ? 'on' : ''}
            onClick={() => setCat('all')}
          >
            All <em>{TOTAL}</em>
          </button>
          {GROUPS.map(g => (
            <button
              key={g.id}
              role='tab'
              aria-selected={cat === g.id}
              className={cat === g.id ? 'on' : ''}
              onClick={() => setCat(g.id)}
            >
              <span>{g.icon}</span> {g.title} <em>{g.imgs.length}</em>
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className='gal-grid' ref={wrapRef} key={cat}>
          {items.map((it, i) => (
            <a
              key={it.src}
              className='gal-item'
              href={it.src}
              data-fancybox='lws-gallery'
              data-caption={`${it.title} · LWS Academy`}
              style={{ '--i': Math.min(i, 14) }}
            >
              <img
                src={it.src}
                alt={`${it.title} ${i + 1}`}
                loading='lazy'
                decoding='async'
                onError={e => {
                  e.currentTarget.closest('a').style.display = 'none'
                }}
              />
              <span className='gal-ov'>
                <small>{it.title}</small>
                <i aria-hidden='true'>
                  <svg viewBox='0 0 24 24'>
                    <circle cx='11' cy='11' r='7' />
                    <path d='M20 20l-3.5-3.5M11 8v6M8 11h6' />
                  </svg>
                </i>
              </span>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className='gal-cta'>
          <div>
            <h3>Want to be part of the LWS family?</h3>
            <p>Visit our campus or talk to our counsellors about batches and admissions.</p>
          </div>
          <a href={CONTACT_URL}>Contact Us →</a>
        </div>
      </div>
    </main>
  )
}
