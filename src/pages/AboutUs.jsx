import { useEffect, useRef, useState } from 'react'
// import '@/styles/sections/about.css'

const A = 'https://learnwithsumit.in/wp-content/uploads'
const HERO_IMG = `${A}/2025/12/VIS_0439-scaled.jpg` // banner
const WELCOME_IMG = `${A}/2026/01/NDA-6-Monthss.webp` // welcome section
const CMDR_IMG = `${A}/2025/12/VIS_0439-scaled.jpg` // Commander Vikas Yadav
const SUMIT_IMG = '' // Sumit Sir ki photo ka link yahan daalo
const CONTACT_URL = '/contact'

const ENTRIES = [
  'NDA Foundation',
  'NDA',
  'CDS',
  'AFCAT',
  'SSB Interview',
  'ACC',
  'Air Force X Group',
  'Air Force Y Group',
]

const STATS = [
  { n: '5', l: 'Defence Officers Founding Team' },
  { n: '90+', l: 'NDA Recommendations / Batch' },
  { n: '100+', l: 'SSB Selections Yearly' },
  { n: 'AIR 1·2·3', l: 'NDA All India Rankers' },
]

const CMDR_POINTS = [
  { i: '🎯', t: 'Group Tasks (GTO)' },
  { i: '🧭', t: 'Leadership Evaluation' },
  { i: '🧠', t: 'Psychological Preparedness' },
  { i: '🎤', t: 'Interview Techniques' },
  { i: '🎖️', t: 'Officer-Like Qualities Development' },
]

/* scroll reveal */
function Reveal ({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag
      ref={ref}
      className={`abt-rv ${className}${show ? ' in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export default function AboutPage () {
  const [sumitOk, setSumitOk] = useState(!!SUMIT_IMG)

  return (
    <main className='abt'>
      {/* BANNER */}
      <div className='abt-hero' style={{ '--hero': `url("${HERO_IMG}")` }}>
        <div className='abt-hero-in'>
          <span className='abt-pill'>🎖️ About Us</span>
          <h1>
            An Army Officers’ <em>Enterprise</em>
          </h1>
          <p>
            Delhi’s trusted defence academy, built by serving-spirit officers who train aspirants to wear the
            uniform with pride.
          </p>
          <div className='abt-crumb'>
            <a href='/'>Home</a> <span>/</span> About Us
          </div>
        </div>
      </div>

      <div className='abt-w'>
        {/* WELCOME (banner ke baad gap) */}
        <section className='abt-welcome'>
          <Reveal className='abt-wtxt'>
            <small className='abt-tag'>Who We Are</small>
            <h2>
              Welcome to <em>LWS Academy</em>
            </h2>
            <p>
              <b>LWS</b> Academy Delhi is an Army officers’ enterprise and the best Defence Academy in Delhi.
              The team comprises five defence officers who formed the academy with the aim of providing
              quality and genuine NDA, CDS, and AFCAT coaching in Delhi, India, for students who aspire to
              become defence officers and serve the country.
            </p>
            <p>
              Are you looking for a reputable and affordable coaching institute to help you prepare for the
              NDA Foundation, NDA, AFCAT, SSB Interview, ACC, Air Force X and Y group? At <b>LWS</b> Academy,
              we pride ourselves on providing the best defence coaching to our students. Our experienced and
              dedicated teachers will help you reach your full potential and achieve your goals.
            </p>
            <div className='abt-chips'>
              {ENTRIES.map(e => (
                <span key={e}>{e}</span>
              ))}
            </div>
          </Reveal>

          <Reveal className='abt-wimg' delay={150}>
            <div className='abt-frame'>
              <img src={WELCOME_IMG} alt='LWS Academy NDA coaching' loading='lazy' decoding='async' />
            </div>
            <div className='abt-float'>
              <b>🇮🇳</b>
              <span>
                Trained by
                <br />
                Defence Officers
              </span>
            </div>
          </Reveal>
        </section>
      </div>

      {/* STATS */}
      <section className='abt-stats'>
        <div className='abt-w abt-stats-in'>
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 90} className='abt-stat'>
              <b>{s.n}</b>
              <span>{s.l}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <div className='abt-w'>
        {/* LEADERS */}
        <Reveal className='abt-head'>
          <small className='abt-tag'>Our Mentors</small>
          <h2>
            The Leaders <em>Behind LWS</em>
          </h2>
        </Reveal>

        {/* Sumit Sir */}
        <section className='abt-lead'>
          <Reveal className='abt-photo'>
            <div className='abt-ph-card'>
              {sumitOk ? (
                <img src={SUMIT_IMG} alt='Sumit Sir' loading='lazy' onError={() => setSumitOk(false)} />
              ) : (
                <div className='abt-avatar'>
                  <span>SS</span>
                </div>
              )}
              <div className='abt-name'>
                <b>Sumit Sir</b>
                <small>Founder &amp; Director – LWS</small>
              </div>
            </div>
          </Reveal>

          <Reveal className='abt-card' delay={120}>
            <span className='abt-role'>Founder &amp; Director – LWS</span>
            <h3>Sumit Sir</h3>
            <p className='abt-sub'>The Visionary Mentor Behind Thousands of Aspirants</p>
            <p>
              <b>Sumit Sir</b> is the driving force and heart of <b>LWS</b>. A passionate educator, dynamic
              mentor, and strategic guide, he has transformed the way defence preparation is delivered in
              India. Known for his student-centric approach, he ensures every learner feels supported:
              academically, mentally, and personally.
            </p>
            <p>
              His journey from a dedicated GS teacher to becoming the founder of one of India’s leading
              defence education institutes reflects his commitment, discipline, and vision.
            </p>
            <p>
              <b>Under his leadership</b>, LWS has grown into a trusted brand known for quality education,
              high selections, and holistic development.
            </p>
            <blockquote>
              At LWS, students don’t just study… They learn, grow, evolve, and transform, with Sumit Sir
              holding their hand at every step.
            </blockquote>
          </Reveal>
        </section>

        {/* Commander */}
        <section className='abt-lead rev'>
          <Reveal className='abt-photo' delay={120}>
            <div className='abt-ph-card'>
              <img src={CMDR_IMG} alt='Commander Vikas Yadav (Retd.)' loading='lazy' decoding='async' />
              <div className='abt-name'>
                <b>Cdr Vikas Yadav (Retd.)</b>
                <small>Director – LWS</small>
              </div>
            </div>
          </Reveal>

          <Reveal className='abt-card'>
            <span className='abt-role'>Director – LWS</span>
            <h3>Commander Vikas Yadav (Retd.)</h3>
            <p className='abt-sub'>
              Ex-Senior GTO, SSB Kolkata &amp; Bhopal · India’s Most Trusted SSB Expert
            </p>
            <p>
              Commander <b>Vikas Yadav (Retd.)</b> is a legendary name in the field of SSB training. With
              decades of service as Senior GTO at India’s top SSB boards, Kolkata and Bhopal, he brings
              unmatched experience, real-time assessment ability, and deep understanding of OLQs.
            </p>
            <p className='abt-lbl'>
              At <b>LWS</b>, he personally trains aspirants in:
            </p>
            <ul className='abt-pts'>
              {CMDR_POINTS.map(p => (
                <li key={p.t}>
                  <i>{p.i}</i>
                  {p.t}
                </li>
              ))}
            </ul>
            <p>
              <b>Commander Yadav’s</b> guidance has become the turning point for thousands of aspirants,
              making him the backbone of SSB training at LWS and a key reason behind our outstanding
              recommendations.
            </p>
          </Reveal>
        </section>

        {/* CTA */}
        <Reveal className='abt-cta'>
          <div>
            <h3>Ready to start your journey to the uniform?</h3>
            <p>Talk to our counsellors about batches, courses and admissions.</p>
          </div>
          <a href={CONTACT_URL}>Contact Us →</a>
        </Reveal>
      </div>
    </main>
  )
}
