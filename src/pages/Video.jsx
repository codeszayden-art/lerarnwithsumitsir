import { useRef, useState } from 'react'

/* Banner background: apni image lagani ho to yahan path daalo, e.g. '/images/videos-banner.jpg' */
const HERO_IMG = 'https://i.ytimg.com/vi/m1ejiWKvQ8k/maxresdefault.jpg'
const CHANNEL = 'https://www.youtube.com/c/LearnwithSumitSir'

const VIDEOS = [
  {
    id: '0Y48bwJ5YEQ',
    tag: 'Success',
    title: 'Students Recommended for Army, Navy & Air Force',
    sub: 'Schooling + NDA Coaching, LWS Foundation Batch',
  },
  {
    id: '2pNuP7oI-i4',
    tag: 'Student Story',
    title: 'Kartik Kumar – Class 11 Student, Shamli (UP)',
    sub: 'Sharing his LWS Foundation journey & experience',
  },
  {
    id: 'uoLGSzZswiM',
    tag: 'Topper',
    title: 'CDS AIR 2 Naveen Kaushik’s Story',
    sub: 'Toppers insights, tips & strategies for every defence aspirant',
  },
  {
    id: 'tFk7ypsipmc',
    tag: 'Result',
    title: 'LWS NDA 155 Result 🔥',
    sub: 'Record selections in NDA – LWS toppers making history',
  },
  {
    id: 'm1ejiWKvQ8k',
    tag: 'Event',
    title: 'LWS Felicitation Ceremony 2025',
    sub: 'Celebrating our aspirants’ success in NDA 155, CDS & other entries',
  },
  {
    id: 'UpoErPLkrRg',
    tag: 'Podcast',
    title: 'SSB & Service Entry Secrets Revealed',
    sub: 'Podcast with retired defence officers, hosted by Sumit Sir',
  },
]

const thumbUrl = (id, q) => `https://i.ytimg.com/vi/${id}/${q}.jpg`

function Thumb ({ id, big }) {
  const [q, setQ] = useState(big ? 'maxresdefault' : 'mqdefault')
  const fix = e => {
    if (q !== 'hqdefault' && (e.type === 'error' || e.target.naturalWidth <= 120)) setQ('hqdefault')
  }
  return <img src={thumbUrl(id, q)} alt='' loading={big ? 'eager' : 'lazy'} onLoad={fix} onError={fix} />
}

const YtIcon = () => (
  <svg viewBox='0 0 576 512' aria-hidden='true'>
    <path d='M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z' />
  </svg>
)

export default function VideosPage () {
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(false)
  const stageRef = useRef(null)
  const v = VIDEOS[i]

  const pick = n => {
    setI(n)
    setPlaying(true)
    stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className='vid'>
      {/* BANNER */}
      <header className='vid-hero' style={{ '--hero': `url("${HERO_IMG}")` }}>
        <div className='vid-hero-in'>
          <span className='vid-pill'>
            <YtIcon /> LWS Videos
          </span>
          <h1>
            Watch. Learn. <em>Get Selected.</em>
          </h1>
          <p>
            Topper stories, NDA &amp; CDS results, SSB secrets and success journeys from the LWS family, all
            in one place.
          </p>
          <div className='vid-cta'>
            <a className='vid-btn' href='#vid-stage'>
              ▶ Watch Now
            </a>
            <a className='vid-btn ghost' href={CHANNEL} target='_blank' rel='noopener noreferrer'>
              Subscribe
            </a>
          </div>
          <div className='vid-stats'>
            <div>
              <b>{VIDEOS.length}</b>Featured Videos
            </div>
            <div>
              <b>NDA · CDS · SSB</b>Success Stories
            </div>
          </div>
        </div>
      </header>

      {/* PLAYER + PLAYLIST */}
      <section className='vid-w' id='vid-stage' ref={stageRef}>
        <div className='vid-head'>
          <small>Video Gallery</small>
          <h2>Our Latest Videos</h2>
        </div>

        <div className='vid-stage'>
          <div className='vid-main'>
            <div className='vid-frame'>
              {playing ? (
                <iframe
                  key={v.id}
                  src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={v.title}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                />
              ) : (
                <button
                  className='vid-poster'
                  onClick={() => setPlaying(true)}
                  aria-label={`Play ${v.title}`}
                >
                  <Thumb key={v.id} id={v.id} big />
                  <span className='vid-play'>
                    <svg viewBox='0 0 24 24'>
                      <path d='M8 5v14l11-7z' />
                    </svg>
                  </span>
                </button>
              )}
            </div>
            <div className='vid-info'>
              <span className='vid-tag'>{v.tag}</span>
              <h3>{v.title}</h3>
              <p>{v.sub}</p>
              <a href={`https://www.youtube.com/watch?v=${v.id}`} target='_blank' rel='noopener noreferrer'>
                Watch on YouTube ↗
              </a>
            </div>
          </div>

          <aside className='vid-list' aria-label='Playlist'>
            <div className='vid-lh'>
              Up Next <span>{VIDEOS.length} videos</span>
            </div>
            <div className='vid-scroll'>
              {VIDEOS.map((x, n) => (
                <button key={x.id} className={`vid-item${n === i ? ' on' : ''}`} onClick={() => pick(n)}>
                  <span className='vid-th'>
                    <Thumb id={x.id} />
                    <i>{n === i && playing ? '● Playing' : '▶'}</i>
                  </span>
                  <span className='vid-tx'>
                    <em>{x.tag}</em>
                    <b>{x.title}</b>
                  </span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* SUBSCRIBE BAND */}
      <section className='vid-w vid-bandw'>
        <div className='vid-band'>
          <div>
            <h3>Never miss a new video</h3>
            <p>Get every new topper story, result and SSB tip as soon as it goes live.</p>
          </div>
          <a className='vid-yt' href={CHANNEL} target='_blank' rel='noopener noreferrer'>
            <YtIcon />
            <span>Subscribe Our Channel To Get All New Notifications</span>
          </a>
        </div>
      </section>
    </main>
  )
}
