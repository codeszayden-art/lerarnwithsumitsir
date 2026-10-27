import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import './PpdtMock.css'

/**
 * PP&DT Mock Test 2
 * Picture: src/assets/images/ppdt/mock-2.png  (png / jpg / jpeg / webp)
 */
const MOCK_NO = 1
const HUB = '/mock/ppdt' // PP&DT hub page ka route
const VIEW = 30 // seconds: picture dikhegi
const WRITE = 270 // seconds: 4 min 30 sec writing
const C = 339.3 // ring circumference

const files = import.meta.glob('/src/assets/images/ppdt/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', {
  eager: true,
  import: 'default',
})
const PICS = {}
Object.entries(files).forEach(([p, url]) => {
  const m = p.split('/').pop().match(/^(?:ppdt|mock)[-_ ]?(\d+)\.(png|jpe?g|webp)$/i)
  if (m) PICS[+m[1]] = url
})

const mmss = (s) => {
  s = Math.max(0, Math.ceil(s))
  return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2)
}

const RULES = [
  'The hazy picture is shown on full screen for 30 seconds, then it disappears automatically.',
  'While it is on screen, observe the characters (number, age, sex, mood) and the action.',
  'After that you get 4 minutes 30 seconds to write your story. A bell rings when writing starts and when it ends.',
  'Download the sample sheet and print it. You can also draw the same square box and action line on an A4 page.',
  'If the space on the front page is not enough, use the back of the page.',
]

export default function PpdtMockTwo() {
  const n = MOCK_NO
  const pic = PICS[n]
  const navigate = useNavigate()

  const [ui, setUi] = useState({ open: false, ph: 'idle', time: '', off: 0, paused: false, confirm: false, count: null, flash: 0 })
  const upd = (p) => setUi((u) => ({ ...u, ...p }))

  const st = useRef({ ph: 'idle', end: 0, left: 0, total: 1, paused: false })
  const timer = useRef(null)
  const cd = useRef(null)
  const ac = useRef(null)
  const ov = useRef(null)
  const api = useRef({})

  useEffect(() => () => {
    clearInterval(timer.current); clearInterval(cd.current)
    try { document.fullscreenElement && document.exitFullscreen() } catch (e) {}
    try { ac.current && ac.current.close() } catch (e) {}
  }, [])

  const audio = () => {
    ac.current = ac.current || new (window.AudioContext || window.webkitAudioContext)()
    return ac.current
  }

  // bell + screen flash
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
    try { navigator.vibrate && navigator.vibrate([250, 120, 250]) } catch (e) {}
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
    s.total = ph === 'view' ? VIEW : WRITE
    s.end = performance.now() + s.total * 1000
    if (ph === 'write') bell()
    upd({ ph })
    tick()
  }

  const next = () => {
    const s = st.current
    if (s.ph === 'view') return phase('write')
    clearInterval(timer.current)
    bell()
    s.ph = 'end'
    upd({ ph: 'end' })
  }

  const start = () => {
    const s = st.current
    s.paused = false
    if (ov.current) {
      ov.current.hidden = false
      try { ov.current.requestFullscreen && ov.current.requestFullscreen().catch(() => {}) } catch (e) {}
    }
    try { audio().resume() } catch (e) {}
    s.ph = 'count'
    clearInterval(timer.current); clearInterval(cd.current)
    let c = 3
    upd({ open: true, ph: 'count', time: '', off: 0, paused: false, confirm: false, count: c })
    cd.current = setInterval(() => {
      c--
      if (c > 0) upd({ count: c })
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
    upd({ open: false, ph: 'idle', paused: false, confirm: false, count: null })
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

  api.current = { pause }

  // Space = pause / resume
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

  const backToHub = () => { stop(); navigate(HUB) }

  // printable answer sheet: square box (characters) + action line + story lines
  const printSheet = () => {
    const h = '<!doctype html><title>LWS PP&amp;DT answer sheet</title><style>@page{size:A4;margin:14mm}body{font-family:Arial,sans-serif;margin:0}h1{font-size:19px;color:#0b2a5e;margin:0 0 6px}p{margin:0 0 10px;font-size:13px}.box{width:100%;height:78mm;border:1.5px solid #222;margin:6px 0 14px;padding:6px;font-size:12px;color:#555}.line{border-bottom:1px solid #222;height:9mm;font-size:12px;color:#555;margin-bottom:12px}.story{height:92mm;border:1px solid #888;background:repeating-linear-gradient(#fff 0 8mm,#c9d3e6 8mm calc(8mm + 1px))}b{font-size:13px}</style><h1>LWS &ndash; PP&amp;DT Answer Sheet</h1><p>Name: ____________________ &nbsp; Date: ____________ &nbsp; Mock: ____</p><b>Characters (number, age, sex, mood)</b><div class="box">Square box</div><b>Action</b><div class="line">&nbsp;</div><b>Story</b><div class="story"></div>'
    const w = window.open('', '_blank')
    if (!w) return alert('Please allow pop-ups to open the answer sheet.')
    w.document.write(h)
    w.document.close()
    setTimeout(() => w.print(), 400)
  }

  const writing = ui.ph === 'write'

  return (
    <main className="pm">
      <div className="pm-w">
        <header className="pm-top">
          <Link to={HUB} className="pm-back">← PP&amp;DT Hub</Link>
          <div className="pm-ttl">
            <span className="pm-badge">MOCK {n}</span>
            <h1>PP&amp;DT Mock Test {String(n).padStart(2, '0')}</h1>
          </div>
        </header>

        <section className="pm-card">
          <small>Mock Test {n}</small>
          <h2>Instructions &amp; Guidelines</h2>
          <ol>
            {RULES.map((r) => <li key={r}>{r}</li>)}
          </ol>
          <div className="pm-btns">
            <button type="button" className="pm-b dark big" onClick={start}>▶ Start Mock Test</button>
            <button type="button" className="pm-b big" onClick={printSheet}>⬇ Download Sample Sheet</button>
          </div>
        </section>
      </div>

      {/* Full-screen test */}
      <div className={'pm-ov ' + (writing ? 'is-write' : 'is-view')} ref={ov} hidden={!ui.open} role="dialog" aria-label="PP&DT mock test">
        <div className="pm-otop">
          <span>PP&amp;DT · Mock {n}</span>
          <div>
            <button type="button" className="pm-ib" aria-label="Pause" onClick={() => pause(true)}>❚❚</button>
            <button type="button" className="pm-ib" aria-label="Exit" onClick={exit}>✕</button>
          </div>
        </div>

        <div className="pm-stage">
          <div className="pm-main">
            {ui.ph === 'view' && (
              pic
                ? <img src={pic} alt={`PP&DT picture ${n}`} />
                : <div className="pm-miss"><b>Picture {n} not found</b><small>Add mock-{n}.png in src/assets/images/ppdt/</small></div>
            )}
            {writing && (
              <div className="pm-wr">
                <h2>Writing Time has started</h2>
                <p>Bell will ring on completion of the test</p>
              </div>
            )}
          </div>

          <div className="pm-ring">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" />
              <circle className="fg" cx="60" cy="60" r="54" style={{ strokeDashoffset: ui.off }} />
            </svg>
            <b>{ui.time}</b><small>{writing ? 'WRITE' : 'OBSERVE'}</small>
          </div>

          {ui.ph === 'view' && <p className="pm-hint">Observe the picture carefully</p>}

          <div key={ui.flash} className={'pm-fl' + (ui.flash ? ' on' : '')} />

          <div className="pm-pn" hidden={ui.count === null}>
            <div className="pm-big" key={ui.count}>{ui.count}</div>
          </div>
          <div className="pm-pn" hidden={!ui.paused || ui.confirm}>
            <div>
              <h2>Paused</h2><p>Your timer is on hold.</p>
              <div className="pm-btns c"><button type="button" className="pm-b gold" onClick={() => pause(false)}>Resume</button></div>
            </div>
          </div>
          <div className="pm-pn" hidden={!ui.confirm}>
            <div>
              <h2>Exit the test?</h2><p>Your progress in this mock will be lost.</p>
              <div className="pm-btns c">
                <button type="button" className="pm-b gold" onClick={() => { upd({ confirm: false }); pause(false) }}>Keep going</button>
                <button type="button" className="pm-b ghost" onClick={stop}>Exit</button>
              </div>
            </div>
          </div>
          <div className="pm-pn" hidden={ui.ph !== 'end'}>
            <div>
              <div className="pm-ok">!</div>
              <h2>Time Up – Pens Down</h2>
              <p>The designated 4 minutes and 30 seconds writing duration has ended. Conclude your story writing. Prepare your narration for individual presentation and group discussion.</p>
              <div className="pm-btns c">
                <button type="button" className="pm-b gold" onClick={backToHub}>Return to PP&amp;DT</button>
                <button type="button" className="pm-b ghost" onClick={start}>Restart Mock</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}