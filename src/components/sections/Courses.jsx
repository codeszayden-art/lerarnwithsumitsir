import { useRef, useState } from 'react';
import { COURSE_PANELS, COURSE_TABS } from '@/data/courses';
import { useStackedTabs } from '@/hooks/useStackedTabs';
import { usePointerTilt } from '@/hooks/usePointerTilt';
import { useInView } from '@/hooks/useInView';
import '@/styles/sections/courses.css';

const RAIL_STEP = 284;
const label = (g) => g.charAt(0).toUpperCase() + g.slice(1);

function CourseCard({ card, order, revealed }) {
  const tilt = usePointerTilt({ maxX: 10, maxY: 8 });
  return (
    <div
      className={`c${revealed ? ' in' : ''}`}
      id={card.anchorId}
      data-g={card.group}
      style={{ '--i': order }}
      {...tilt}
    >
      <div className="im">
        <div className={`cimg ${card.image}`} style={{ '--pos': card.pos, '--z': card.zoom }} />
        <span className="tg">{label(card.group)}</span>
      </div>
      <span className="ic">{card.icon}</span>
      <div className="tx">
        <b>{card.title}</b>
        {card.text}
        <a className="go" href="#enquire">
          Enquire now <i>→</i>
        </a>
      </div>
    </div>
  );
}

function CoursePanel({ panel, panelRef }) {
  const [filter, setFilter] = useState('all');
  const [viewRef, revealed] = useInView({ threshold: 0.2 });
  const railRef = useRef(null);
  const visible = panel.cards.filter((c) => filter === 'all' || c.group === filter);

  const pick = (g) => {
    setFilter(g);
    if (railRef.current) railRef.current.scrollLeft = 0;
  };
  const setRefs = (node) => {
    panelRef(node);
    viewRef.current = node;
  };

  return (
    <div className="panel" id={panel.id} role="tabpanel" ref={setRefs}>
      <div className="pt">
        <h3>{panel.title}</h3>
        <span className="badge">{panel.badge}</span>
      </div>
      <p className="sub">{panel.subtitle}</p>
      <div className="it fl">
        {['all', ...panel.groups].map((g) => (
          <button key={g} type="button" className={filter === g ? 'on' : undefined} data-g={g} onClick={() => pick(g)}>
            {label(g)}
          </button>
        ))}
      </div>
      <div className="rail" ref={railRef}>
        {visible.map((card, i) => (
          <CourseCard key={`${filter}-${card.title}`} card={card} order={i} revealed={revealed} />
        ))}
      </div>
      <div className="nav2">
        <button type="button" aria-label="Back" onClick={() => railRef.current?.scrollBy({ left: -RAIL_STEP, behavior: 'smooth' })}>
          ‹
        </button>
        <button type="button" aria-label="Forward" onClick={() => railRef.current?.scrollBy({ left: RAIL_STEP, behavior: 'smooth' })}>
          ›
        </button>
      </div>
    </div>
  );
}

/** Sticky stacked course tabs: clicking a tab scrolls to its card, scrolling updates the active tab. */
export default function Courses() {
  const { tabsRef, stackRef, setPanelRef, active, stuck, goTo } = useStackedTabs(COURSE_TABS.length);

  return (
    <div className="tabsec">
      <div className={`tabs${stuck ? ' stuck' : ''}`} id="tb" ref={tabsRef}>
        <div className="wrap" role="tablist">
          {COURSE_TABS.map((tab, i) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              role="tab"
              aria-selected={active === i}
              className={active === i ? 'on' : undefined}
              onClick={(e) => {
                e.preventDefault();
                goTo(i);
              }}
            >
              {tab.label}
            </a>
          ))}
          <a className="btn a" href="#enquire">
            Get Started Now
          </a>
        </div>
      </div>
      <div className="stack" ref={stackRef}>
        <div className="wrap">
          {COURSE_PANELS.map((panel, i) => (
            <CoursePanel key={panel.id} panel={panel} panelRef={setPanelRef(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}
