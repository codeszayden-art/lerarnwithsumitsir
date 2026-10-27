import { useMemo, useState } from 'react';


/* Banner background: apni image ka path yahan daalo */
const HERO_IMG = 'https://i.ytimg.com/vi/m1ejiWKvQ8k/maxresdefault.jpg';
const CONTACT_URL = '/contact'; // "Contact Us" button ka link

const DATA = [
  {
    id: 'nda', icon: '🎖️', title: 'NDA Foundation & Integrated Schooling',
    items: [
      ['What makes LWS the top choice for NDA Foundation coaching in India?', 'LWS is recognized as India’s best NDA foundation coaching institute, offering integrated CBSE schooling with rigorous NDA preparation led by retired defence officers and the best subject experts, producing consistent All India Rankers (AIR 1, AIR 2, AIR 3).'],
      ['Who is eligible for the LWS NDA Foundation Programs?', 'Students entering Class 9th can enroll in the 4-year integrated NDA Foundation course while those entering Class 11th can join the 2-year NDA Foundation course, focusing on academics plus defence exam preparation.'],
      ['Which school partners with LWS for NDA Foundation coaching in Haryana?', 'The LWS NDA Foundation coaching in Haryana is conducted in partnership with SD Sr. Secondary School, combining school education and expert NDA training under one roof.'],
      ['Why should students join LWS’s NDA Foundation programs from Class 9th or 11th?', 'Joining early via LWS enables students to build strong academic fundamentals and personality development over years, ensuring board exam excellence and superior defence exam scores.'],
      ['How are LWS NDA Foundation students assessed regularly?', 'Weekly mock tests, doubt-solving sessions, and personalized mentorship ensure continuous academic and exam progress for NDA Foundation students.'],
    ],
  },
  {
    id: 'branch', icon: '📍', title: 'Branch-Specific Courses',
    items: [
      ['What are the top courses offered at the LWS Haryana branch?', 'LWS Haryana offers NDA Foundation (with SD Sr. Secondary School), structured academic + NDA coaching, plus training for NDA, CDS, AFCAT, SSB, RIMC, RMS, and Sainik School entrance exams, along with hostel and personality development.'],
      ['What courses are available at the LWS Delhi branch?', 'The Delhi branch provides premier coaching for NDA, CDS, AFCAT, CAPF, and features the best SSB Interview wing offering full SSB preparation: screening, psychological tests, GTO tasks, interviews, and personality grooming.'],
      ['What training programs does the LWS Pune branch offer?', 'LWS Pune delivers NDA, CDS, AFCAT, SPI, CAPF, and SSB interview coaching, and operates Dr. APJ Innovation School & Junior College offering exclusive NDA Foundation courses fused with CBSE academics and leadership training.'],
    ],
  },
  {
    id: 'ssb', icon: '🧠', title: 'Best SSB Interview Coaching',
    items: [
      ['Why is LWS regarded as India’s leading SSB coaching institute?', 'LWS boasts India’s highest number of SSB recommendations led by expert retired officers like Commander Vikas Yadav, with exclusive GTO ground training ensuring practical, results-driven preparations.'],
      ['What key SSB GTO tasks are practiced at LWS?', 'Aspiring officers train in Progressive Group Task, Command Task, Half Group Task, Group Obstacle Race, and personal interviews, mimicking real SSB scenarios.'],
      ['Does LWS SSB coaching include psychological test preparation?', 'Yes. LWS thoroughly prepares students in TAT, WAT, SRT, PPDT with personalized evaluation and mock interviews fostering confidence and clarity.'],
      ['Who mentors the SSB aspirants at LWS?', 'A team of retired Armed Forces officers, including Commander Vikas Yadav, psychologists, and senior defence mentors guide students through the toughest selection process.'],
      ['What is LWS Junior’s role in defence school exam preparation?', 'LWS Junior provides India’s best coaching for RIMC, RMS, and Sainik School entrance exams with complete syllabus coverage, personality development, and online/offline learning modes.'],
      ['What are the age eligibility criteria for the defence school exams coached by LWS Junior?', 'RIMC admits boys aged 11.5–13 years (Class 8), RMS allows students aged 10–12 for Class 6 and 13–15 for Class 9th, and Sainik School follows similar age brackets for Classes 6th and 9th admissions.'],
      ['Do LWS Junior students receive mock exams and interview training?', 'Yes, LWS Junior offers comprehensive mock tests and interview sessions replicating RIMC, RMS, and Sainik School selection processes to ensure top performance.'],
    ],
  },
  {
    id: 'success', icon: '🏆', title: 'Proven Success & Expert Faculty',
    items: [
      ['What selection results prove LWS as the best defence coaching institute?', 'LWS has produced multiple NDA AIR 1, AIR 2, and AIR 3 toppers, with 90+ NDA recommendations per batch, consistent CDS and AFCAT toppers, and 100+ SSB selections yearly.'],
      ['What leads to LWS’s consistent selection success?', 'A blend of experienced retired defence officers, academic experts, personalized mentoring, and strategic test series create an unmatched training environment.'],
      ['Who are the lead mentors and faculty at LWS?', 'Director Sumit Sir, Commander Vikas Yadav, and a team of ex-servicemen alongside veteran academic faculty ensure comprehensive expert guidance.'],
    ],
  },
  {
    id: 'campus', icon: '🏫', title: 'Campus Life & Facilities',
    items: [
      ['What facilities make LWS’s campus the best choice for defence aspirants?', 'Separate boys and girls hostels with 24×7 security, nutritious food, a clean and hygienic environment, exclusive SSB GTO Ground, sports complexes, gyms, and academic labs create a holistic environment.'],
      ['How is discipline maintained on the LWS campus?', 'The campus enforces military-style discipline: no personal mobile phones, a strict timetable, and strictly adhered decorum and punctuality.'],
      ['What is the daily routine of an LWS student?', 'Students start with morning PT, attend academic and NDA coaching sessions, participate in evening sports and SSB practice, followed by self-study and bedtime at fixed hours, mirroring armed forces discipline.'],
    ],
  },
  {
    id: 'online', icon: '📱', title: 'Online Coaching & LWS App',
    items: [
      ['What are the features of the top-ranked LWS Defence Academy app?', 'The app provides live and recorded classes, mock tests, previous year questions, quizzes, and all-India rank tracking, making LWS’s best coaching accessible on mobile and tablet anytime.'],
      ['Is online coaching at LWS as effective as offline coaching?', 'Yes, the LWS app offers comprehensive syllabus coverage, doubt clearing, and interactive sessions equal to offline classes, enabling students to achieve similar success remotely.'],
    ],
  },
  {
    id: 'fee', icon: '📋', title: 'Fee, Attendance & Policies',
    items: [
      ['What are the fee and refund policies at LWS Defence Academy?', 'Fees must be paid in advance and are non-refundable and non-transferable. Additional charges for hostels or materials, if any, are transparently communicated pre-admission.'],
      ['Is attendance mandatory at LWS for all programs?', '100% attendance and discipline are mandatory, with leaves granted only for emergencies and with prior approval, to maintain a focused academic and training environment.'],
    ],
  },
  {
    id: 'franchise', icon: '🤝', title: 'Franchise & Expansion Opportunities',
    items: [
      ['Where are the main branches of LWS Defence Academy?', 'LWS has major branches in Delhi, Haryana (with SD Sr. Secondary School for NDA foundation), and Pune featuring Dr. APJ Innovation School & Junior College for integrated schooling and defence coaching.'],
      ['How can someone start an LWS franchise?', 'Individuals with a passion for education and mentorship can apply to become LWS franchisees, receiving training, curriculum, branding, and operational support from the parent institute.'],
    ],
  },
  {
    id: 'entries', icon: '🎯', title: 'Specific Defence Entries & Coaching',
    items: [
      ['What courses does LWS offer for NDA (after Class 12)?', 'LWS provides full NDA preparation for Army, Navy, and Air Force, with programs ranging from 1-month crash courses to 4-year foundation courses, covering mathematics, GAT, current affairs, and physical training.'],
      ['How does LWS prepare aspirants for CDS examinations?', 'LWS CDS coaching covers General Knowledge, English, and Mathematics with integrated personality development and mock interview practice led by retired officers.'],
    ],
  },
];

const TOTAL = DATA.reduce((n, g) => n + g.items.length, 0);

export default function FaqPage() {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState('nda-0');

  const query = q.trim().toLowerCase();

  const groups = useMemo(
    () =>
      DATA.map((g, gi) => ({
        ...g,
        items: g.items
          .map((it, i) => ({ q: it[0], a: it[1], key: `${g.id}-${i}` }))
          .filter((it) => !query || `${it.q} ${it.a}`.toLowerCase().includes(query)),
      })).filter((g) => g.items.length && (query || cat === 'all' || cat === g.id)),
    [cat, query],
  );

  const shown = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <main className="faq">
      {/* SHORT BANNER */}
      <header className="faq-hero" style={{ '--hero': `url("${HERO_IMG}")` }}>
        <div className="faq-hero-in">
          <span className="faq-pill">❓ Help Centre</span>
          <h1>Frequently Asked <em>Questions</em></h1>
          <p>Everything about LWS courses, SSB coaching, campus life and admissions.</p>
        </div>
      </header>

      <div className="faq-w">
        {/* SEARCH (overlaps banner) */}
        <div className="faq-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${TOTAL} questions… (e.g. fee, SSB, hostel)`}
            aria-label="Search FAQs"
          />
          {q && <button onClick={() => setQ('')} aria-label="Clear search">✕</button>}
        </div>

        <div className="faq-layout">
          {/* CATEGORIES */}
          <nav className="faq-cats" aria-label="FAQ categories">
            <button className={cat === 'all' && !query ? 'on' : ''} onClick={() => { setCat('all'); setQ(''); }}>
              <span>📚</span> All Questions <em>{TOTAL}</em>
            </button>
            {DATA.map((g) => (
              <button key={g.id} className={cat === g.id && !query ? 'on' : ''} onClick={() => { setCat(g.id); setQ(''); }}>
                <span>{g.icon}</span> {g.title} <em>{g.items.length}</em>
              </button>
            ))}
          </nav>

          {/* QUESTIONS */}
          <section className="faq-main" aria-live="polite">
            {query && <p className="faq-count">{shown} result{shown !== 1 && 's'} for “{q}”</p>}

            {groups.map((g) => (
              <div className="faq-group" key={g.id}>
                <h2><span>{g.icon}</span>{g.title}</h2>
                {g.items.map((it) => {
                  const isOpen = open === it.key;
                  return (
                    <div className={`faq-item${isOpen ? ' open' : ''}`} key={it.key}>
                      <button
                        className="faq-q"
                        aria-expanded={isOpen}
                        aria-controls={`a-${it.key}`}
                        onClick={() => setOpen(isOpen ? '' : it.key)}
                      >
                        <span>{it.q}</span>
                        <i aria-hidden="true" />
                      </button>
                      <div className="faq-a" id={`a-${it.key}`} role="region">
                        <div><p>{it.a}</p></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {!shown && (
              <div className="faq-empty">
                <b>No questions found</b>
                <p>Try a different keyword, or ask us directly below.</p>
              </div>
            )}

            <div className="faq-cta">
              <div>
                <h3>Still have questions?</h3>
                <p>Our counsellors will guide you about courses, batches and admissions.</p>
              </div>
              <a href={CONTACT_URL}>Contact Us →</a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}