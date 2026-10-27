import { useEffect, useRef, useState } from 'react'
import { usePointerVars } from '@/hooks/usePointerVars'
import '@/styles/sections/hero.css'
import imgHeroCampusFlypast from '@/assets/images/hero/hero-campus-flypast.webp'
import imgHeroGurukul from '@/assets/images/hero/hero-gurukul.webp'
import imgHeroMentorsApp from '@/assets/images/hero/hero-mentors-app.webp'
import { Link } from 'react-router-dom';

const SLIDES = 3
const AUTOPLAY_MS = 6000

/** Hero slider: autoplay (reset on manual navigation) and a subtle mouse parallax. */
export default function Hero () {
  const heroRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [cycle, setCycle] = useState(0)
  usePointerVars(heroRef, {
    names: ['--mx', '--my'],
    factors: [-16, -10],
    unit: 'px',
    fineOnly: true,
    resetOnLeave: true,
  })

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % SLIDES), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [cycle])

  const step = dir => {
    setIndex(i => (i + dir + SLIDES) % SLIDES)
    setCycle(c => c + 1)
  }

  return (
   <section className="hero rz-on" ref={heroRef}>
  <div className="streak" />

  <div className="wrap">
    <div className="slides">
      {/* Slide 1 */}
      <div className={`slide${index === 0 ? ' on' : ''}`}>
        <div className="htx">
          <h1>
            Your Ambition
            <span>OUR MISSION</span>
          </h1>

          <p>NDA | CDS | AFCAT | SSB Interview Preparation</p>

          <div className="row">
            <Link className="btn p" to="/#enquire">
              Register Now
            </Link>

            <Link className="lnk" to="/#courses">
              Know More
            </Link>
          </div>
        </div>

        <div className="fig rz full">
          <img
            src={imgHeroCampusFlypast}
            alt="Learn with Sumit students in front of the campus with an air force fly-past"
            fetchPriority="high"
          />
        </div>
      </div>

      {/* Slide 2 */}
      <div className={`slide${index === 1 ? ' on' : ''}`}>
        <div className="htx">
          <h1>
            Where Dreams
            <span>EARN THEIR UNIFORM</span>
          </h1>

          <p>
            A joint initiative by Learn with Sumit and Defence Mania.
          </p>

          <div className="row">
            <Link className="btn p" to="/#gurukul">
              Register Now
            </Link>

            <Link className="lnk" to="/#enquire">
              Talk to us
            </Link>
          </div>
        </div>

        <div className="fig rz full">
          <img
            src={imgHeroGurukul}
            alt="Learn with Sumit students and mentor with the campus and defence heroes behind them"
            loading="lazy"
          />
        </div>
      </div>

      {/* Slide 3 */}
      <div className={`slide${index === 2 ? ' on' : ''}`}>
        <div className="htx">
          <h1>
            Serve The Nation.
            <span>SHAPE YOUR FUTURE.</span>
          </h1>

          <p>NDA | CDS | AFCAT | SSB Interview Preparation</p>

          <div className="row">
            <Link className="btn p" to="/#enquire">
              Register Now
            </Link>

            <Link className="lnk" to="/#courses">
              Know More
            </Link>
          </div>
        </div>

        <div className="fig rz full">
          <img
            src={imgHeroMentorsApp}
            alt="Learn with Sumit mentors with the LWS learning app"
            loading="lazy"
          />
        </div>
      </div>

      {/* Slider navigation */}
      <button
        type="button"
        className="arr l"
        aria-label="Previous"
        onClick={() => step(-1)}
      >
        ‹
      </button>

      <button
        type="button"
        className="arr r"
        aria-label="Next"
        onClick={() => step(1)}
      >
        ›
      </button>
    </div>

    {/* Slider dots */}
    <div className="dots">
      {[0, 1, 2].map((k) => (
        <b
          key={k}
          className={index === k ? 'on' : undefined}
        />
      ))}
    </div>

    {/* Helpful links */}
    <div className="choose">
      <span>Need help choosing?</span>

      <Link to="/videos/">
        Videos
      </Link>

      {/* <Link to="/blogs/">Blogs</Link> */}

      <Link to="/faq/">
        FAQs
      </Link>

      <Link to="/gallery/">
        Gallery
      </Link>

      {/* <Link to="/resources">Resources</Link> */}

      {/* <Link to="/lws-communication-course/">
        LWS Communication Course
      </Link> */}

      {/* <Link to="/contact/">
        Contact
      </Link> */}

      <Link to="/results/">
        Results
      </Link>

      <Link to="/career">
        Career
      </Link>

      <Link to="/lws-answer-key/">
        Answer Key NDA 1 2026
      </Link>
    </div>
  </div>
</section>
  )
}
