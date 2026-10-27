import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// import './WatMock.css'

/**
 * Route:  <Route path='/mock-tests/wat' element={<WatMock />} />
 * Ek hi page: hero + "How the WAT works" + 5 mocks + fullscreen test.
 */
const PER = 15    // seconds per word
const BRK = 15    // seconds break after every page
const EVERY = 20  // words per page
const C = 339.3   // ring circumference

const DEMO = { words: ['Duty', 'Friend', 'Fear', 'Win', 'Mother', 'Leader'], per: 3, brk: 3, every: 3 }

// 5 mocks x 60 words (sample words, apne words se badal sakte ho)
const MOCKS = [
  { n: 1, words: ['Duty','Friend','Fear','Win','Mother','Leader','Fire','Failure','Courage','Team','Money','Hate','Dark','Success','Enemy','Sacrifice','Army','Help','Mistake','Peace','Discipline','Water','Anger','Brave','Father','Danger','Honest','Lazy','Plan','Rain','Defeat','Trust','Society','Dream','Fight','Teacher','Risk','Smile','Order','Cry','Nation','Weak','Sport','Pain','Group','Hope','Strong','Decision','Fail','Respect','Exam','Loss','Love','Work','Alone','Chance','Soldier','Pride','Time','Life'] },
  { n: 2, words: ['Effort','Brother','Defence','Joy','Challenge','Commander','Storm','Patience','Hero','Cooperation','Wealth','Quarrel','Night','Victory','Rival','Service','Navy','Support','Error','Calm','Training','River','Rage','Fearless','Sister','Threat','Truth','Idle','Goal','Cloud','Surrender','Faith','Community','Ambition','Struggle','Guru','Gamble','Laugh','Rules','Tear','Country','Fragile','Game','Sorrow','Crowd','Wish','Mighty','Choice','Collapse','Honour','Test','Waste','Care','Job','Lonely','Opportunity','Warrior','Dignity','Moment','Future'] },
  { n: 3, words: ['Responsibility','Neighbour','Worry','Gain','Parents','Captain','Flood','Weakness','Bravery','Unity','Poor','Jealous','Light','Achievement','Opponent','Loyalty','Aircraft','Guide','Fault','Rest','Practice','Mountain','Fury','Daring','Family','Warning','Sincere','Careless','Strategy','Wind','Retreat','Belief','Culture','Vision','Conflict','Mentor','Adventure','Happy','Law','Sad','Flag','Timid','Run','Suffer','Club','Aim','Power','Doubt','Break','Manners','Result','Cost','Kind','Task','Isolated','Luck','Officer','Shame','Today','Death'] },
  { n: 4, words: ['Obedience','Colleague','Tension','Profit','Home','Chief','Earthquake','Doubtful','Spirit','Harmony','Rich','Selfish','Shadow','Progress','Foe','Commitment','Weapon','Assist','Blame','Silence','Exercise','Ocean','Violence','Confident','Child','Crisis','Fair','Slow','Method','Snow','Escape','Hesitate','Tradition','Target','War','Student','Journey','Cheerful','Justice','Weep','Border','Coward','Race','Grief','Gang','Desire','Energy','Judge','Crash','Courtesy','Marks','Debt','Gentle','Mission','Single','Fortune','Jawan','Glory','Tomorrow','Fate'] },
  { n: 5, words: ['Punctuality','Companion','Panic','Reward','Guardian','Boss','Drought','Hesitation','Passion','Partnership','Hunger','Revenge','Moon','Growth','Traitor','Obligation','Rifle','Cooperate','Regret','Quiet','Study','Forest','Hatred','Valour','Elder','Emergency','Loyal','Late','Schedule','Sun','Quit','Certain','Religion','Purpose','Competition','Coach','Venture','Pleasure','Principle','Complain','Camp','Nervous','Climb','Wound','Squad','Confidence','Force','Option','Ruin','Behaviour','Paper','Gift','Tender','Labour','Distant','Destiny','Trooper','Triumph','Present','Birth'] },
]

const RULES = [
  ['Prepare Dossier Sheet', 'Prepare a 3-page lined A4 dossier with 20 numbered rows per page or download our printable template.'],
  ['15s Per Word', '60 words appear sequentially for 15 seconds each. Write spontaneous, complete, and positive sentences.'],
  ['15s Page Turn Breaks', 'Automatic 15s intermissions after Word 20 and Word 40 to turn pages. School bell marks test conclusion.'],
]
const STATS = [['60', 'Words'], ['15s', 'Per word'], ['2', 'Breaks'], ['15.5 min', 'Full test']]

const mmss = (s) => String(Math.max(0, Math.ceil(s)))

// Rule card: scroll par ek-ek karke fade-in
function Rule({ n, title, text }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setOn(true); return undefined }
    let t
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { t = setTimeout(() => setOn(true), n * 110); io.disconnect() }
    }, { threshold: 0.2 })
    io.observe(el)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [n])
  return (
    <div className={'wt-r' + (on ? ' in' : '')} ref={ref}>
      <em>{n + 1}</em><h3>{title}</h3><p>{text}</p>
    </div>
  )
}

export default function WatMock() {
  const [sel, setSel] = useState(1)
  const [flip, setFlip] = useState(false)
  const [ui, setUi] = useState({
    open: false, ph: 'idle', i: 0, time: '', off: 0, paused: false, confirm: false,
    count: null, flash: 0, total: 60, every: EVERY, label: '',
  })
  const upd = (p) => setUi((u) => ({ ...u, ...p }))

  const st = useRef({ ph: 'idle', i: 0, end: 0, left: 0, total: 1, paused: false, cfg: null })
  const timer = useRef(null)
  const cd = useRef(null)
  const ac = useRef(null)
  const ov = useRef(null)
  const api = useRef({})

  useEffect(() => {
    const id = setInterval(() => setFlip((f) => !f), 3000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => () => {
    clearInterval(timer.current); clearInterval(cd.current)
    try { document.fullscreenElement && document.exitFullscreen() } catch (e) {}
    try { ac.current && ac.current.close() } catch (e) {}
  }, [])

  const audio = () => {
    ac.current = ac.current || new (window.AudioContext || window.webkitAudioContext)()
    return ac.current
  }

  // chhota beep (naya word) ya bell (break / end)
  const beep = () => {
    try {
      const a = audio(), o = a.createOscillator(), g = a.createGain(), t = a.currentTime
      o.type = 'sine'; o.frequency.value = 660
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.12, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
      o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + 0.2)
    } catch (e) {}
  }
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
    upd({ off: C * (1 - Math.max(0, left) / s.total), time: mmss(left) })
    if (left <= 0) next()
  }

  const showWord = (i) => {
    const s = st.current
    s.ph = 'word'; s.i = i; s.total = s.cfg.per
    s.end = performance.now() + s.total * 1000
    beep()
    upd({ ph: 'word', i })
    tick()
  }

  const startBreak = () => {
    const s = st.current
    s.ph = 'break'; s.total = s.cfg.brk
    s.end = performance.now() + s.total * 1000
    bell()
    upd({ ph: 'break' })
    tick()
  }

  const finish = () => {
    clearInterval(timer.current)
    st.current.ph = 'end'
    bell()
    upd({ ph: 'end' })
  }

  const next = () => {
    const s = st.current
    if (s.ph === 'word') {
      const done = s.i + 1
      if (done >= s.cfg.words.length) return finish()
      if (done % s.cfg.every === 0) return startBreak()
      return showWord(done)
    }
    if (s.ph === 'break') return showWord(s.i + 1)
    return undefined
  }

  const begin = (cfg, label) => {
    const s = st.current
    s.cfg = cfg; s.i = 0; s.paused = false
    if (ov.current) {
      ov.current.hidden = false // fullscreen se pehle visible hona zaroori hai
      try { ov.current.requestFullscreen && ov.current.requestFullscreen().catch(() => {}) } catch (e) {}
    }
    try { audio().resume() } catch (e) {}
    s.ph = 'count'
    clearInterval(timer.current); clearInterval(cd.current)
    let c = 3
    upd({ open: true, ph: 'count', i: 0, time: '', off: 0, paused: false, confirm: false, count: c, total: cfg.words.length, every: cfg.every, label })
    cd.current = setInterval(() => {
      c--
      if (c > 0) upd({ count: c })
      else {
        clearInterval(cd.current)
        upd({ count: null })
        showWord(0)
        timer.current = setInterval(tick, 100)
      }
    }, 1000)
  }

  const startMock = (n) => {
    const m = MOCKS.find((x) => x.n === n) || MOCKS[0]
    begin({ words: m.words, per: PER, brk: BRK, every: EVERY }, `Mock ${m.n}`)
  }
  const startDemo = () => begin(DEMO, 'Demo')

  const stop = () => {
    clearInterval(timer.current); clearInterval(cd.current)
    st.current.ph = 'idle'
    upd({ open: false, ph: 'idle', paused: false, confirm: false, count: null })
    try { document.fullscreenElement && document.exitFullscreen() } catch (e) {}
  }

  const pause = (on) => {
    const s = st.current
    if (s.ph !== 'word' && s.ph !== 'break') return
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
    if (!ui.open || ui.confirm) return undefined
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
    return undefined
  }

  // printable dossier: 3 pages x 20 numbered rows
  const printSheet = () => {
    let h = '<!doctype html><title>LWS WAT answer sheet</title><style>@page{size:A4;margin:12mm}body{font-family:Arial,sans-serif;margin:0}.p{page-break-after:always}.p:last-child{page-break-after:auto}h1{font-size:18px;color:#0b2a5e;margin:0 0 4px}p{margin:0 0 8px;font-size:12px}.r{display:flex;align-items:flex-end;height:11.4mm;border-bottom:1px solid #8a94ab;font-size:12px;color:#444}.r b{width:9mm;font-weight:700}</style>'
    for (let pg = 0; pg < 3; pg++) {
      h += '<div class="p"><h1>LWS &ndash; WAT Answer Sheet (Page ' + (pg + 1) + ')</h1><p>Name: ____________________ &nbsp; Date: __________ &nbsp; Mock: ____ &nbsp; Words ' + (pg * 20 + 1) + ' &ndash; ' + (pg * 20 + 20) + '</p>'
      for (let r = 1; r <= 20; r++) h += '<div class="r"><b>' + (pg * 20 + r) + '.</b></div>'
      h += '</div>'
    }
    const w = window.open('', '_blank')
    if (!w) return alert('Please allow pop-ups to open the answer sheet.')
    w.document.write(h)
    w.document.close()
    setTimeout(() => w.print(), 400)
    return undefined
  }

  const cfg = st.current.cfg
  const word = cfg && ui.ph === 'word' ? cfg.words[ui.i] : ''
  const isBreak = ui.ph === 'break'
  const last = ui.i + 1 // break par: ab tak poore hue words
  const page = Math.floor(last / ui.every)
  const pct = ui.total ? Math.min(100, ((ui.ph === 'end' ? ui.total : ui.i + (ui.ph === 'word' ? 0 : 1)) / ui.total) * 100) : 0

  return (
    <>
      <main className="wt" id="watmain">
        <section className="wt-hero">
          <div className="wt-w wt-hero-in">
            <div>
              <div className="wt-crumb"><Link to="/">Home</Link> › SSB Practice › WAT</div>
              <span className="wt-chip">★ Free Mock Series</span>
              <h1>Word Association <span>Test (WAT)</span></h1>
              <p>Practise the real SSB format at home: 60 words, 15 seconds for each, with page-turn breaks and an automatic bell at every step.</p>
              <div className="wt-btns">
                <button type="button" className="wt-b g" onClick={() => startMock(1)}>Start Mock 1 →</button>
                <a className="wt-b o" href="#wt-rules">How it works</a>
              </div>
              <div className="wt-stats">
                {STATS.map(([b, s]) => <div key={s}><b>{b}</b><small>{s}</small></div>)}
              </div>
            </div>
            <div className="wt-viz" aria-hidden="true">
              <i className="fr f1" /><i className="fr f2" />
              <div className="wt-clock">
                <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" /><circle className="fg" cx="60" cy="60" r="54" /></svg>
                <b>{flip ? '60' : '15'}</b><small>{flip ? 'WORDS' : 'SECONDS'}</small>
              </div>
            </div>
          </div>
        </section>

        <section className="wt-sec" id="wt-rules">
          <div className="wt-w">
            <h2 className="wt-h">How the <span>WAT</span> works</h2>
            <p className="wt-sub">Three things to know before you begin</p>
            <div className="wt-ul"><i /><i /><i /><u /></div>
            <div className="wt-rules">
              {RULES.map(([t, p], n) => <Rule key={t} n={n} title={t} text={p} />)}
            </div>
          </div>
        </section>

        <section className="wt-sec wt-start" id="wt-start">
          <div className="wt-w">
            <h2 className="wt-h">WAT <span>Practice Test Series</span></h2>
            <div className="wt-ul"><i /><i /><i /><u /></div>
            <div className="wt-all"><Link to="/mock-tests">All SSB Tests →</Link></div>
            <div className="wt-grid">
              <div className="wt-card">
                <small>Mock Test {sel}</small>
                <h3>Test Instructions &amp; Guidelines</h3>
                <ul>
                  <li>You will be shown <b>60 words</b> one after another on the screen. Each word stays for exactly <b>15 seconds</b>.</li>
                  <li>As soon as a word appears, write the first meaningful sentence that comes to your mind, spontaneous, positive and constructive.</li>
                  <li>An extra <b>15 seconds</b> break is given automatically after Word 20 and Word 40, to turn over or change your page.</li>
                  <li><b>Spontaneity:</b> write your genuine first reaction. Do not write mere definitions, idioms or negative statements.</li>
                  <li><b>Dossier format:</b> download the sample sheet or prepare a 3-page lined A4 dossier (20 sentences per page).</li>
                  <li><b>Completion:</b> attempt all 60 words without skipping or leaving blank entries.</li>
                </ul>
                <div className="wt-btns">
                  <button type="button" className="wt-b g" onClick={() => startMock(sel)}>▶ Start Mock Test</button>
                  <button type="button" className="wt-b o" onClick={printSheet}>⬇ Download Sample Sheet</button>
                </div>
              </div>

              <div className="wt-side">
                <div className="wt-mini demo">
                  <i>⏱</i>
                  <div><b>Try a 1-minute demo</b><span>Shortened timers to see how it works</span></div>
                  <button type="button" className="wt-b n" onClick={startDemo}>Demo</button>
                </div>
                {MOCKS.map((m) => (
                  <div className={'wt-mini' + (sel === m.n ? ' on' : '')} key={m.n}>
                    <button type="button" className="wt-pick" aria-pressed={sel === m.n} onClick={() => setSel(m.n)}>
                      <i>{m.n}</i>
                      <span><b>WAT Mock Test {m.n}</b><small>60 words · 15s each</small></span>
                    </button>
                    <button type="button" className="wt-b n" onClick={() => { setSel(m.n); startMock(m.n) }}>Start</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Full-screen test */}
      <div className={'wt-ov ' + (isBreak ? 'is-break' : 'is-word')} ref={ov} hidden={!ui.open} role="dialog" aria-label="WAT mock test">
        <div className="wt-otop">
          <span>WAT · {ui.label} · {isBreak ? 'Break' : `Word ${Math.min(ui.i + 1, ui.total)} / ${ui.total}`}</span>
          <div>
            <button type="button" className="wt-ib" aria-label="Pause" onClick={() => pause(true)}>❚❚</button>
            <button type="button" className="wt-ib" aria-label="Exit" onClick={exit}>✕</button>
          </div>
        </div>
        <div className="wt-bar" aria-hidden="true"><i style={{ width: pct + '%' }} /></div>

        <div className="wt-stage">
          <div className="wt-main">
            {ui.ph === 'word' && (
              <div key={ui.i} className={'wt-word' + (word.length > 9 ? ' long' : '')}>{word}</div>
            )}
            {isBreak && (
              <div className="wt-brk">
                <div className="wt-bi">⇄</div>
                <h2>Please Turn Over / Change Page</h2>
                <p>
                  Words {last - ui.every + 1} – {last} completed. Turn over to Page {page + 1} for Words {last + 1} – {Math.min(last + ui.every, ui.total)}.
                  <br />Next word will appear automatically.
                </p>
              </div>
            )}
          </div>

          <div className="wt-ring">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" />
              <circle className="fg" cx="60" cy="60" r="54" style={{ strokeDashoffset: ui.off }} />
            </svg>
            <b>{ui.time}</b><small>{isBreak ? 'BREAK' : 'SECONDS'}</small>
          </div>

          {ui.ph === 'word' && <p className="wt-hint">Write the first sentence that comes to your mind</p>}

          <div key={ui.flash} className={'wt-fl' + (ui.flash ? ' on' : '')} />

          <div className="wt-pn" hidden={ui.count === null}>
            <div className="wt-big" key={ui.count}>{ui.count}</div>
          </div>
          <div className="wt-pn" hidden={!ui.paused || ui.confirm}>
            <div>
              <h2>Paused</h2><p>Your timer is on hold.</p>
              <div className="wt-btns c"><button type="button" className="wt-b g" onClick={() => pause(false)}>Resume</button></div>
            </div>
          </div>
          <div className="wt-pn" hidden={!ui.confirm}>
            <div>
              <h2>Exit the test?</h2><p>Your progress in this mock will be lost.</p>
              <div className="wt-btns c">
                <button type="button" className="wt-b g" onClick={() => { upd({ confirm: false }); pause(false) }}>Keep going</button>
                <button type="button" className="wt-b ghost" onClick={stop}>Exit</button>
              </div>
            </div>
          </div>
          <div className="wt-pn" hidden={ui.ph !== 'end'}>
            <div>
              <div className="wt-ok">!</div>
              <h2>Time Up – Pens Down</h2>
              <p>The designated {ui.total}-word Word Association Test has ended. Conclude your writing. Review your spontaneity and response speed.</p>
              <div className="wt-btns c">
                <button type="button" className="wt-b g" onClick={stop}>Return to WAT</button>
                <button type="button" className="wt-b ghost" onClick={() => begin(st.current.cfg, ui.label)}>Restart Mock</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}