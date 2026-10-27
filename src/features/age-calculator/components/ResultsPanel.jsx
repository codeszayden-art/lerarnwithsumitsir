import { useEffect, useRef } from 'react';
import { SITE } from '@/config/site';
import AgeSummary from './AgeSummary';
import ExamGroup from './ExamGroup';
import { PAGE_CONTENT } from '../data/content';
import { buildResultSummary, buildWhatsappLink } from '../utils/eligibility';

const SCROLL_OFFSET = 120;

function ResultsContent({ result, sectionRef, onReset }) {
  const { lead, birth, age, groups, openKeys } = result;
  const { heading, subheading } = buildResultSummary(lead.name.split(' ')[0], openKeys);
  const whatsappHref = buildWhatsappLink({ number: SITE.whatsapp, lead, birth, age, groups });

  useEffect(() => {
    const timer = setTimeout(() => {
      const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 60);
    return () => clearTimeout(timer);
  }, [sectionRef]);

  return (
    <div className="wrap">
      <div className="a-top">
        <div>
          <h2 id="r-h">{heading}</h2>
          <p id="r-s">{subheading}</p>
        </div>
        <AgeSummary age={age} />
      </div>

      <div className="a-note">
        {PAGE_CONTENT.notes.map((note) => (
          <p key={note.label}>
            <strong>{note.label}</strong>
            {note.text}
          </p>
        ))}
      </div>

      <div id="r-ex">
        {groups.map((group) => (
          <ExamGroup key={group.key} group={group} />
        ))}
      </div>

      <div className="a-act">
        <a className="a-wa" id="r-wa" href={whatsappHref} target="_blank" rel="noopener noreferrer">
          Talk to a mentor on WhatsApp
        </a>
        <button className="a-again" id="again" type="button" onClick={onReset}>
          Check another date of birth
        </button>
      </div>

      <p className="a-fine">{PAGE_CONTENT.disclaimer}</p>
    </div>
  );
}

/** Hidden until a result exists. A new `result.id` remounts it so all animations replay. */
export default function ResultsPanel({ result, onReset }) {
  const sectionRef = useRef(null);

  return (
    <section className="a-res" id="res" ref={sectionRef} hidden={!result} aria-live="polite">
      {result && <ResultsContent key={result.id} result={result} sectionRef={sectionRef} onReset={onReset} />}
    </section>
  );
}
