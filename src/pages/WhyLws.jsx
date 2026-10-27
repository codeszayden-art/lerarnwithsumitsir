// "Why LWS" page. Needs only ./why-lws.css
// Route:  <Route path="why-lws" element={<WhyLws />} />      Menu:  <Link to="/why-lws">Why LWS</Link>
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// import './why-lws.css'

const PHONE = '9211637514'
const WA = 'https://wa.me/919211637514?text=' + encodeURIComponent('Hello LWS, I want to know about your courses.')

const ICONS = {
  star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
  chart: <><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></>,
  userCheck: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" /></>,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  cap: <><path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /><path d="M22 10v6" /></>,
  check: <polyline points="20 6 9 17 4 12" />,
  arrow: <><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></>,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />,
}
function Icon({ name, size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

const STATS = [
  ['Thousands', 'of selections in NDA, CDS and AFCAT'],
  ['AIR 1, 2, 3', 'and many more top ranks'],
  ['Weekly', 'mock tests with detailed analysis'],
  ['Small', 'batches, real mentor attention'],
]
const EXAMS = ['NDA', 'CDS', 'AFCAT', 'CUET', 'RIMC', 'RMS', 'SSB Interview', ]
const REASONS = [
  ['star', 'Specialised defence faculty', 'Experts who understand exam patterns, trends and marking schemes, and who guide you the way a defence aspirant needs to be guided.'],
  ['book', 'Exam-oriented study plan', 'Concept clarity, accuracy and speed with structured modules and concise notes, covering the entire syllabus from the basics.'],
  ['chart', 'Regular mock tests', 'Weekly exam-like tests followed by detailed performance analysis, so you know exactly what to improve next.'],
  ['userCheck', 'SSB and personality development', 'Weekly sessions on TAT, WAT, SRT and GTO tasks, plus guidance that builds communication, leadership and decision-making.'],
  ['users', 'Small batch size', 'Personal attention, doubt cells and one-to-one mentoring, because every aspirant should be seen and heard.'],
  ['cap', 'Integrated graduation options', 'Complete BA / BCA / B.Com alongside your preparation, so you have a secure academic degree too.'],
]
const GURUKUL = [
  'Defence-style disciplined environment',
  'Complete written exam preparation',
  'Weekly SSB training sessions',
  'Regular mock tests with detailed analysis',
  'Personality and leadership development',
  'Guidance from experienced mentors',
  'Interaction sessions with officers and defence experts',
]
const PILLARS = [['⚡', 'Discipline'], ['⚔️', 'Leadership'], ['💪', 'Confidence'], ['🎖️', 'Officer-like personality']]
const STEPS = [
  ['Counselling', 'Talk to a mentor and pick the right batch for NDA, CDS, AFCAT or SSB.'],
  ['Concepts and notes', 'Complete syllabus from the basics with concise notes and special Maths classes.'],
  ['Weekly mock tests', 'Exam-like tests every week, with a clear analysis of your performance.'],
  ['SSB training', 'TAT, WAT, SRT, GTO tasks and personal interview practice.'],
  ['Ready for selection', 'Doubt cells, mentoring and officer interaction until you are confident.'],
]
const COMPARE = [
  ['Training approach', 'Mostly classroom hours', 'A complete training system with a defence-style daily routine'],
  ['Practice', 'Occasional tests', 'Weekly mock tests with detailed analysis'],
  ['SSB preparation', 'Often a separate add-on', 'Weekly SSB sessions built into the program'],
  ['Batch size', 'Large, crowded batches', 'Small batches with mentor-student interaction'],
  ['Graduation', 'Studies handled separately', 'BA / BCA / B.Com options alongside preparation'],
]
const FAQS = [
  ['What makes LWS different from other coaching institutes?', 'LWS follows a defence-inspired training model. Along with classes, you get a disciplined routine, weekly mock tests, weekly SSB sessions, small batches and guidance from experienced mentors.'],
  ['Which exams do you prepare students for?', 'NDA (Foundation course after Class 8 and Class 10), CDS, AFCAT, CUET, RIMC, RMS and SSB interview preparation, with branches across Delhi, Haryana, Pune and more.'],
  ['Is SSB preparation included?', 'Yes. Weekly SSB sessions cover psychological tests (TAT, WAT, SRT), GTO tasks, personal interview guidance and officer-like quality development.'],
  ['Can I do my graduation along with preparation?', 'Yes. BA / BCA / B.Com support is available alongside AFCAT preparation, as per availability.'],
  ['Do you help with hostel or PG?', 'Yes, hostel and PG assistance is available if needed.'],
]

// fades / slides content in when it scrolls into view
function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) return setOn(true)
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect() }
    }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`wl-rv ${className} ${on ? 'in' : ''}`} style={{ transitionDelay: delay + 'ms' }} {...rest}>
      {children}
    </Tag>
  )
}

function Head({ tag, title, text }) {
  return (
    <Reveal className="wl-head">
      <span className="wl-tag">{tag}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  )
}

export default function WhyLws() {
  return (
    <main className="wl">
      {/* HERO */}
      <section className="wl-hero">
        <div className="wl-w wl-hg">
          <div className="wl-hl">
            <span className="wl-eyebrow"><i />WHY LEARN WITH SUMIT</span>
            <h1>Why future officers choose <em>LWS</em></h1>
            <p className="wl-lead">
              India's most trusted NDA and SSB coaching. Not just classes, but a complete training system built on
              discipline, regular practice and personal mentoring.
            </p>
            <div className="wl-cta">
              <a className="wl-btn gold" href={`tel:${PHONE}`}><Icon name="phone" size={18} /> Call {PHONE}</a>
              <a className="wl-btn ghost" href={WA} target="_blank" rel="noreferrer">WhatsApp Us <Icon name="arrow" size={18} /></a>
            </div>
          </div>

          <div className="wl-vis" aria-hidden="true">
            <div className="wl-ring"><div><b>AIR</b><strong>1, 2, 3</strong><small>and top ranks</small></div></div>
            <span className="wl-fc a"><Icon name="chart" size={18} /> Weekly Mock Tests</span>
            <span className="wl-fc b"><Icon name="userCheck" size={18} /> SSB Sessions</span>
            <span className="wl-fc c"><Icon name="users" size={18} /> Small Batches</span>
            <span className="wl-fc d"><Icon name="star" size={18} /> Defence Faculty</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="wl-w">
        <div className="wl-stats">
          {STATS.map(([b, s], i) => (
            <Reveal key={b} delay={i * 90}><b>{b}</b><span>{s}</span></Reveal>
          ))}
        </div>
      </div>

      <div className="wl-mq" aria-hidden="true">
        <div>{[...EXAMS, ...EXAMS].map((x, k) => <span key={k}>{x}</span>)}</div>
      </div>

      {/* SIX REASONS */}
      <section className="wl-sec">
        <div className="wl-w">
          <Head tag="THE LWS DIFFERENCE" title="Six reasons to choose LWS"
            text="Everything in your preparation is designed around one goal: helping you clear the exam and the SSB." />
          <div className="wl-grid">
            {REASONS.map(([ic, t, p], i) => (
              <Reveal key={t} delay={(i % 3) * 100} className="wl-card">
                <span className="wl-n">{String(i + 1).padStart(2, '0')}</span>
                <div className="wl-ic"><Icon name={ic} size={26} /></div>
                <h3>{t}</h3>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GURUKUL */}
      <section className="wl-guru">
        <div className="wl-w wl-gg">
          <Reveal>
            <span className="wl-tag gold">DEFENCE GURUKUL</span>
            <h2>Not just coaching. <em>A complete training system.</em></h2>
            <p className="wl-gp">
              A joint initiative of Learn with Sumit and Defence Mania. Unlike classroom-only coaching, Defence Gurukul
              follows a defence-inspired model that builds discipline, consistency and leadership. The goal is simple:
              not just successful candidates, but future officers.
            </p>
            <ul className="wl-list">
              {GURUKUL.map((g) => <li key={g}><i><Icon name="check" size={14} /></i>{g}</li>)}
            </ul>
          </Reveal>
          <div className="wl-pil">
            {PILLARS.map(([e, t], i) => (
              <Reveal key={t} delay={i * 110} className="wl-pill"><span>{e}</span><b>{t}</b></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="wl-sec">
        <div className="wl-w">
          <Head tag="YOUR JOURNEY" title="How preparation works at LWS" text="A clear path, from your first call to your final selection." />
          <ol className="wl-steps">
            {STEPS.map(([t, p], i) => (
              <Reveal as="li" key={t} delay={i * 110}>
                <span className="wl-sn">{i + 1}</span>
                <h3>{t}</h3>
                <p>{p}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="wl-sec alt">
        <div className="wl-w">
          <Head tag="SIDE BY SIDE" title="Classroom-only coaching vs LWS" />
          <Reveal className="wl-tbl">
            <div className="wl-tr hd"><span>&nbsp;</span><span>Classroom-only coaching</span><span>LWS</span></div>
            {COMPARE.map(([a, b, c]) => (
              <div className="wl-tr" key={a}>
                <span className="k">{a}</span>
                <span className="x">{b}</span>
                <span className="y"><i><Icon name="check" size={13} /></i>{c}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="wl-sec">
        <div className="wl-w wl-fq">
          <Head tag="QUESTIONS" title="Frequently asked questions" />
          <Reveal className="wl-faq">
            {FAQS.map(([q, a]) => (
              <details key={q}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="wl-end">
        <div className="wl-w">
          <Reveal className="wl-endc">
            <h2>Ready to start your journey to the uniform?</h2>
            <p>Talk to our team today and find the right batch for you.</p>
            <div className="wl-cta c">
              <a className="wl-btn navy" href={`tel:${PHONE}`}><Icon name="phone" size={18} /> Call {PHONE}</a>
              <a className="wl-btn white" href={WA} target="_blank" rel="noreferrer">WhatsApp Us</a>
              <Link className="wl-btn line" to="/">Back to Home</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
