import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import '@/styles/sections/updates.css';

const SITE = 'https://learnwithsumit.in/';
const IMG = `${SITE}wp-content/uploads/2026/10/`;

/**
 * Blog cards. The first post is the big card on the left, the next three are the small cards on the right.
 * Every card opens its article in a new tab. To open your own /blogs page instead, change `url`.
 */
const POSTS = [
  {
    tag: 'Academy guide',
    title: 'How to Select the Best Defence Academy in India: A Checklist for Students and Parents',
    text: 'Choosing the best defence academy in India is an important decision for students who aspire to join the Indian Armed Forces.',
    date: 'October 17, 2026',
    img: `${IMG}10.webp`,
    url: `${SITE}how-to-select-the-best-defence-academy-in-india-a-checklist-for-students-and-parents/`,
  },
  {
    tag: 'SSB',
    title: 'How to Develop Officer-Like Qualities for SSB: Daily Habits for Defence Aspirants',
    date: 'October 17, 2026',
    img: `${IMG}9.webp`,
    url: `${SITE}how-to-develop-officer-like-qualities-for-ssb-daily-habits-for-defence-aspirants/`,
  },
  {
    tag: 'Coaching',
    title: 'Best Defence Coaching in India: Residential vs Online vs Classroom Coaching',
    date: 'October 17, 2026',
    img: `${IMG}8.webp`,
    url: `${SITE}best-defence-coaching-in-india-residential-vs-online-vs-classroom-coaching/`,
  },
  {
    tag: 'NDA 2027',
    title: 'NDA Preparation Strategy for 2027: A Practical 6-Month Study Plan for Beginners',
    date: 'October 17, 2026',
    img: `${IMG}7.webp`,
    url: `${SITE}nda-preparation-strategy-for-2027-a-practical-6-month-study-plan-for-beginners/`,
  },
];

// Gradient colours shown behind a small card image (visible only if the image fails to load)
const FALLBACK = ['a', 'b', 'c'];

/** Blog image. If it cannot load, it hides itself and the gradient behind it shows instead. */
function Photo({ src }) {
  const [bad, setBad] = useState(false);
  if (bad) return null;
  return <img src={src} alt="" loading="lazy" onError={() => setBad(true)} />;
}

/** Latest defence updates: featured article plus three side cards. */
export default function Updates() {
  const [sectionRef, inView] = useInView({ threshold: 0.2 });
  const [feature, ...side] = POSTS;

  return (
    <section className={`lwu${inView ? ' in' : ''}`} id="updates" aria-label="Latest defence updates" ref={sectionRef}>
      <div className="lwu-w">
        <div className="lwu-hd">
          <div>
            <h2 className="lwu-h">Latest Defence Updates</h2>
            <p className="lwu-sub">
              Guides, strategies and checklists for NDA, CDS, AFCAT and SSB aspirants.
            </p>
          </div>
          <a
            className="lwu-all"
            href={`${SITE}blogs/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View all articles
            {' '}
            <b>→</b>
          </a>
        </div>

        <div className="lwu-grid">
          <a className="lwu-ft" href={feature.url} target="_blank" rel="noopener noreferrer" style={{ '--k': '0' }}>
            <div className="lwu-fc">
              <span className="lwu-tag">{feature.tag}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <span className="lwu-meta">{feature.date}</span>
              <span className="lwu-go">
                Read full article
                {' '}
                <b>→</b>
              </span>
            </div>
            <div className="lwu-art" aria-hidden="true">
              <Photo src={feature.img} />
              <span className="lwu-sh">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </span>
            </div>
          </a>

          <div className="lwu-side">
            {side.map((p, i) => (
              <a
                className="lwu-cd"
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--k': String(i + 1) }}
              >
                <div className={`lwu-th ${FALLBACK[i % FALLBACK.length]}`} aria-hidden="true">
                  <Photo src={p.img} />
                </div>
                <div className="lwu-cb">
                  <span className="lwu-tag2">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <div className="lwu-meta">
                    <span>{p.date}</span>
                    <b>→</b>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
