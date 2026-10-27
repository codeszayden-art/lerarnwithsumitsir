import { useInView } from '@/hooks/useInView';
import { useShiftingTrack } from '@/hooks/useShiftingTrack';
import { useContent } from '@/context/ContentContext';
import '@/styles/sections/rankers.css';

/** "Top rankers" strip: entrance animation plus an auto-scrolling, endlessly looping track. */
export default function Rankers() {
  const { rankers } = useContent();
  const [sectionRef, inView] = useInView({ threshold: 0.2 });
  const { order, trackRef, trackStyle, pause, resume } = useShiftingTrack(rankers, {
    interval: 2200,
    duration: 600,
    gap: 4,
  });

  return (
    <section
      className={`rankers${inView ? ' in' : ''}`}
      id="rankers"
      aria-label="Top rankers"
      ref={sectionRef}
    >
      <div className="wrap">
        <div className="rk-eyebrow">
          <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"
            />
          </svg>
          <span>OUR PRIDE</span>
          <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"
            />
          </svg>
        </div>
        <h2 className="rk-h">
          <span className="hl">Top</span>
          {' '}
          Rankers in NDA 156
          {' '}
          <em>(NDA 2 2025)</em>
        </h2>
        <p className="rk-sub">Congratulations to our brilliant achievers</p>
        <div className="rk-line">
          <i />
          <u />
          <i />
        </div>
        <div className="rk-view">
          <div className="rk-track" ref={trackRef} style={trackStyle} onMouseEnter={pause} onMouseLeave={resume}>
            {order.map((r) => (
              <div className="rk" key={r.id}>
                <span className="rk-t">{r.exam}</span>
                <div className="rk-b">
                  <div className="rk-p">
                    <svg viewBox="0 0 64 64" aria-hidden="true">
                      <rect width={64} height={64} fill="#dfe5f1" />
                      <circle cx={32} cy={24} r={11} fill="#9aa7c2" />
                      <path d="M10 64c2-16 12-22 22-22s20 6 22 22z" fill="#9aa7c2" />
                    </svg>
                  </div>
                  <div className="rk-r">
                    <small>RANK</small>
                    <b>{r.rank}</b>
                  </div>
                </div>
                <div className="rk-n">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
