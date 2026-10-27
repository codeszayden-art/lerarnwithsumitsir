import { useEffect, useState } from 'react';

/** One exam (NDA / CDS / AFCAT): progress bar and a chip per attempt. */
export default function ExamGroup({ group }) {
  const [filled, setFilled] = useState(false);

  // Two frames so the browser paints width:0 first and the bar animates open.
  useEffect(() => {
    let second;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setFilled(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);

  return (
    <div className="a-ex">
      <div className="a-exh">
        <h3>{group.title}</h3>
        <em>
          {group.openCount} of {group.attempts.length} attempts open
        </em>
      </div>
      <div className="a-bar">
        <i style={filled ? { width: `${group.percent}%` } : undefined} />
      </div>
      <div className="a-chips">
        {group.attempts.map((attempt) => (
          <div
            key={attempt.name}
            className={`a-chip ${attempt.eligible ? 'ok' : 'no'}`}
            style={{ '--i': attempt.index }}
          >
            <strong>{attempt.name}</strong>
            <span>{attempt.label}</span>
            <small>
              Born {attempt.startLabel} to {attempt.endLabel}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
