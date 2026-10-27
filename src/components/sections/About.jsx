import { useRef } from 'react';
import CountUp from '@/components/common/CountUp';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { useParallaxDepth } from '@/hooks/useParallaxDepth';
import '@/styles/sections/about.css';
import { Link } from 'react-router-dom';

/** About LWS: reveal-on-scroll copy, count-up stats and a depth-parallax visual. */
export default function About() {
  const rootRef = useRef(null);
  const visualRef = useRef(null);
  useRevealOnScroll(rootRef, '.abr', { threshold: 0.15 });
  useParallaxDepth(visualRef);

  return (
    <section className="about" id="about" aria-label="About LWS" ref={rootRef}>
      <i className="ab-blob abb1" />
      <i className="ab-blob abb2" />
      <div className="wrap">
        <div className="ab-head abr">
          <span className="ab-eye">
            <b />
            ABOUT LWS
            <b />
          </span>
          <h2>
            Welcome to
            {' '}
            <em>LWS NDA Foundation</em>
            {' '}
            Program
          </h2>
          <div className="ab-line">
            <i />
            <i />
            <i />
            <u />
          </div>
          <p className="ab-tag">
            India’s Most Trusted NDA Foundation & Residential Program for Young Aspirants
          </p>
        </div>
        <div className="ab-grid">
          <div className="ab-copy">
            <p className="ab-lead abr" style={{ '--d': '.05s' }}>
              <b>LWS</b>
              {' '}
              offers India’s leading
              {' '}
              <mark>School + NDA + SSB Integrated Residential Program</mark>
              , designed to build strong academics, discipline, confidence, physical fitness and
              {' '}
              <b>Officer-Like Qualities (OLQs)</b>
              {' '}
              in young defence aspirants.
            </p>
            <p className="abr" style={{ '--d': '.12s' }}>
              Widely recognised as one of the
              {' '}
              <b>best NDA coaching institutes</b>
              {' '}
              and top NDA coaching centres in India, LWS has a proven legacy of results and selections.
            </p>
            <div className="ab-mentors abr" style={{ '--d': '.18s' }}>
              <span className="ab-cap">Under the expert guidance of</span>
              <div className="ab-ment">
                <span className="abav">SS</span>
                <div>
                  <b>Sumit Sir</b>
                  <small>Expert mentor</small>
                </div>
              </div>
              <div className="ab-ment">
                <span className="abav abg">VY</span>
                <div>
                  <b>Commander Vikas Yadav (Retd.)</b>
                  <small>Expert mentor</small>
                </div>
              </div>
            </div>
            <ul className="ab-ticks abr" style={{ '--d': '.24s' }}>
              <li>
                <i>✓</i>
                Structured academic teaching
              </li>
              <li>
                <i>✓</i>
                Real SSB exposure
              </li>
              <li>
                <i>✓</i>
                Continuous mentorship from day one
              </li>
            </ul>
            <div className="ab-cta abr" style={{ '--d': '.3s' }}>
              <Link className="ab-btn p" to="enquire">
                Enquire Now
                {' '}
                <span>→</span>
              </Link>
              {' '}
              <Link className="ab-btn" to="nda-foundation">
                Explore NDA Foundation
              </Link>
            </div>
          </div>
          <div className="ab-vis abr" style={{ '--d': '.1s' }} ref={visualRef}>
            <div className="ab-glow" />
            <div className="ab-main" data-depth="6">
              <div className="cimg pH" />
              <span className="ab-join">
                <i />
                JOIN NOW
              </span>
              <div className="ab-banner">
                <b>LWS Foundation Courses</b>
                <span>
                  After 8th
                  {' '}
                  <em>(4 Years)</em>
                  {' '}
                  & 10th
                  {' '}
                  <em>(2 Years)</em>
                </span>
                <small>Integrated Schooling + NDA Coaching</small>
              </div>
            </div>
            <div className="ab-th abt1" data-depth="14">
              <div className="cimg pC" style={{ '--pos': '60% 30%' }} />
            </div>
            <div className="ab-th abt2" data-depth="-10">
              <div className="cimg pP" style={{ '--pos': '50% 60%' }} />
            </div>
            <div className="ab-chip abc1" data-depth="18">
              <CountUp to={4} />
              <span>
                Year programme
                <br />
                <small>after Class 8</small>
              </span>
            </div>
            <div className="ab-chip abc2" data-depth="-14">
              <CountUp to={2} />
              <span>
                Year programme
                <br />
                <small>after Class 10</small>
              </span>
            </div>
          </div>
        </div>
        <div className="ab-pillars">
          <div className="ab-p abr" style={{ '--d': '.0s' }}>
            <span>📚</span>
            <b>Strong academics</b>
            <small>Regular schooling integrated with NDA-focused preparation.</small>
          </div>
          <div className="ab-p abr" style={{ '--d': '.07s' }}>
            <span>🎖️</span>
            <b>Discipline</b>
            <small>A residential routine that builds consistency.</small>
          </div>
          <div className="ab-p abr" style={{ '--d': '.14s' }}>
            <span>💪</span>
            <b>Confidence</b>
            <small>Mentorship and personality building from day one.</small>
          </div>
          <div className="ab-p abr" style={{ '--d': '.21s' }}>
            <span>🏃</span>
            <b>Physical fitness</b>
            <small>Fitness training that prepares you for SSB.</small>
          </div>
          <div className="ab-p abr" style={{ '--d': '.28s' }}>
            <span>⭐</span>
            <b>Officer-Like Qualities</b>
            <small>Real SSB exposure to develop your OLQs.</small>
          </div>
        </div>
        <div className="ab-progs">
          <div className="ab-prog abr" style={{ '--d': '.0s' }}>
            <span className="ab-yr">
              <CountUp to={4} />
              YEAR
            </span>
            <div>
              <h3>4-Year NDA Foundation Program</h3>
              <em>After Class 8</em>
              <p>
                Integrates regular schooling with NDA-focused preparation, weekly tests, doubt-clearing sessions and detailed performance tracking.
              </p>
            </div>
          </div>
          <div className="ab-prog abgold abr" style={{ '--d': '.1s' }}>
            <span className="ab-yr">
              <CountUp to={2} />
              YEAR
            </span>
            <div>
              <h3>2-Year NDA Program</h3>
              <em>After Class 10</em>
              <p>
                Integrates regular schooling with NDA-focused preparation, weekly tests, doubt-clearing sessions and detailed performance tracking.
              </p>
            </div>
          </div>
        </div>
        <div className="ab-loc abr">
          <span className="ab-cap">Available across key locations</span>
          {' '}
          <span className="ab-pin">
            <i />
            Haryana
          </span>
          {' '}
          <span className="ab-pin">
            <i />
            Pune (Maharashtra)
          </span>
          {' '}
          <span className="ab-pin">
            <i />
            Lucknow
          </span>
          {' '}
          <small>Accessible to aspirants from different parts of India.</small>
        </div>
        <div className="ab-quote abr">
          <span className="abq">“</span>
          <p>
            <b>LWS consistently delivers outstanding board results alongside defence exam success</b>
            , making it a preferred destination for parents seeking the best NDA coaching with integrated school education.
          </p>
        </div>
      </div>
    </section>
  );
}
