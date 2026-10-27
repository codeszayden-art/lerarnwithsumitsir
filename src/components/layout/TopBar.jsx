import { Link } from 'react-router-dom';
import { CAMPUSES } from '@/data/site';
import { useRotatingText } from '@/hooks/useRotatingText';

/** Thin strip above the header: rotating campus pill, attempt calculator link and social profiles. */
export default function TopBar() {
  const { value: campus, swapping } = useRotatingText(CAMPUSES, 2500, 300);

  return (
    <div className="top">
      <svg className="topmap" aria-hidden="true" viewBox="0 0 1200 48" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="topdots" width={10} height={10} patternUnits="userSpaceOnUse">
            <circle cx={2} cy={2} r={1.1} fill="#0f1b33" />
          </pattern>
          <linearGradient id="fadeM" x1={0} x2={1}>
            <stop offset={0} stopColor="#fff" stopOpacity={0} />
            <stop offset=".25" stopColor="#fff" />
            <stop offset=".75" stopColor="#fff" />
            <stop offset={1} stopColor="#fff" stopOpacity={0} />
          </linearGradient>
          <mask id="mk">
            <rect width={1200} height={48} fill="url(#fadeM)" />
          </mask>
        </defs>
        <g mask="url(#mk)">
          <rect width={1200} height={48} fill="url(#topdots)" opacity=".13" />
          <g fill="none" stroke="#f4a31b" strokeWidth={1.2} opacity=".55">
            <path d="M330 34 Q430 -10 540 30" />
            <path d="M540 30 Q650 -8 760 26" />
            <path d="M760 26 Q850 -6 930 32" />
          </g>
          <g fill="#f4a31b" opacity=".85">
            <circle cx={330} cy={34} r={3} />
            <circle cx={540} cy={30} r={3} />
            <circle cx={760} cy={26} r={3} />
            <circle cx={930} cy={32} r={3} />
          </g>
        </g>
      </svg>
      <div className="wrap">
        <b>Choose your campus</b>
        <span className={`pill${swapping ? ' sw' : ''}`}>{campus}</span>
        <span className="calc">Calculate your attempt</span>
        <Link className="k" to="/age-calculator">Click Here</Link>
        <span className="socials">
          <a 
            className="so"
            href="https://www.instagram.com/learnwithsumitsir/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
          >
            <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true">
              <rect
                x={3.5}
                y={3.5}
                width={17}s
                height={17}
                rx={5}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              />
              <circle cx={12} cy={12} r={4} fill="none" stroke="currentColor" strokeWidth={2} />
              <circle cx={17.2} cy={6.8} r={1.2} fill="currentColor" />
            </svg>
          </a>
          <a
            className="so"
            href="https://www.facebook.com/learnwithsumitsir"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="Facebook"
          >
            <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true">
              <path
                fill="currentColor"
                d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.6V13h2.7v8z"
              />
            </svg>
          </a>
          <a
            className="so"
            href="https://x.com/LearnWithSumit1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            title="X (Twitter)"
          >
            <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.2 3h3L14.6 10.6 22.5 21h-6.2l-4.8-6.3L6 21H3l7.1-8.1L2.5 3h6.3l4.4 5.8zm-1.1 16.2h1.7L7.9 4.7H6.1z"
              />
            </svg>
          </a>
          <a
            className="so"
            href="https://www.youtube.com/c/LearnwithSumitSir"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            title="YouTube"
          >
            <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true">
              <rect x={2.5} y={5.5} width={19} height={13} rx={4} fill="currentColor" />
              <path d="M10 9.2v5.6l5-2.8z" fill="#fff3da" />
            </svg>
          </a>
          <a
            className="so"
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true">
              <circle cx={5.5} cy={5.5} r={1.9} fill="currentColor" />
              <rect x={3.8} y={9} width={3.4} height={11} fill="currentColor" />
              <path
                fill="currentColor"
                d="M10 9h3.2v1.6c.6-1 1.8-1.9 3.5-1.9 3 0 3.8 1.9 3.8 4.6V20h-3.4v-6c0-1.4-.3-2.4-1.7-2.4S13.4 12.6 13.4 14v6H10z"
              />
            </svg>
          </a>
        </span>
      </div>
    </div>
  );
}
