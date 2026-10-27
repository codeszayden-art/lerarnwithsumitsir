import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// import './OirMock.css'
import oir2 from '../../assets/images/oir/OIR-2.pdf'

/**
 * Route:  <Route path='/mock-tests/oir/2' element={<OirMockTwo />} />
 *
 * PDF files (src/assets/images/oir/):
 *   OIR-1.pdf ... OIR-5.pdf              -> question paper + OMR sheet
 *   OIR-1-solution.pdf (optional)        -> ho to "Solutions" button dikhega, nahi ho to chhup jayega
 */
const DURATION = 30 * 60 // seconds (OIR: 30 min / 40 questions)

const PAPERS = { 2: oir2 } // sirf Mock 2
const SOLUTIONS = {}

const mmss = (s) => {
  s = Math.max(0, Math.ceil(s))
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0')
}

const I = {
  back: <path d="M19 12H5M11 6l-6 6 6 6" />,
  file: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>,
  down: <path d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" />,
  ext: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  play: <path d="M7 4.5v15l12-7.5z" />,
  pause: <path d="M8 5v14M16 5v14" />,
  reset: <path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4.5h4.5" />,
  min: <path d="M5 12h14" />,
  max: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
}
const Ic = ({ n, s = 17, w = 2 }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill={n === 'play' ? 'currentColor' : 'none'} stroke="currentColor"
       strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{I[n]}</svg>
)

/* ---------------- Timer widget (bottom-left) ---------------- */
function MockTimer({ seconds, label }) {
  const [left, setLeft] = useState(seconds)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [mini, setMini] = useState(false)
  const end = useRef(0)
  const iv = useRef(null)
  const ac = useRef(null)
  const title0 = useRef(typeof document !== 'undefined' ? document.title : '')

  const bell = () => {
    try {
      const a = ac.current
      if (!a) return
      ;[0, 0.55, 1.1].forEach((d) => {
        ;[880, 1320].forEach((f, j) => {
          const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + d
          o.type = 'sine'; o.frequency.value = f
          g.gain.setValueAtTime(0, t)
          g.gain.linearRampToValueAtTime(0.25 / (j + 1), t + 0.01)
          g.gain.exponentialRampToValueAtTime(0.0001, t + 1.5)
          o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + 1.6)
        })
      })
    } catch (e) {}
    try { navigator.vibrate && navigator.vibrate([300, 150, 300]) } catch (e) {}
  }

  const stopTimer = () => { clearInterval(iv.current); iv.current = null }

  const start = () => {
    if (running) return
    try {
      ac.current = ac.current || new (window.AudioContext || window.webkitAudioContext)()
      ac.current.resume()
    } catch (e) {}
    const from = done ? seconds : left
    setDone(false)
    end.current = Date.now() + from * 1000
    setLeft(from)
    setRunning(true)
    iv.current = setInterval(() => {
      const l = (end.current - Date.now()) / 1000
      if (l <= 0) {
        stopTimer(); setLeft(0); setRunning(false); setDone(true); bell()
      } else setLeft(l)
    }, 250)
  }

  const pause = () => { stopTimer(); setRunning(false) }
  const reset = () => { stopTimer(); setRunning(false); setDone(false); setLeft(seconds) }

  useEffect(() => () => {
    stopTimer()
    document.title = title0.current
    try { ac.current && ac.current.close() } catch (e) {}
  }, [])

  const shown = mmss(left)
  useEffect(() => {
    document.title = running || done ? `${shown} · ${label}` : title0.current
  }, [shown, running, done, label])

  const tone = done ? 'done' : running && left <= 60 ? 'danger' : running && left <= 300 ? 'warn' : ''
  const pct = Math.max(0, Math.min(100, (left / seconds) * 100))

  if (mini)
    return (
      <button type="button" className={'om-tm mini ' + tone} onClick={() => setMini(false)} aria-label="Open timer">
        <i className={'om-dot' + (running ? ' on' : '')} />
        <b>{shown}</b>
        <Ic n="max" s={14} />
      </button>
    )

  return (
    <div className={'om-tm ' + tone} role="timer" aria-label="Test timer">
      <div className="om-tm-top">
        <span><i className={'om-dot' + (running ? ' on' : '')} />TIMER</span>
        <button type="button" onClick={() => setMini(true)} aria-label="Minimise timer"><Ic n="min" s={16} /></button>
      </div>
      <div className="om-time" aria-live="off">{shown}</div>
      <div className="om-bar"><i style={{ width: pct + '%' }} /></div>
      {done && <p className="om-end">Time up. Pens down!</p>}
      <div className="om-tm-btns">
        {running ? (
          <button type="button" className="om-b dark" onClick={pause}><Ic n="pause" s={15} />Pause</button>
        ) : (
          <button type="button" className="om-b dark" onClick={start}>
            <Ic n="play" s={14} />{done ? 'Restart' : left < seconds ? 'Resume' : 'Start'}
          </button>
        )}
        <button type="button" className="om-b" onClick={reset}><Ic n="reset" s={15} />Reset</button>
      </div>
    </div>
  )
}

/* ---------------- Page ---------------- */
export default function OirMockTwo() {
  const n = 2 // is file ka mock number
  const url = PAPERS[n]
  const sol = SOLUTIONS[n]
  const label = `OIR Mock ${n}`

  // phone par PDF inline nahi dikhta: wahan buttons pehle dikhte hain, "Preview here" optional
  const canInline = typeof navigator === 'undefined' || navigator.pdfViewerEnabled !== false
  const smallTouch = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(pointer: coarse) and (max-width: 820px)').matches : false
  const [frame, setFrame] = useState(canInline && !smallTouch)

  if (!url)
    return (
      <main className="om">
        <div className="om-w">
          <div className="om-nf">
            <h1>Mock test not found</h1>
            <p>This OIR mock is not available yet.</p>
            <Link to="/mock-tests/oir" className="om-b dark"><Ic n="back" />OIR Hub</Link>
          </div>
        </div>
      </main>
    )

  const fileName = `OIR-Mock-Test-${n}.pdf`

  return (
    <main className="om">
      <div className="om-w">
        <header className="om-bar-top">
          <Link to="/mock-tests/oir" className="om-back"><Ic n="back" s={16} />OIR Hub</Link>
          <div className="om-ttl">
            <span className="om-badge">MOCK {n}</span>
            <h1>OIR Practice Test {String(n).padStart(2, '0')}</h1>
          </div>
          <div className="om-acts">
            {sol && (
              <a className="om-sol" href={sol} target="_blank" rel="noopener noreferrer">
                <Ic n="file" s={16} />Solutions
              </a>
            )}
          </div>
        </header>

        <section className="om-doc" aria-label="Question paper">
          <div className="om-doc-h">
            <b>OIR MOCK TEST-{n}</b><span>PDF</span>
            <div>
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label="Open PDF in new tab"><Ic n="ext" s={17} /></a>
              <a href={url} download={fileName} aria-label="Download PDF"><Ic n="down" s={17} /></a>
            </div>
          </div>

          {frame ? (
            <iframe className="om-frame" title={label} src={`${url}#zoom=${window.innerWidth < 700 ? 'page-width' : 75}&navpanes=0`} />
          ) : (
            <div className="om-fb">
              <div className="om-fb-ic"><Ic n="file" s={34} w={1.7} /></div>
              <h2>{label} question paper</h2>
              <p>Open the PDF, print the OMR sheet from the first page, then start the timer.</p>
              <div className="om-fb-btns">
                <a className="om-b dark big" href={url} target="_blank" rel="noopener noreferrer"><Ic n="ext" />Open PDF</a>
                <a className="om-b big" href={url} download={fileName}><Ic n="down" />Download</a>
              </div>
              {canInline && (
                <button type="button" className="om-link" onClick={() => setFrame(true)}>Preview here instead</button>
              )}
            </div>
          )}
        </section>
      </div>

      <MockTimer seconds={DURATION} label={label} />
    </main>
  )
}
