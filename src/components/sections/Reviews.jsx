import { useContent } from '@/context/ContentContext';
import '@/styles/sections/reviews.css';

/** Google reviews strip (colourises on hover). */
export default function Reviews() {
  const { reviews } = useContent();

  return (
    <section className="sec" id="reviews">
      <div className="wrap">
        <h2>Aspirants who trusted LWS</h2>
        <p className="sub">Google reviews from our students. Hover a card to see it in colour.</p>
      </div>
      <div className="team">
        <div className="tr">
          {[...reviews, ...reviews].map((r, i) => (
            <div className="rv" key={`${r.id}-${i}`} aria-hidden={i >= reviews.length ? true : undefined}>
              <div className="av">{r.initials}</div>
              <div className="stars">{'★'.repeat(r.stars)}</div>
              <b>{r.name}</b>
              <small>{r.meta}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
