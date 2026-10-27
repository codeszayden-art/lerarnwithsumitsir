import { Link } from 'react-router-dom'
 

/* ---- Mock kholne ka path yahan set karo (apne routes ke hisaab se) ---- */
const MOCKS = [1, 2, 3, 4, 5].map((n) => ({ n, path: `/mock-tests/oir/${n}` }))

const STEPS = [
  ['Print OMR Sheet First', 'Print the OMR sheet on the first page to simulate actual SSB test conditions.'],
  ['Strict Time Management', 'Use the timer widget (bottom-left) or follow the time limit mentioned in the PDF.'],
  ['Verify with Solutions', 'Solutions are accessible via the links provided below each PDF after completing the test.'],
]

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export default function OirTest() {
  return (
    <main className="oir">
      <div className="oir-w">
        <section className="oir-hero">
          <span className="oir-chip">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
              <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />
            </svg>
            OIR · Free Mock Series
          </span>
          <h1>Officers Intelligence <span>Rating Test</span></h1>

          <div className="oir-steps">
            {STEPS.map(([t, p], i) => (
              <div className="oir-step" key={t}>
                <b>{i + 1}</b>
                <div>
                  <h2>{t}</h2>
                  <p>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="oir-papers" aria-labelledby="oir-papers-h">
          <div className="oir-head">
            <h2 id="oir-papers-h">OIR Practice Test Papers</h2>
            <Link to="/mock-tests" className="oir-all">All SSB Tests <Arrow /></Link>
          </div>

          <div className="oir-grid">
            {MOCKS.map(({ n, path }) => (
              <article className="oir-card" key={n}>
                <h3>OIR Mock Test {n}</h3>
                <Link to={path} className="oir-go">Start Mock {n} <Arrow /></Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
