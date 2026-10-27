// TAT Mock Test page (React). Needs only ./tat-mock.css
// Put your 11 TAT pictures in  public/tat/1.jpg ... public/tat/11.jpg
import { useEffect, useRef, useState } from 'react'
// import '.@/tat-mock.css'


const N = 12 // 11 pictures + 1 blank slide

// src/assets/images/tat/tat-1.png ... tat-11.png ko number ke order mein uthata hai
const files = import.meta.glob('../assets/images/tat/tat-*.png', { eager: true, import: 'default' })
const num = (p) => parseInt(p.match(/tat-(\d+)/)[1], 10)
const SLIDES = Object.entries(files)
  .sort(([a], [b]) => num(a) - num(b))
  .map(([, url]) => url)
  .slice(0, N - 1)

const C = 339.3 // ring circumference



const mmss = (s) => {
  s = Math.max(0, Math.ceil(s))
  return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2)
}

const RULES = [
  ['12 Slides (11 Pictures + 1 Blank)', '11 hazy picture prompts appear one after another, followed by one blank slide.'],
  ['30s View / 4m Writing', 'Each slide stays for 30 seconds. A bell marks the start and end of the 4 minutes you get to write each story.'],
  ['Structured Narrative', 'Cover what led to the situation, what is happening now, and the positive outcome.'],
  ['12th Blank Slide', 'Imagine your own scene and write a story that shows leadership and positive values.'],
]
const STATS = [['12', 'Slides'], ['30s', 'To observe'], ['4 min', 'To write'], ['54 min', 'Full test']]

// Rule card: fades in (one after another) when it scrolls into view
function Rule({ n, title, text }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!('IntersectionObserver' in window)) return setOn(true)
    let t
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          t = setTimeout(() => setOn(true), n * 110)
          io.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [n])
  return (
    <div className={'tx-r' + (on ? ' in' : '')} ref={ref}>
      <em>{n + 1}</em><h3>{title}</h3><p>{text}</p>
    </div>
  )
}

// Picture of the current slide (placeholder until the image file loads)
function Pic({ i }) {
  const [ok, setOk] = useState(false)
  if (i === N - 1)
    return (
      <div className="tx-ph bl">
        <div>Blank slide<br /><small style={{ fontWeight: 500 }}>Imagine your own picture</small></div>
      </div>
    )
  return (
    <>
      {!ok && (
        <div className="tx-ph">
          <div><b>{i + 1}</b>TAT picture {i + 1}<br /><small style={{ fontWeight: 500 }}>add public{SLIDES[i]}</small></div>
        </div>
      )}
      <img src={SLIDES[i]} alt={`TAT picture ${i + 1}`} onLoad={() => setOk(true)} style={ok ? undefined : { display: 'none' }} />
    </>
  )
}

export default function TatMock() {
  // what is shown on screen
  const [ui, setUi] = useState({
    open: false, i: 0, ph: 'idle', time: '', off: 0,
    paused: false, confirm: false, count: null, ended: false, flash: 0,
  })
  const [flip, setFlip] = useState(false) // hero demo clock
  const upd = (p) => setUi((u) => ({ ...u, ...p }))

  // timer state (kept in refs so the interval always sees the latest values)
  const st = useRef({ i: 0, ph: 'idle', end: 0, left: 0, total: 1, paused: false, view: 30, write: 240 })
  const timer = useRef(null)
  const cd = useRef(null)
  const ac = useRef(null)
  const ovRef = useRef(null)
  const api = useRef({})

  useEffect(() => {
    const id = setInterval(() => setFlip((f) => !f), 3000)
    return () => clearInterval(id)
  }, [])

  // stop everything when the page is left
  useEffect(() => () => {
    clearInterval(timer.current); clearInterval(cd.current)
    try { document.fullscreenElement && document.exitFullscreen() } catch (e) {}
    try { ac.current && ac.current.close() } catch (e) {}
  }, [])

  const audio = () => {
    ac.current = ac.current || new (window.AudioContext || window.webkitAudioContext)()
    return ac.current
  }

  // two-tone bell + screen flash
  const bell = () => {
    try {
      const a = audio()
      ;[0, 0.55].forEach((d) => {
        ;[880, 1320, 1760].forEach((f, j) => {
          const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + d
          o.type = 'sine'; o.frequency.value = f
          g.gain.setValueAtTime(0, t)
          g.gain.linearRampToValueAtTime(0.28 / (j + 1), t + 0.01)
          g.gain.exponentialRampToValueAtTime(0.0001, t + 1.8)
          o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + 1.9)
        })
      })
    } catch (e) {}
    setUi((u) => ({ ...u, flash: u.flash + 1 }))
  }

  const tick = () => {
    const s = st.current
    if (s.paused) return
    const left = (s.end - performance.now()) / 1000
    upd({
      off: C * (1 - Math.max(0, left) / s.total),
      time: s.ph === 'write' ? mmss(left) : String(Math.max(0, Math.ceil(left))),
    })
    if (left <= 0) next()
  }

  const phase = (ph) => {
    const s = st.current
    s.ph = ph
    s.total = ph === 'view' ? s.view : s.write
    s.end = performance.now() + s.total * 1000
    if (ph === 'write') bell()
    upd({ ph, i: s.i })
    tick()
  }

  const next = () => {
    const s = st.current
    if (s.ph === 'view') return phase('write')
    bell()
    s.i++
    if (s.i >= N) {
      clearInterval(timer.current)
      s.ph = 'end'
      upd({ ph: 'end', i: N - 1, ended: true })
      return
    }
    phase('view')
  }

  const start = (demo) => {
    const s = st.current
    s.view = demo ? 4 : 30
    s.write = demo ? 8 : 240
    s.i = 0
    s.paused = false
    if (ovRef.current) {
      ovRef.current.hidden = false // must be visible before requesting fullscreen
      try { ovRef.current.requestFullscreen && ovRef.current.requestFullscreen().catch(() => {}) } catch (e) {}
    }
    try { audio().resume() } catch (e) {}
    s.ph = 'count'
    clearInterval(timer.current); clearInterval(cd.current)
    let n = 3
    upd({ open: true, i: 0, ph: 'count', time: '', off: 0, paused: false, confirm: false, ended: false, count: n })
    cd.current = setInterval(() => {
      n--
      if (n > 0) upd({ count: n })
      else {
        clearInterval(cd.current)
        upd({ count: null })
        phase('view')
        timer.current = setInterval(tick, 100)
      }
    }, 1000)
  }

  const stop = () => {
    clearInterval(timer.current); clearInterval(cd.current)
    st.current.ph = 'idle'
    upd({ open: false, ph: 'idle', paused: false, confirm: false, count: null, ended: false })
    try { document.fullscreenElement && document.exitFullscreen() } catch (e) {}
  }

  const pause = (on) => {
    const s = st.current
    if (s.ph !== 'view' && s.ph !== 'write') return
    if (on) {
      if (!s.paused) { s.left = s.end - performance.now(); s.paused = true }
    } else {
      s.end = performance.now() + s.left
      s.paused = false
    }
    upd({ paused: on })
  }

  api.current = { pause, start, stop }

  // Space bar = pause / resume
  useEffect(() => {
    if (!ui.open || ui.confirm) return
    const h = (e) => {
      if (e.code !== 'Space') return
      e.preventDefault()
      api.current.pause(!st.current.paused)
    }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [ui.open, ui.confirm])

  const exit = () => {
    if (ui.ph === 'end') return stop()
    pause(true)
    upd({ confirm: true })
  }

  // printable answer sheet
  const printSheet = () => {
    let h = '<!doctype html><title>LWS TAT answer sheet</title><style>body{font-family:Arial,sans-serif;margin:24px}h1{font-size:20px;color:#0b2a5e}.s{page-break-inside:avoid;margin:0 0 18px}.s b{font-size:13px}.l{height:150px;border:1px solid #888;background:repeating-linear-gradient(#fff 0 23px,#c9d3e6 23px 24px)}</style><h1>LWS &ndash; TAT Answer Sheet</h1><p>Name: ____________________ &nbsp; Date: ____________</p>'
    for (let i = 1; i <= N; i++) h += '<div class="s"><b>Story ' + i + (i === N ? ' (blank slide)' : '') + '</b><div class="l"></div></div>'
    const w = window.open('', '_blank')
    if (!w) return alert('Please allow pop-ups to open the answer sheet.')
    w.document.write(h)
    w.document.close()
    setTimeout(() => w.print(), 400)
  }

  const writing = ui.ph === 'write'

  return (
    <>
      <main className="tx" id="tatmain">
        <section className="tx-hero">
          <div className="tx-w">
            <div>
              <div className="tx-crumb"><a href="/">Home</a> › SSB Practice › TAT</div>
              <span className="tx-chip">★ Free Mock Series</span>
              <h1>Thematic Apperception <span>Test (TAT)</span></h1>
              <p>Practise the real SSB format at home: 12 slides, 30 seconds to observe, 4 minutes to write, with an automatic bell at every step.</p>
              <div className="tx-btns">
                <button className="tx-b g" onClick={() => start(false)}>Start Mock 1 →</button>
                <a className="tx-b o" href="#rules">How it works</a>
              </div>
              <div className="tx-stats">
                {STATS.map(([b, s]) => <div key={s}><b>{b}</b><small>{s}</small></div>)}
              </div>
            </div>
            <div className="tx-viz" aria-hidden="true">
              <i className="fr f1" /><i className="fr f2" />
              <div className="tx-clock">
                <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" /><circle className="fg" cx="60" cy="60" r="54" /></svg>
                <b>{flip ? '4:00' : '30'}</b><small>{flip ? 'WRITE' : 'OBSERVE'}</small>
              </div>
            </div>
          </div>
        </section>

        <section className="tx-sec" id="rules">
          <div className="tx-w">
            <h2 className="tx-h">How the <span>TAT</span> works</h2>
            <p className="tx-sub">Four things to know before you begin</p>
            <div className="tx-ul"><i /><i /><i /><u /></div>
            <div className="tx-rules">
              {RULES.map(([t, p], n) => <Rule key={t} n={n} title={t} text={p} />)}
            </div>
          </div>
        </section>

        <section className="tx-sec tx-start" id="start">
          <div className="tx-w">
            <h2 className="tx-h">TAT <span>Practice Test Series</span></h2>
            <div className="tx-ul"><i /><i /><i /><u /></div>
            <div className="tx-grid">
              <div className="tx-card">
                <small>Mock Test 1</small>
                <h3>Test Instructions &amp; Guidelines</h3>
                <ul>
                  <li>12 slides will appear in full screen. Each picture stays for exactly <b>30 seconds</b>.</li>
                  <li>When the bell rings, you get <b>4 minutes</b> to write a complete, realistic story.</li>
                  <li>Write the <b>past</b> (what led to this), the <b>present</b> (what is happening) and the <b>future</b> (a positive outcome).</li>
                  <li>On the 12th blank slide, imagine your own scene and write a story showing leadership.</li>
                  <li>Keep a pen and lined sheets ready, and sit somewhere quiet before you start.</li>
                </ul>
                <div className="tx-btns">
                  <button className="tx-b g" onClick={() => start(false)}>▶ Start Mock Test</button>
                  <button className="tx-b o" onClick={printSheet}>⬇ Download Sample Sheet</button>
                </div>
              </div>
              <div className="tx-side">
                <div className="tx-mini">
                  <i>⏱</i>
                  <div><b>Try a 1-minute demo</b><span>Shortened timers to see how it works</span></div>
                  <button className="tx-b n" onClick={() => start(true)}>Demo</button>
                </div>
                <div className="tx-mini lock"><i>🔒</i><div><b>TAT Mock Test 2</b><span>Coming soon</span></div></div>
                <div className="tx-mini lock"><i>🔒</i><div><b>TAT Mock Test 3</b><span>Coming soon</span></div></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Full-screen test */}
      <div className={'tx-ov ' + (writing ? 'is-write' : 'is-view')} ref={ovRef} hidden={!ui.open} role="dialog" aria-label="TAT mock test">
        <div className="tx-top">
          <span className="tx-cnt">Slide {ui.i + 1} / {N}</span>
          <div className="tx-dots">
            {Array.from({ length: N }, (_, j) => (
              <i key={j} className={ui.ph === 'end' ? 'd' : j < ui.i ? 'd' : j === ui.i ? 'c' : ''} />
            ))}
          </div>
          <button className="tx-ib" aria-label="Pause" onClick={() => pause(true)}>❚❚</button>
          <button className="tx-ib" aria-label="Exit" onClick={exit}>✕</button>
        </div>
        <div className="tx-stage">
          <div className="tx-pic">
            {(ui.ph === 'view' || ui.ph === 'write' || ui.ph === 'end') && <Pic key={ui.i} i={ui.i} />}
          </div>
          <div className="tx-ring">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" />
              <circle className="fg" cx="60" cy="60" r="54" style={{ strokeDashoffset: ui.off }} />
            </svg>
            <b>{ui.time}</b><small>{writing ? 'WRITE' : 'OBSERVE'}</small>
          </div>
          <p className="tx-hint">
            {writing
              ? 'Write your story: what led to this, what is happening, and the positive outcome.'
              : ui.i === N - 1 ? 'Imagine a scene of your own' : 'Observe the picture carefully'}
          </p>
          <div key={ui.flash} className={'tx-fl' + (ui.flash ? ' on' : '')} />

          <div className="tx-pn" hidden={ui.count === null}>
            <div className="tx-big" key={ui.count}>{ui.count}</div>
          </div>
          <div className="tx-pn" hidden={!ui.paused || ui.confirm}>
            <div>
              <h2>Paused</h2><p>Your timer is on hold.</p>
              <div className="tx-btns"><button className="tx-b g" onClick={() => pause(false)}>Resume</button></div>
            </div>
          </div>
          <div className="tx-pn" hidden={!ui.confirm}>
            <div>
              <h2>Exit the test?</h2><p>Your progress in this mock will be lost.</p>
              <div className="tx-btns">
                <button className="tx-b g" onClick={() => { upd({ confirm: false }); pause(false) }}>Keep going</button>
                <button className="tx-b o" onClick={stop}>Exit</button>
              </div>
            </div>
          </div>
          <div className="tx-pn" hidden={!ui.ended}>
            <div>
              <div className="ok">✓</div>
              <h2>Time Up – Pens Down</h2>
              <p>Your 12 stories are done. Re-read each one: is the hero a problem-solver, and is the outcome positive?</p>
              <div className="tx-btns">
                <button className="tx-b g" onClick={() => start(st.current.view === 4)}>Restart Mock</button>
                <button className="tx-b o" onClick={stop}>Return to TAT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
