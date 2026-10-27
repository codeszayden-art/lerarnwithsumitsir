import { Link } from 'react-router-dom'
// import './PpdtTest.css'

/* ---- Mock kholne ka path yahan set karo (apne routes ke hisaab se) ---- */
const MOCKS = [1, 2, 3, 4, 5, 6].map(n => ({ n, path: `/mock-tests/ppdt/${n}` }))

const STEPS = [
  [
    'Print / Draw Sheet First',
    'Prepare a clean A4 sheet with the square box for characters and action line before starting.',
  ],
  [
    '30s Image Perception',
    'The hazy slide appears on fullscreen for exactly 30 seconds before disappearing automatically.',
  ],
  [
    '4m 30s Writing & Bell',
    'Write your story in 4m 30s. Automated bell signals when writing time starts and concludes.',
  ],
]

const Arrow = () => (
  <svg
    viewBox='0 0 24 24'
    width='15'
    height='15'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.4'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <path d='M5 12h14M13 6l6 6-6 6' />
  </svg>
)

export default function PpdtTest () {
  return (
    <main className='pp'>
      <div className='pp-w'>
        <section className='pp-hero'>
          <span className='pp-chip'>
            <svg viewBox='0 0 24 24' width='13' height='13' fill='currentColor' aria-hidden='true'>
              <path d='M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z' />
            </svg>
            PP&amp;DT · Free Mock Series
          </span>
          <h1>
            Picture Perception &amp; <span>Discussion Test</span>
          </h1>

          <div className='pp-steps'>
            {STEPS.map(([t, p], i) => (
              <div className='pp-step' key={t}>
                <b>{i + 1}</b>
                <div>
                  <h2>{t}</h2>
                  <p>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='pp-papers' aria-labelledby='pp-papers-h'>
          <div className='pp-head'>
            <h2 id='pp-papers-h'>PP&amp;DT Practice Test Slides</h2>
            <Link to='/mock-tests' className='pp-all'>
              All SSB Tests <Arrow />
            </Link>
          </div>

          <div className='pp-grid'>
            {MOCKS.map(({ n, path }) => (
              <article className='pp-card' key={n}>
                <h3>PP&amp;DT Mock Test {n}</h3>
                <Link to={path} className='pp-go'>
                  Start Mock {n} <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
