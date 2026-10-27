import { useMemo, useState } from 'react';
import RichText from '@/components/common/RichText';
import { useContent } from '@/context/ContentContext';
import { useInView } from '@/hooks/useInView';
import { canHover } from '@/utils/device';
import '@/styles/sections/experts.css';

/** SSB experts: endlessly scrolling marquee of flip cards (tap to flip on touch devices). */
export default function Experts() {
  const { experts } = useContent();
  const [sectionRef, inView] = useInView({ threshold: 0.15 });
  const [flipped, setFlipped] = useState(null);
  const cards = useMemo(() => [...experts, ...experts], [experts]);

  const toggleFlip = (i) => {
    if (!canHover()) setFlipped((cur) => (cur === i ? null : i));
  };
  const onCardKey = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFlipped((cur) => (cur === i ? null : i));
    }
  };

  return (
    <section className={`ssbx ssbx-js${inView ? ' in' : ''}`} id="experts" ref={sectionRef}>
      <div className="wrap">
        <div className="ssbx-head">
          <h2>
            Meet the SSB Interview
            {' '}
            <em>Experts</em>
          </h2>
          <p className="ssbx-stat">Expert mentors for every SSB stage</p>
        </div>
      </div>
      <div className="ssbx-view">
        <div className={`ssbx-track${flipped !== null ? ' hold' : ''}`}>
          {cards.map((e, i) => {
            const clone = i >= experts.length;
            return (
              <article
                key={`${e.id}-${clone ? 'clone' : 'orig'}`}
                className={`ssbx-card${flipped === i ? ' flip' : ''}`}
                style={{ '--i': i % experts.length }}
                tabIndex={clone ? undefined : 0}
                aria-hidden={clone ? true : undefined}
                aria-label={`${e.name}: flip card for details`}
                onClick={() => toggleFlip(i)}
                onKeyDown={(ev) => onCardKey(ev, i)}
              >
                <div className="ssbx-in">
                  <div className="ssbx-f">
                    <img src={e.photo} alt={e.alt} loading="lazy" />
                    <div className="ssbx-cap">
                      <b>{e.name}</b>
                      <span>{e.role}</span>
                    </div>
                  </div>
                  <div className="ssbx-b">
                    <p>
                      <RichText text={e.bio} />
                    </p>
                    <div className="ssbx-cap">
                      <b>{e.name}</b>
                      <span>{e.role}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
