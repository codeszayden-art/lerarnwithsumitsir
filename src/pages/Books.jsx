import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// import './Books.css'

/**
 * Route:  <Route path='/books' element={<Books />} />
 *
 * Images abhi purani site (learnwithsumit.in) ke link se aa rahi hain.
 * Baad mein images download karke src/assets/images/books/ mein rakh lo aur `img` mein import kar dena.
 * Kisi store ka link nahi hai to us field ko hata do (button apne aap chhup jayega).
 */
const UP = 'https://learnwithsumit.in/wp-content/uploads'

const GROUPS = [
  {
    id: 'bkp-handbooks',
    title: 'NDA/NA Handbooks',
    text: 'GAT and Mathematics, covered topic by topic.',
    books: [
      {
        title: 'Cadet Core NDA/NA',
        sub: 'Handbook of GAT',
        by: 'CDR Vikas Yadav & Sumit Kumar',
        img: `${UP}/2026/03/NDA-NA-Book-1.jpg`,
        w: 256,
        h: 360,
        amazon: 'https://www.amazon.in/Oswaal-CadetCore-Fast-Track-Success-Handbook/dp/9373014145',
        flipkart:
          'https://www.flipkart.com/oswaal-cadetcore-nda-na-your-fast-track-route-success-handbook-gat/p/itm9a5e43cc8823c?pid=9789373014142&lid=LSTBOK9789373014142OW797S',
      },
      {
        title: 'Cadet Core NDA/NA',
        sub: 'Handbook of Mathematics',
        by: 'Anuj Seth',
        img: `${UP}/2026/03/Handbook-of-Mathematics-1.jpg`,
        w: 256,
        h: 360,
        amazon: 'https://www.amazon.in/CadetCore-Fast-Track-Success-Handbook-Mathematics/dp/9373018973',
        flipkart:
          'https://www.flipkart.com/oswaal-cadetcore-nda-na-your-fast-track-route-success-handbook-mathematics/p/itm73af2801a1cfe?pid=9789373018973&lid=LSTBOK9789373018973NMSGWF',
      },
      {
        title: 'Cadet Core NDA/NA',
        sub: 'Handbook of GAT & Mathematics',
        by: 'CDR Vikas Yadav, Sumit Kumar & Anuj Seth',
        img: `${UP}/2026/03/GAT-and-Maths-4.jpg`,
        w: 416,
        h: 360,
        amazon: 'https://www.amazon.in/CadetCore-Handbook-Mathematics-Complete-Full-Length/dp/9377135451',
        flipkart:
          'https://www.flipkart.com/oswaal-cadetcore-nda-na-2026-handbook-general-ability-test-gat-mathematics-complete-syllabus-coverage-crisp-theory-revision-notes-includes-2-full-length-mock-tests-set-books-exam/p/itm3544987dcbf79?pid=9789377135454&lid=LSTBOK97893771354549WV5UK',
      },
    ],
  },
  {
    id: 'bkp-ssb',
    title: 'SSB Interview & Previous Year Papers',
    text: 'Practical interview preparation and solved PYQs.',
    books: [
      {
        title: 'SSB Interview',
        sub: 'The Practical Approach',
        by: 'CDR Vikas Yadav & Sumit Kumar',
        img: `${UP}/2025/12/SSB-1-1.jpg`,
        w: 256,
        h: 360,
        amazon: 'https://www.amazon.in/Interview-Practical-Approach-Psychology-Development/dp/9373014218',
        flipkart:
          'https://www.flipkart.com/oswaal-ssb-interview-practical-approach-master-psychology-gto-tasks-olq-development-nda-cds-afcat-ta-ssc-tech-all-service-entries-cdr-vikas-yadav-sumit-kumar/p/itmc2a60db55d0ef?pid=9789373014210&lid=LSTBOK9789373014210JVYDZE',
      },
      {
        title: 'SSB Interview',
        sub: 'Workbook',
        by: 'CDR Dharamvir Yadav & Sumit Kumar',
        img: `${UP}/2025/12/Work-Book-SSB.jpg`,
        w: 256,
        h: 360,
        // NOTE: purani site par is book ka Amazon link galti se "Practical Approach" wala tha.
        // Ye link ISBN (9789373012964) se bana hai. Ek baar Amazon par check kar lena.
        amazon: 'https://www.amazon.in/dp/9373012967',
        flipkart:
          'https://www.flipkart.com/oswaal-ssb-interview-workbook-psychology-gto-practice-nda-cds-afcat-tes-navy-ta-acc-all-service-entries-lt-cdr-dharamvir-singh-yadav-sumit-kumar/p/itmac32213f9d01e?pid=9789373012964&lid=LSTBOK9789373012964DARZWW',
      },
      {
        title: 'NDA/NA Maths',
        sub: '12 Years PYQs (2018–2025)',
        by: 'CDR Vikas Yadav & Sumit Kumar',
        img: `${UP}/2026/02/NDA-NA-Mathss-1.jpg`,
        w: 256,
        h: 360,
        // Amazon link purani site par bhi nahi tha
        flipkart:
          'https://www.flipkart.com/oswaal-nda-na-national-defence-academy-naval-academy-chapter-wise-topic-wise-previous-year-questions-solved-papers-2014-2025-i-ii-general-ability-test-mathematics/p/itm09bb168560584?pid=9789373018652&lid=LSTBOK9789373018652UQMMSX',
      },
      {
        title: 'General Ability Test (GAT)',
        sub: 'Previous Year Question Papers',
        by: 'CDR Vikas Yadav & Sumit Kumar',
        img: `${UP}/2026/02/NDA-GAT-Book-PYQs.jpg`,
        w: 256,
        h: 360,
        amazon: 'https://www.amazon.in/dp/9373015397',
        flipkart:
          'https://www.flipkart.com/oswaal-nda-na-national-defence-academy-naval-academy-chapter-wise-topic-wise-previous-year-questions-solved-papers-2014-2025-i-ii-general-ability-test-studies-english/p/itm3a88e1fc5d22c?pid=9789373015392&lid=LSTBOK9789373015392AVO0G3',
      },
    ],
  },
  {
    id: 'bkp-combos',
    title: 'Combo Sets',
    text: 'Two books together, in one set.',
    books: [
      {
        title: 'Combined GAT and Math\u2019s',
        sub: 'Previous Year Questions',
        by: 'CDR Vikas Yadav & Sumit Kumar',
        img: `${UP}/2026/02/NDA-Maths-and-GAT-Books.png`,
        w: 416,
        h: 319,
        flipkart:
          'https://www.flipkart.com/oswaal-nda-na-national-defence-academy-naval-academy-chapter-wise-topic-wise-previous-year-questions-solved-papers-2014-2025-ii-english-general-studies-mathematics-set-2-books-2026-exam/p/itm257a70e555228?pid=9789373014661&lid=LSTBOK9789373014661UTSPUU',
      },
      {
        title: 'SSB Interview',
        sub: 'Workbook & Interview',
        by: 'CDR Vikas Yadav & Sumit Kumar',
        img: `${UP}/2026/02/SSB-Interview-Workbook-Interview-Books.png`,
        w: 416,
        h: 319,
        flipkart:
          'https://www.flipkart.com/oswaal-ssb-interview-workbook-interview-practical-approach-set-2-books-psychology-gto-preparation-nda-cds-afcat-tes-navy-ta-acc-all-defence-service-entries/p/itm0b12c92865321?pid=9789377131654&lid=LSTBOK9789377131654CTBCWZ',
      },
    ],
  },
]

const HERO_IMGS = [
  `${UP}/2026/03/NDA-NA-Book-1.jpg`,
  `${UP}/2026/03/Handbook-of-Mathematics-1.jpg`,
  `${UP}/2025/12/SSB-1-1.jpg`,
  `${UP}/2026/02/NDA-GAT-Book-PYQs.jpg`,
]

const Arrow = ({ dir = 'right', s = 16 }) => (
  <svg
    viewBox='0 0 24 24'
    width={s}
    height={s}
    fill='none'
    stroke='currentColor'
    strokeWidth='2.4'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    {dir === 'right' ? <path d='M5 12h14M13 6l6 6-6 6' /> : <path d='M19 12H5M11 6l-6 6 6 6' />}
  </svg>
)

function BookCard ({ b }) {
  return (
    <article className='bkp-card'>
      <div className='bkp-cover'>
        <img
          src={b.img}
          alt={`${b.title} ${b.sub}`}
          width={b.w}
          height={b.h}
          loading='lazy'
          decoding='async'
          onError={e => {
            e.currentTarget.style.visibility = 'hidden'
          }}
        />
      </div>
      <h3>
        <span>{b.title}</span>
        {b.sub}
      </h3>
      <p className='bkp-by'>By {b.by}</p>
      <div className='bkp-btns'>
        {b.amazon && (
          <a className='bkp-b am' href={b.amazon} target='_blank' rel='noopener noreferrer'>
            Buy on Amazon <Arrow s={14} />
          </a>
        )}
        {b.flipkart && (
          <a className='bkp-b fk' href={b.flipkart} target='_blank' rel='noopener noreferrer'>
            Buy on Flipkart <Arrow s={14} />
          </a>
        )}
      </div>
    </article>
  )
}

const getPv = () => {
  if (typeof window === 'undefined') return 3
  return window.innerWidth >= 1000 ? 3 : window.innerWidth >= 640 ? 2 : 1
}

/* Scroll-snap slider: swipe, arrows, dots, aur autoplay (hover / touch par ruk jata hai) */
function Slider ({ items, label }) {
  const track = useRef(null)
  const holdUntil = useRef(0)
  const [pv, setPv] = useState(getPv)
  const [idx, setIdx] = useState(0)
  const max = Math.max(0, items.length - pv)
  const canSlide = max > 0
  const cssPv = pv === 1 ? 1.1 : pv // mobile par agla card thoda jhalakta hai

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

  const go = i => {
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

  // autoplay
  useEffect(() => {
    if (!canSlide) return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (document.hidden || Date.now() < holdUntil.current) return
      go(idx >= max ? 0 : idx + 1)
    }, 3800)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, max, canSlide])

  const hold = ms => {
    holdUntil.current = Date.now() + ms
  }

  return (
    <div
      className={'bkp-sl' + (canSlide ? '' : ' is-static')}
      style={{ '--pv': cssPv }}
      onMouseEnter={() => hold(1e9)}
      onMouseLeave={() => hold(1500)}
      onFocus={() => hold(1e9)}
      onBlur={() => hold(1500)}
      onTouchStart={() => hold(9000)}
    >
      <div
        className='bkp-track'
        ref={track}
        onScroll={onScroll}
        role='region'
        aria-roledescription='carousel'
        aria-label={label}
        tabIndex={0}
      >
        {items.map(b => (
          <div className='bkp-slide' key={b.title + b.sub}>
            <BookCard b={b} />
          </div>
        ))}
      </div>

      {canSlide && (
        <>
          <button
            type='button'
            className='bkp-nav prev'
            aria-label='Previous books'
            onClick={() => go(idx <= 0 ? max : idx - 1)}
          >
            <Arrow dir='left' s={18} />
          </button>
          <button
            type='button'
            className='bkp-nav next'
            aria-label='Next books'
            onClick={() => go(idx >= max ? 0 : idx + 1)}
          >
            <Arrow s={18} />
          </button>
          <div className='bkp-dots'>
            {Array.from({ length: max + 1 }, (_, i) => (
              <button
                key={i}
                type='button'
                className={i === idx ? 'on' : ''}
                aria-label={`Go to position ${i + 1}`}
                aria-current={i === idx}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function Books () {
  return (
    <main className='bkp'>
      <section className='bkp-hero'>
        <div className='bkp-w bkp-hero-in'>
          <div className='bkp-hero-tx'>
            <div className='bkp-crumb'>
              <Link to='/'>Home</Link> › Books
            </div>
            <h1>LWS Books</h1>
            <p>Handbooks and workbooks for NDA/NA, GAT, Mathematics and SSB Interview preparation.</p>
            <div className='bkp-hero-btns'>
              <a className='bkp-hb gold' href='#bkp-handbooks'>
                Browse Books <Arrow s={16} />
              </a>
              <button
                type='button'
                className='bkp-hb line'
                onClick={() => window.dispatchEvent(new Event('lws:open-enquiry'))}
              >
                Enquire Now
              </button>
            </div>
          </div>
          <div className='bkp-fan' aria-hidden='true'>
            {HERO_IMGS.map((src, i) => (
              <img
                key={src}
                className={'f' + (i + 1)}
                src={src}
                alt=''
                width='256'
                height='360'
                onError={e => {
                  e.currentTarget.style.visibility = 'hidden'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className='bkp-intro bkp-w'>
        <span className='bkp-eyebrow'>From Practice to Selection</span>
        <h2>
          Master Every Step of the <span>SSB Interview, GAT &amp; Mathematics</span>
        </h2>
        <div className='bkp-dotline' aria-hidden='true'>
          <i />
          <i />
          <i />
          <u />
        </div>
        <div className='bkp-chips'>
          {GROUPS.map(g => (
            <a key={g.id} href={`#${g.id}`}>
              {g.title}
            </a>
          ))}
        </div>
      </section>

      {GROUPS.map(g => (
        <section className='bkp-group bkp-w' id={g.id} key={g.id}>
          <div className='bkp-gh'>
            <h3>{g.title}</h3>
            <p>{g.text}</p>
          </div>
          <Slider items={g.books} label={g.title} />
        </section>
      ))}

      <section className='bkp-w'>
        <div className='bkp-cta'>
          <div>
            <h2>Not sure which book to pick?</h2>
            <p>Tell us your exam and we will guide you to the right book and course.</p>
          </div>
          <button
            type='button'
            className='bkp-cta-b'
            onClick={() => window.dispatchEvent(new Event('lws:open-enquiry'))}
          >
            Enquire Now <Arrow s={16} />
          </button>
        </div>
      </section>
    </main>
  )
}
