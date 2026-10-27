import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* true = dono stage ek saath khule reh sakte hain, false = ek khulega to dusra band hoga */
const ALLOW_MULTIPLE = false;

/* ---- Apne project ke routes yahan set kar lo ---- */
const STAGES = [
  {
    id: "stage1",
    label: "Stage 1",
    title: "Stage 1: Screening",
    note: "OIR and PP&DT. Clear this to move to the next stage.",
    color: "k1",
    tests: [
      { key: "oir",  title: "OIR Test", sub: "Officers Intelligence Rating Test",   path: "/mock/oir"  },
      { key: "ppdt", title: "PP&DT",    sub: "Picture Perception & Discussion Test", path: "/mock/ppdt" },
    ],
  },
  {
    id: "stage2",
    label: "Stage 2",
    title: "Stage 2: Psychological Assessment",
    note: "Psychology tests, GTO tasks and the personal interview.",
    color: "k2",
    tests: [
      { key: "wat", title: "WAT",                sub: "Word Association Test",              path: "/mock/wat" },
      { key: "srt", title: "SRT",                sub: "Situation Reaction Test",            path: "/mock/srt" },
      { key: "tat", title: "TAT",                sub: "Thematic Apperception Test",         path: "/mock-tests/tat" },
      { key: "sdt", title: "SDT",                sub: "Self Description Test",              path: "/mock/sdt" },
      { key: "gto", title: "GTO",                sub: "Group Testing Officer Tasks",        path: "/mock/gto" },
      { key: "pi",  title: "Personal Interview", sub: "One-to-one with the Interviewing Officer", path: "/mock/pi" },
    ],
  },
];

const ICONS = {
  oir:  <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /><path d="M8 20.5h8" /></>,
  ppdt: <><path d="M4 5h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-4 3v-3a2 2 0 0 1-1-2V7a2 2 0 0 1 2-2z" /><path d="M19 9h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1v2.5L17 17h-4" /></>,
  wat:  <><path d="M4 5.5C6.5 4 9.5 4 12 5.5c2.5-1.5 5.5-1.5 8 0V19c-2.5-1.5-5.5-1.5-8 0-2.5-1.5-5.5-1.5-8 0z" /><path d="M12 5.5V19" /></>,
  srt:  <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M12.8 8l-3 4.6h3.4l-1.2 3.6" /></>,
  tat:  <><rect x="4" y="4" width="16" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M4.5 17l4.5-4.5 3.5 3.5 2.5-2.5 5 5" /></>,
  sdt:  <><path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 0 0-13 0C5.5 15.4 12 21 12 21z" /><circle cx="12" cy="10" r="2.4" /></>,
  gto:  <><circle cx="8" cy="8.5" r="2.7" /><circle cx="16.5" cy="9.2" r="2.3" /><path d="M3 19c0-3 2.3-5 5-5s5 2 5 5" /><path d="M14 14.4c.8-.3 1.6-.4 2.5-.4 2.4 0 4.5 1.6 4.5 4.6" /></>,
  pi:   <><circle cx="12" cy="7.5" r="3.4" /><path d="M5 20.5c0-3.8 3.1-6.3 7-6.3s7 2.5 7 6.3" /><path d="M12 14.2v3.3" /></>,
};

const Svg = ({ size, sw = 1.7, children }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

export default function MockTests() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(["stage1"]); // Stage 1 by default khula

  const toggle = (id) =>
    setOpen((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      return ALLOW_MULTIPLE ? [...cur, id] : [id];
    });

  return (
    <main className="mt">
      <section className="mt-hero">
        <div className="mt-w">
          <h1>Mock Tests</h1>
          <p>
            Simulate exact exam conditions for Stage-1 (Screening) and Stage-2
            (Psychological Assessment). Timed, realistic, and assessor-curated.
          </p>
          <div className="mt-key">
            <span><i className="k1" />Stage 1: Screening</span>
            <span><i className="k2" />Stage 2: Psychological</span>
          </div>
        </div>
      </section>

      <section className="mt-sec">
        <div className="mt-w mt-acc">
          {STAGES.map((s) => {
            const isOpen = open.includes(s.id);
            return (
              <div className={"mt-item" + (isOpen ? " open" : "")} key={s.id}>
                <button
                  type="button"
                  className="mt-head"
                  id={`${s.id}-btn`}
                  aria-expanded={isOpen}
                  aria-controls={`${s.id}-panel`}
                  onClick={() => toggle(s.id)}
                >
                  <i className={"mt-dot " + s.color} />
                  <span className="mt-htx">
                    <b>{s.title}</b>
                    <small>{s.note}</small>
                  </span>
                  <span className="mt-count">{s.tests.length} tests</span>
                  <span className="mt-chev"><Svg size={20} sw={2.4}><path d="M6 9l6 6 6-6" /></Svg></span>
                </button>

                <div className="mt-panel" id={`${s.id}-panel`} role="region" aria-labelledby={`${s.id}-btn`}>
                  <div className="mt-panel-in">
                    <div className="mt-grid">
                      {s.tests.map((t) => (
                        <article className="mt-card" key={t.key}>
                          <div className="mt-top">
                            <span className="mt-ic"><Svg size={30}>{ICONS[t.key]}</Svg></span>
                            <span className="mt-tag">{s.label}</span>
                          </div>
                          <h3>{t.title}</h3>
                          <p>{t.sub}</p>
                          <button type="button" className="mt-go" onClick={() => navigate(t.path)}>
                            Start Test
                            <Svg size={15} sw={2.4}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
                          </button>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}