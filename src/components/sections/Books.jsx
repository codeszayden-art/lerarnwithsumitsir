import { useEffect, useRef, useState } from 'react';
import { SSB_STAGES } from '@/data/books';
import { useInView } from '@/hooks/useInView';
import { usePointerVars } from '@/hooks/usePointerVars';
import '@/styles/sections/books.css';
import imgBookHandbookGat from '@/assets/images/books/book-handbook-gat.jpg';
import imgBookHandbookMathematics from '@/assets/images/books/book-handbook-mathematics.jpg';
import imgBookSsbInterview from '@/assets/images/books/book-ssb-interview.jpg';

/** SSB books promo: pointer-parallax card and an animated TAT -> Interview stage tracker. */
export default function Books() {
  const [sectionRef, inView] = useInView({ threshold: 0.2 });
  const cardRef = useRef(null);
  const [step, setStep] = useState(0);
  usePointerVars(cardRef, { factor: 2 });

  useEffect(() => {
    if (!inView) return undefined;
    const id = setInterval(() => setStep((s) => (s + 1) % (SSB_STAGES.length + 3)), 1000);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section className={`sbk${inView ? ' in' : ''}`} id="books" aria-label="SSB interview books" ref={sectionRef}>
      <div className="sbk-w">
        <p className="sbk-eye">From Practice to Selection</p>
        <h2 className="sbk-h">
          Master Every Step of the
          {' '}
          <span>SSB Interview</span>
        </h2>
        <div className="sbk-ul">
          <i />
          <i />
          <i />
          <u />
        </div>
        <div className="sbk-card" ref={cardRef}>
          <div className="sbk-fx" />
          <div className="sbk-txt">
            <span className="sbk-chip">Interview & Previous Year Questions Books</span>
            <h3>
              Best
              {' '}
              <em>Defence</em>
              {' '}
              Exam Books
            </h3>
            <p>Expert-designed books for NDA, Sainik School & RMS aspirants by LWS.</p>
            <a className="sbk-btn" href="#">
              View all books
              {' '}
              <b>→</b>
            </a>
          </div>
          <div className="sbk-stage">
            <i className="sbk-ring r1" />
            <i className="sbk-ring r2" />
            <i className="sbk-glow" />
            <div className="sbk-books">
              <img className="bk b1" alt="SSB Interview: The Practical Approach" src={imgBookSsbInterview} />
              {' '}
              <img className="bk b2" alt="Handbook of GAT" src={imgBookHandbookGat} />
              {' '}
              <img className="bk b3" alt="Handbook of Mathematics" src={imgBookHandbookMathematics} />
              {' '}
              <i className="sbk-floor" />
            </div>
            <span className="sbk-tag t1">
              <i>★</i>
              Latest Edition
            </span>
            {' '}
            <span className="sbk-tag t2">
              <i>✓</i>
              Previous Year Qs
            </span>
          </div>
        </div>
        <ul className="sbk-steps" aria-label="SSB stages">
          {SSB_STAGES.map((stage, i) => (
            <li key={stage} className={[i < step ? 'on' : '', i < step - 1 ? 'pass' : ''].filter(Boolean).join(' ') || undefined}>
              <span>{i + 1}</span>
              {stage}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
