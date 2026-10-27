// Blog page. Needs only ./blog.css
// Route:  <Route path="blogs" element={<Blog />} />      Menu:  <Link to="/blogs">Blogs</Link>
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// import './blog.css'

// Banner background photo (online, free Unsplash photo). Replace with any image URL.
const BANNER = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1800&q=70'
const ALL_BLOGS = 'https://learnwithsumit.in/blogs/' // "View all articles" button
const PHONE = '9211637514'
const U = 'https://learnwithsumit.in/wp-content/uploads/'
const S = 'https://learnwithsumit.in/'

// The first post is shown as the big "featured" card, the rest as small cards.
// To change a post: edit the text, date, image and url below. Add or remove posts freely.
const POSTS = [
  {
    tag: 'Exam Guide',
    date: 'August 15, 2026',
    title: 'NDA vs CDS vs AFCAT: Which Defence Exam Should You Prepare For?',
    text: 'Joining the Indian Armed Forces is a dream for thousands of young aspirants. Confused about which defence exam suits you? This guide helps you decide.',
    img: U + '2026/08/3-1024x572.webp',
    url: S + 'nda-vs-cds-vs-afcat/',
  },
  {
    tag: 'NDA',
    date: 'October 17, 2026',
    title: 'NDA Preparation Strategy for 2027: A Practical 6-Month Study Plan for Beginners',
    text: 'Preparing for the National Defence Academy (NDA) examination requires a clear strategy, consistent practice, and a strong understanding of the syllabus.',
    img: U + '2026/10/7.webp',
    url: S + 'nda-preparation-strategy-for-2027-a-practical-6-month-study-plan-for-beginners/',
  },
  {
    tag: 'Strategy',
    date: 'August 15, 2026',
    title: 'How to Prepare for NDA, CDS, AFCAT & SSB: Complete Defence Exam Preparation Strategy',
    text: 'Preparing for a career in the Indian Armed Forces requires discipline, consistency, confidence and the right preparation strategy.',
    img: U + '2026/08/4-1024x572.webp',
    url: S + 'how-to-prepare-for-nda-cds-afcat-ssb-complete-defence-exam-preparation-strategy/',
  },
  {
    tag: 'SSB',
    date: 'October 17, 2026',
    title: 'How to Develop Officer-Like Qualities for SSB: Daily Habits for Defence Aspirants',
    text: 'Developing officer-like qualities for SSB is an important part of preparing for a career in the Indian Armed Forces.',
    img: U + '2026/10/9.webp',
    url: S + 'how-to-develop-officer-like-qualities-for-ssb-daily-habits-for-defence-aspirants/',
  },
  {
    tag: 'About LWS',
    date: 'August 15, 2026',
    title: 'Why LWS is One of the Best Defence Coaching Institutes in India for Defence Aspirants',
    text: 'Choosing the best defence coaching institute in India is an important decision for every student and aspirant who dreams of a career in the defence forces.',
    img: U + '2026/08/2-1024x572.webp',
    url: S + 'best-defence-coaching-institute-in-india-lws/',
  },
]
const TOPICS = ['NDA', 'CDS', 'AFCAT', 'SSB']

const ICONS = {
  cal: (
    <>
      <rect x='3' y='4' width='18' height='18' rx='2' />
      <line x1='16' y1='2' x2='16' y2='6' />
      <line x1='8' y1='2' x2='8' y2='6' />
      <line x1='3' y1='10' x2='21' y2='10' />
    </>
  ),
  arrow: (
    <>
      <path d='M5 12h14' />
      <path d='M12 5l7 7-7 7' />
    </>
  ),
  book: (
    <>
      <path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20' />
      <path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' />
    </>
  ),
  phone: (
    <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z' />
  ),
  ext: (
    <>
      <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
      <polyline points='15 3 21 3 21 9' />
      <line x1='10' y1='14' x2='21' y2='3' />
    </>
  ),
}
function Icon ({ name, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      {ICONS[name]}
    </svg>
  )
}

function Reveal ({ delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) return setOn(true)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`bl-rv ${className} ${on ? 'in' : ''}`}
      style={{ transitionDelay: delay + 'ms' }}
      {...rest}
    >
      {children}
    </div>
  )
}

// Post image. If it fails to load, a clean gradient placeholder is shown instead.
function Cover ({ src, tag }) {
  const [bad, setBad] = useState(false)
  return (
    <div className='bl-cv'>
      {bad ? (
        <span className='bl-ph'>
          <Icon name='book' size={38} />
        </span>
      ) : (
        <img src={src} alt='' loading='lazy' onError={() => setBad(true)} />
      )}
      <span className='bl-chip'>{tag}</span>
    </div>
  )
}

function Meta ({ date }) {
  return (
    <span className='bl-meta'>
      <Icon name='cal' size={15} />
      {date}
    </span>
  )
}

export default function Blog () {
  const [first, ...rest] = POSTS
  return (
    <main className='bl'>
      {/* BANNER (compact, photo background) */}
      <section className='bl-bn' style={{ '--bl-img': `url("${BANNER}")` }}>
        <div className='bl-w'>
          <nav className='bl-crumb' aria-label='Breadcrumb'>
            <Link to='/'>Home</Link>
            <i>›</i>
            <span>Blogs</span>
          </nav>
          <h1>
            Our <em>Blogs</em>
          </h1>
          <p>Guides, strategies and insights to help you crack NDA, CDS, AFCAT and SSB.</p>
          <div className='bl-tp'>
            {TOPICS.map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className='bl-sec'>
        <div className='bl-w'>
          {/* FEATURED */}
          <Reveal className='bl-ft'>
            <a
              className='bl-ftimg'
              href={first.url}
              target='_blank'
              rel='noopener noreferrer'
              tabIndex={-1}
              aria-hidden='true'
            >
              <Cover src={first.img} tag={first.tag} />
            </a>
            <div className='bl-ftx'>
              <span className='bl-badge'>FEATURED ARTICLE</span>
              <h2>
                <a href={first.url} target='_blank' rel='noopener noreferrer'>
                  {first.title}
                </a>
              </h2>
              <p>{first.text}</p>
              <Meta date={first.date} />
              <a className='bl-btn' href={first.url} target='_blank' rel='noopener noreferrer'>
                Read article <Icon name='arrow' />
              </a>
            </div>
          </Reveal>

          {/* LATEST */}
          <div className='bl-lh'>
            <h3>Latest articles</h3>
            <span />
          </div>
          <div className='bl-grid'>
            {rest.map((p, i) => (
              <Reveal as='article' key={p.url} delay={i * 90} className='bl-card'>
                <Cover src={p.img} tag={p.tag} />
                <div className='bl-body'>
                  <Meta date={p.date} />
                  <h4>
                    <a href={p.url} target='_blank' rel='noopener noreferrer'>
                      {p.title}
                    </a>
                  </h4>
                  <p>{p.text}</p>
                  <span className='bl-more'>
                    Read more <Icon name='arrow' size={16} />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className='bl-all'>
            <a className='bl-btn line' href={ALL_BLOGS} target='_blank' rel='noopener noreferrer'>
              View all articles <Icon name='ext' size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='bl-end'>
        <div className='bl-w'>
          <Reveal className='bl-endc'>
            <div>
              <h2>Need personal guidance for your preparation?</h2>
              <p>Talk to our mentors and find the right batch for NDA, CDS, AFCAT or SSB.</p>
            </div>
            <a className='bl-btn gold' href={`tel:${PHONE}`}>
              <Icon name='phone' /> Call {PHONE}
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
