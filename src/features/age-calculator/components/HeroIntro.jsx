import RadarScanner from './RadarScanner';
import { PAGE_CONTENT } from '../data/content';
import { EXAM_LEGEND } from '../data/radarBlips';

export default function HeroIntro({ scanning, groups }) {
  return (
    <div className="a-copy">
      <h1>{PAGE_CONTENT.headline}</h1>
      <p>{PAGE_CONTENT.intro}</p>
      <div className="a-row">
        <RadarScanner scanning={scanning} groups={groups} />
        <ul className="a-leg">
          {EXAM_LEGEND.map(({ label, text }) => (
            <li key={label}>
              <b>{label}</b>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
