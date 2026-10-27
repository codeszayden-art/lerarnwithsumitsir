import { RADAR_BLIPS } from '../../features/age-calculator/data/radarBlips';

function blipView(group) {
  if (!group) return { className: '', caption: 'scanning' };
  return group.openCount
    ? { className: ' ok', caption: `${group.openCount} Eligible` }
    : { className: ' no', caption: 'not Eligible' };
}

/** Decorative radar. Shows "scanning" while checking and open/not-open once a result exists. */
export default function RadarScanner({ scanning, groups }) {
  return (
    <div className={`a-radar${scanning ? ' scan' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 400 400">
        <circle className="rg" cx="200" cy="200" r="196" />
        <circle className="rg d" cx="200" cy="200" r="140" />
        <circle className="rg d" cx="200" cy="200" r="84" />
        <circle className="rg" cx="200" cy="200" r="28" />
        <path className="rg" d="M200 4V396M4 200H396" />
      </svg>
      <div className="a-sweep" />
      {RADAR_BLIPS.map(({ key, label, left, top }) => {
        const { className, caption } = blipView(groups?.find((g) => g.key === key));
        return (
          <div key={key} className={`a-blip${className}`} data-k={key} style={{ left, top }}>
            <b />
            <div>
              {label}
              <small>{caption}</small>
            </div>
          </div>
        );
      })}
    </div>
  );
}
