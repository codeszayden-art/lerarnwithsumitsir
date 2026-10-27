import { useMemo, useRef, useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { useInfiniteSlider } from '@/hooks/useInfiniteSlider';
import { useInView } from '@/hooks/useInView';
import '@/styles/sections/achievers.css';

const CLONES = 2;
const pad = (n) => String(n).padStart(2, '0');

/** Achievers testimonials: seamless infinite slider driven by a progress bar, with swipe and desktop tilt. */
export default function Achievers() {
  const { achievers } = useContent();
  const total = achievers.length;
  const rootRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [, inView] = useInView({ threshold: 0.15, once: false, ref: rootRef });
  const paused = hovered || !inView;

  const { index, perView, go, trackRef, trackStyle, runKey, onTransitionEnd, onFillEnd, onTouchStart, onTouchEnd } =
    useInfiniteSlider({ total, clones: CLONES, paused });

  const slides = useMemo(() => [...achievers, ...achievers.slice(0, CLONES)], [achievers]);
  const live = useMemo(() => new Set(Array.from({ length: perView }, (_, k) => (index + k) % total)), [index, perView, total]);
  const counter =
    perView === 2
      ? `${pad((index % total) + 1)} - ${pad(((index + 1) % total) + 1)} / ${pad(total)}`
      : `${pad((index % total) + 1)} / ${pad(total)}`;

  const onTilt = (e) => {
    if (e.pointerType !== 'mouse') return;
    const card = e.target.closest('.lwsx-card');
    if (!card || !card.parentNode.classList.contains('is-live')) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 7}deg`);
    card.style.setProperty('--rx', `${(0.5 - (e.clientY - r.top) / r.height) * 5}deg`);
  };
  const onTiltEnd = (e) => {
    const card = e.target.closest && e.target.closest('.lwsx-card');
    if (card) {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    }
  };

  return (
    <section
      id="lwsx-ach"
      aria-label="What achievers say about us"
      className={paused ? 'is-paused' : undefined}
      ref={rootRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="wrap">
        <h2 className="lwsx-title">
          What
          {' '}
          <em>Achievers</em>
          {' '}
          Say About Us?
        </h2>
        <div className="lwsx-rule">
          <i />
          <i />
          <i />
          <b />
        </div>
        <div className="lwsx-view" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onPointerMove={onTilt} onPointerOut={onTiltEnd}>
          <div className="lwsx-track" ref={trackRef} style={trackStyle} onTransitionEnd={onTransitionEnd}>
            {slides.map((a, i) => (
              <article
                data-i={i % total}
                key={`${a.id}-${i}`}
                className={`lwsx-slide${live.has(i % total) ? ' is-live' : ''}`}
                aria-hidden={i >= total ? true : undefined}
              >
                <div className="lwsx-card">
                  <div className="lwsx-band" data-air={a.air}>
                    <span className="lwsx-badge">{a.air}</span>
                  </div>
                  <div className="lwsx-photo">
                    <img src={a.photo} alt={a.name} width={116} height={116} loading="lazy" />
                  </div>
                  <div className="lwsx-body">
                    <h3 className="lwsx-name" style={{ '--d': '0' }}>{a.name}</h3>
                    <p className="lwsx-rank" style={{ '--d': '1' }}>{a.rank}</p>
                    <svg className="lwsx-qm" viewBox="0 0 48 36" aria-hidden="true">
                      <path d="M0 36V20C0 8 6 1 18 0v7c-6 1-9 5-9 10h9v19zM27 36V20C27 8 33 1 45 0v7c-6 1-9 5-9 10h9v19z" />
                    </svg>
                    <p className="lwsx-quote" style={{ '--d': '2' }}>{a.quote}</p>
                    <div className="lwsx-stars" style={{ '--d': '3' }} aria-label="5 out of 5 stars">
                      <s />
                      <s />
                      <s />
                      <s />
                      <s />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="lwsx-nav">
          <button type="button" className="lwsx-btn lwsx-prev"
            onClick={() => go(-1)} aria-label="Previous">‹</button>
          <div className="lwsx-meter">
            <span className="lwsx-count">{counter}</span>
            <span className="lwsx-line">
              <span key={runKey} className="lwsx-fill is-run" onAnimationEnd={onFillEnd} />
            </span>
          </div>
          <button type="button" className="lwsx-btn lwsx-next"
            onClick={() => go(1)} aria-label="Next">›</button>
        </div>
      </div>
    </section>
  );
}
