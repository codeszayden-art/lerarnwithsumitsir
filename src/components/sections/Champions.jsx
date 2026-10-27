import { useEffect, useMemo, useRef, useState } from 'react';
import { CHAMPION_PHOTOS } from '@/data/champions';
import { useInView } from '@/hooks/useInView';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePointerVars } from '@/hooks/usePointerVars';
import { prefersReducedMotion } from '@/utils/device';
import '@/styles/sections/champions.css';

const n = CHAMPION_PHOTOS.length;
const AUTOPLAY_MS = 3200;
const SWIPE_PX = 45;

/** 3D champions carousel: drag, swipe, arrows, keyboard and autoplay while visible. */
export default function Champions() {
  const [sectionRef, inView] = useInView({ threshold: 0.25, once: false });
  const stageRef = useRef(null);
  const firstCardRef = useRef(null);
  const dragStart = useRef(null);
  const moved = useRef(false);
  const [cur, setCur] = useState(0);
  const [hover, setHover] = useState(false);
  const [intro, setIntro] = useState('pre');
  const [seen, setSeen] = useState(() => new Set());
  const small = useMediaQuery('(max-width: 699px)');
  const [cardWidth, setCardWidth] = useState(240);
  usePointerVars(stageRef, { factor: 2, names: ['--tx', '--ty'] });

  const sparks = useMemo(
    () =>
      Array.from({ length: 26 }, () => ({
        left: `${Math.random() * 100}%`,
        '--s': `${2 + Math.random() * 4}px`,
        '--t': `${6 + Math.random() * 8}s`,
        '--d': `${-Math.random() * 12}s`,
      })),
    [],
  );

  const go = (k) => setCur(((k % n) + n) % n);
  const offset = (i) => {
    let d = i - cur;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };
  const cardStyle = (d, a) => {
    const step = cardWidth * (small ? 0.56 : 0.74);
    const max = small ? 1 : 3;
    return {
      '--k': a,
      transform: `translate(-50%,-50%) translateX(${d * step}px) translateZ(${-a * 110}px) rotateY(${-d * 26}deg) scale(${a ? 1 - a * 0.07 : 1.14})`,
      opacity: a <= max ? Math.max(0, 1 - a * 0.25) : 0,
      zIndex: 50 - a,
      pointerEvents: a <= max ? 'auto' : 'none',
    };
  };

  useEffect(() => {
    if (firstCardRef.current) setCardWidth(firstCardRef.current.offsetWidth || 240);
  }, [small]);

  useEffect(() => {
    setSeen((prev) => {
      const next = new Set(prev);
      for (let i = 0; i < n; i += 1) if (Math.abs(offset(i)) <= 5) next.add(i);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur]);

  useEffect(() => {
    if (inView && intro === 'pre') {
      setIntro('intro');
      const t = setTimeout(() => setIntro('done'), 1400);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [inView, intro]);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const id = setInterval(() => {
      if (inView && !hover && dragStart.current === null && !document.hidden) setCur((c) => (c + 1) % n);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [inView, hover]);

  useEffect(() => {
    const up = (e) => {
      if (dragStart.current === null) return;
      const dx = e.clientX - dragStart.current;
      dragStart.current = null;
      if (Math.abs(dx) > SWIPE_PX) {
        moved.current = true;
        setCur((c) => (((c + (dx < 0 ? 1 : -1)) % n) + n) % n);
        setTimeout(() => {
          moved.current = false;
        }, 50);
      }
    };
    window.addEventListener('pointerup', up);
    return () => window.removeEventListener('pointerup', up);
  }, []);

  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(cur + 1);
    if (e.key === 'ArrowLeft') go(cur - 1);
  };
  const onDown = (e) => {
    dragStart.current = e.clientX;
    moved.current = false;
  };
  const onLeave = () => setHover(false);

  return (
    <section className={`chx${inView ? ' in' : ''}`} id="champions" aria-label="Champions who made us proud" ref={sectionRef}>
      <div className="chx-bg">
        <i className="a1" />
        <i className="a2" />
        {' '}
        <svg
          className="chx-scene"
          viewBox="0 0 1440 520"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="chxT1">
              <stop offset={0} stopColor="#ff9933" stopOpacity={0} />
              <stop offset={1} stopColor="#ff9933" />
            </linearGradient>
            <linearGradient id="chxT2">
              <stop offset={0} stopColor="#fff" stopOpacity={0} />
              <stop offset={1} stopColor="#fff" />
            </linearGradient>
            <linearGradient id="chxT3">
              <stop offset={0} stopColor="#2fbf2f" stopOpacity={0} />
              <stop offset={1} stopColor="#2fbf2f" />
            </linearGradient>
            <linearGradient id="chxM" x1={0} y1={0} x2={0} y2={1}>
              <stop offset={0} stopColor="#ffb347" stopOpacity=".35" />
              <stop offset={1} stopColor="#ffb347" stopOpacity={0} />
            </linearGradient>
            <symbol id="chxJ" viewBox="0 0 40 20">
              <path
                d="M40 10 L27 8 L15 0 L10 0 L16 8 L4 8 L0 3 L0 17 L4 12 L16 12 L10 20 L15 20 L27 12Z"
                fill="#d6e4ff"
              />
            </symbol>
          </defs>
          <g fill="#fff">
            <circle className="chx-st" cx={673} cy={250} r={0.8} style={{ animationDelay: '-1.6s' }} />
            <circle className="chx-st" cx={108} cy={26} r={1.5} style={{ animationDelay: '-0.4s' }} />
            <circle className="chx-st" cx={1203} cy={22} r={1.5} style={{ animationDelay: '-0.9s' }} />
            <circle className="chx-st" cx={186} cy={119} r={1.1} style={{ animationDelay: '-0.3s' }} />
            <circle className="chx-st" cx={195} cy={149} r={1.1} style={{ animationDelay: '-0.2s' }} />
            <circle className="chx-st" cx={1168} cy={39} r={0.8} style={{ animationDelay: '-2.5s' }} />
            <circle className="chx-st" cx={1203} cy={250} r={0.8} style={{ animationDelay: '-2.3s' }} />
            <circle className="chx-st" cx={822} cy={20} r={0.8} style={{ animationDelay: '-0.2s' }} />
            <circle className="chx-st" cx={282} cy={82} r={1.1} style={{ animationDelay: '-0.6s' }} />
            <circle className="chx-st" cx={251} cy={154} r={1.1} style={{ animationDelay: '-2.2s' }} />
            <circle className="chx-st" cx={1406} cy={54} r={0.8} style={{ animationDelay: '-2.3s' }} />
            <circle className="chx-st" cx={1318} cy={56} r={1.1} style={{ animationDelay: '-0.4s' }} />
            <circle className="chx-st" cx={138} cy={152} r={0.8} style={{ animationDelay: '-2.5s' }} />
            <circle className="chx-st" cx={1026} cy={182} r={1.5} style={{ animationDelay: '-1.7s' }} />
            <circle className="chx-st" cx={653} cy={127} r={1.5} style={{ animationDelay: '-3.7s' }} />
            <circle className="chx-st" cx={750} cy={84} r={0.8} style={{ animationDelay: '-3.2s' }} />
            <circle className="chx-st" cx={509} cy={28} r={1.5} style={{ animationDelay: '-1.2s' }} />
            <circle className="chx-st" cx={1023} cy={232} r={1.1} style={{ animationDelay: '-2.9s' }} />
            <circle className="chx-st" cx={599} cy={163} r={0.8} style={{ animationDelay: '-0.5s' }} />
            <circle className="chx-st" cx={866} cy={50} r={1.1} style={{ animationDelay: '-0.6s' }} />
            <circle className="chx-st" cx={1011} cy={115} r={0.8} style={{ animationDelay: '-3.8s' }} />
            <circle className="chx-st" cx={168} cy={203} r={1.5} style={{ animationDelay: '-2.3s' }} />
            <circle className="chx-st" cx={652} cy={95} r={1.5} style={{ animationDelay: '-1.4s' }} />
            <circle className="chx-st" cx={1027} cy={156} r={1.1} style={{ animationDelay: '-0.3s' }} />
            <circle className="chx-st" cx={201} cy={249} r={1.1} style={{ animationDelay: '-1.9s' }} />
            <circle className="chx-st" cx={1370} cy={24} r={0.8} style={{ animationDelay: '-2.9s' }} />
            <circle className="chx-st" cx={644} cy={173} r={1.5} style={{ animationDelay: '-4.0s' }} />
            <circle className="chx-st" cx={922} cy={80} r={1.5} style={{ animationDelay: '-1.5s' }} />
            <circle className="chx-st" cx={1379} cy={96} r={0.8} style={{ animationDelay: '-3.8s' }} />
            <circle className="chx-st" cx={737} cy={51} r={1.5} style={{ animationDelay: '-0.5s' }} />
            <circle className="chx-st" cx={130} cy={63} r={1.1} style={{ animationDelay: '-0.5s' }} />
            <circle className="chx-st" cx={517} cy={109} r={1.1} style={{ animationDelay: '-3.7s' }} />
            <circle className="chx-st" cx={1026} cy={28} r={0.8} style={{ animationDelay: '-1.8s' }} />
            <circle className="chx-st" cx={1135} cy={79} r={0.8} style={{ animationDelay: '-3.3s' }} />
            <circle className="chx-st" cx={1136} cy={79} r={1.5} style={{ animationDelay: '-1.7s' }} />
            <circle className="chx-st" cx={744} cy={182} r={1.1} style={{ animationDelay: '-3.8s' }} />
            <circle className="chx-st" cx={319} cy={29} r={0.8} style={{ animationDelay: '-0.6s' }} />
            <circle className="chx-st" cx={1358} cy={67} r={0.8} style={{ animationDelay: '-1.9s' }} />
            <circle className="chx-st" cx={1216} cy={54} r={1.1} style={{ animationDelay: '-1.1s' }} />
            <circle className="chx-st" cx={308} cy={115} r={1.5} style={{ animationDelay: '-1.5s' }} />
            <circle className="chx-st" cx={1169} cy={89} r={0.8} style={{ animationDelay: '-2.8s' }} />
            <circle className="chx-st" cx={1065} cy={166} r={1.5} style={{ animationDelay: '-2.7s' }} />
            <circle className="chx-st" cx={120} cy={124} r={1.5} style={{ animationDelay: '-3.2s' }} />
            <circle className="chx-st" cx={813} cy={109} r={1.1} style={{ animationDelay: '-1.6s' }} />
            <circle className="chx-st" cx={996} cy={170} r={1.1} style={{ animationDelay: '-0.2s' }} />
            <circle className="chx-st" cx={147} cy={61} r={1.1} style={{ animationDelay: '-0.6s' }} />
          </g>
          <circle cx={1180} cy={150} r={46} fill="url(#chxM)" />
          <g className="chx-fly f1">
            <g transform="translate(0 175) scale(1)">
              <rect x={-300} y={-5} width={300} height={2.4} fill="url(#chxT1)" />
              <rect x={-300} y={-2.6} width={300} height={2.4} fill="url(#chxT2)" />
              <rect x={-300} y={-0.2} width={300} height={2.4} fill="url(#chxT3)" />
              <use href="#chxJ" x={0} y={-10} width={40} height={20} />
            </g>
            <g transform="translate(-34 151) scale(1)">
              <rect x={-300} y={-5} width={300} height={2.4} fill="url(#chxT1)" />
              <rect x={-300} y={-2.6} width={300} height={2.4} fill="url(#chxT2)" />
              <rect x={-300} y={-0.2} width={300} height={2.4} fill="url(#chxT3)" />
              <use href="#chxJ" x={0} y={-10} width={40} height={20} />
            </g>
            <g transform="translate(-34 199) scale(1)">
              <rect x={-300} y={-5} width={300} height={2.4} fill="url(#chxT1)" />
              <rect x={-300} y={-2.6} width={300} height={2.4} fill="url(#chxT2)" />
              <rect x={-300} y={-0.2} width={300} height={2.4} fill="url(#chxT3)" />
              <use href="#chxJ" x={0} y={-10} width={40} height={20} />
            </g>
          </g>
          <g className="chx-fly f2">
            <g transform="translate(0 238) scale(0.6)">
              <rect x={-300} y={-5} width={300} height={2.4} fill="url(#chxT1)" />
              <rect x={-300} y={-2.6} width={300} height={2.4} fill="url(#chxT2)" />
              <rect x={-300} y={-0.2} width={300} height={2.4} fill="url(#chxT3)" />
              <use href="#chxJ" x={0} y={-10} width={40} height={20} />
            </g>
            <g transform="translate(-22 222) scale(0.6)">
              <rect x={-300} y={-5} width={300} height={2.4} fill="url(#chxT1)" />
              <rect x={-300} y={-2.6} width={300} height={2.4} fill="url(#chxT2)" />
              <rect x={-300} y={-0.2} width={300} height={2.4} fill="url(#chxT3)" />
              <use href="#chxJ" x={0} y={-10} width={40} height={20} />
            </g>
            <g transform="translate(-22 254) scale(0.6)">
              <rect x={-300} y={-5} width={300} height={2.4} fill="url(#chxT1)" />
              <rect x={-300} y={-2.6} width={300} height={2.4} fill="url(#chxT2)" />
              <rect x={-300} y={-0.2} width={300} height={2.4} fill="url(#chxT3)" />
              <use href="#chxJ" x={0} y={-10} width={40} height={20} />
            </g>
          </g>
          <path
            d="M0 520 L0 364 Q80 364 80 341 Q240 318 240 331 Q400 345 400 327 Q560 309 560 308 Q720 306 720 348 Q880 390 880 394 Q1040 398 1040 336 Q1200 274 1200 318 Q1360 361 1360 363 L1440 365 L1440 520Z"
            fill="#1a418f"
            opacity=".5"
          />
          <path
            d="M0 520 L0 365 Q65 365 65 358 Q196 351 196 348 Q327 345 327 336 Q458 327 458 339 Q589 351 589 340 Q720 329 720 383 Q851 437 851 410 Q982 384 982 355 Q1113 327 1113 344 Q1244 362 1244 347 Q1375 332 1375 379 L1440 426 L1440 520Z"
            fill="#0e2760"
            opacity=".85"
          />
          <path
            d="M0 520 L0 458 Q51 458 51 461 Q154 464 154 472 Q257 480 257 455 Q360 429 360 459 Q463 490 463 472 Q566 455 566 441 Q669 427 669 456 Q771 484 771 468 Q874 451 874 449 Q977 447 977 467 Q1080 487 1080 475 Q1183 463 1183 452 Q1286 441 1286 450 Q1389 458 1389 449 L1440 439 L1440 520Z"
            fill="#061436"
          />
        </svg>
        {' '}
        <i className="chx-beam b1" />
        <i className="chx-beam b2" />
        <div className="chx-ghost">CHAMPIONS CHAMPIONS</div>
        <div className="chx-sp">
          {sparks.map((s, i) => (
            <span key={i} style={s} />
          ))}
        </div>
      </div>
      <div className="chx-w">
        <p className="chx-eye">Excellence in NDA, TES & NCC Selections</p>
        <h2 className="chx-h">
          Champions
          {' '}
          <span>Who Made Us Proud</span>
        </h2>
        <div className="chx-ul">
          <i />
          <i />
          <i />
          <u />
        </div>
        <div className="chx-s" ref={stageRef} onKeyDown={onKey} onPointerDown={onDown} onPointerLeave={onLeave} onPointerEnter={() => setHover(true)} tabIndex={0} aria-roledescription="carousel">
          <div className={`chx-ring${intro === 'pre' ? ' pre' : ''}${intro === 'intro' ? ' intro' : ''}`}>
            {CHAMPION_PHOTOS.map((src, i) => {
              const d = offset(i);
              const a = Math.abs(d);
              return (
                <div key={src} className={`chx-c${d === 0 ? ' on' : ''}`} ref={i === 0 ? firstCardRef : undefined} style={cardStyle(d, a)} onClick={() => !moved.current && go(i)}>
                  <div className="chx-card">
                    <img alt={`Champion ${i + 1}`} draggable="false" decoding="async" src={a <= 5 || seen.has(i) ? src : undefined} />
                  </div>
                </div>
              );
            })}
          </div>
          <button className="chx-ar l" onClick={() => go(cur - 1)} aria-label="Previous">‹</button>
          {' '}
          <button className="chx-ar r" onClick={() => go(cur + 1)} aria-label="Next">›</button>
        </div>
        <div className="chx-info">
          <div className="chx-cnt">
            {`${String(cur + 1).padStart(2, '0')} / ${n}`}
          </div>
        </div>
        <div className="chx-rail" />
        <p className="chx-hint">Drag · Swipe · Click a champion</p>
      </div>
    </section>
  );
}
