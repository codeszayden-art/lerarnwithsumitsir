import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { submitEnquiry } from '@/services/enquiryService';
// import '@/styles/pages/ndaFoundation.css';

/* ---------------- NDA themed banner ---------------- */
const BANNER =
  'https://learnwithsumit.in/wp-content/uploads/2025/12/Lws-Foundation-Team-1.webp';

/* ---------------- simple, clean inline icons ---------------- */
const IcoBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z" />
    <path d="M20 4h-3a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h4z" />
  </svg>
);
const IcoTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);
const IcoShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
const IcoUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
  </svg>
);
const IcoHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z" />
  </svg>
);
const IcoRun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="13" cy="4" r="2" />
    <path d="M4 20l5-5 3 3 4-4 4 6" />
    <path d="M9 9l4 2 3-3" />
  </svg>
);
const IcoDoc = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 3h9l4 4v14H6z" />
    <path d="M15 3v4h4M8 13h8M8 17h8M8 9h4" />
  </svg>
);
const IcoCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12l4 4 5-10" />
    <path d="M14 12l3 3 5-9" />
  </svg>
);
const IcoMed = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v18M3 12h18" />
  </svg>
);

/* ---------------- static content ---------------- */
const PROGRAMS = [
  {
    tag: 'After 8th',
    title: '4-Year Integrated Program',
    desc: 'A complete program combining school education (Class 9–12) with NDA written exam preparation and early-stage SSB training to build strong academic foundations and Officer-Like Qualities.',
    link: 'https://learnwithsumit.in/nda-foundation-4-year/',
    Icon: IcoBook,
  },
  {
    tag: 'After 10th',
    title: '2-Year Foundation Course',
    desc: 'An intensive program for Class 11–12 schooling integrated with focused NDA written exam coaching and structured SSB preparation, ensuring board success alongside defence readiness.',
    link: 'https://learnwithsumit.in/nda-foundation-2-year/',
    Icon: IcoTarget,
  },
  {
    tag: 'SSB Training',
    title: 'SSB Interview Coaching',
    desc: 'Specialised SSB interview preparation conducted by experienced assessors, covering psychology tests, GTO tasks, personal interviews, and leadership development through mock assessments.',
    link: 'https://learnwithsumit.in/ssb-interview/',
    Icon: IcoShield,
  },
];

const FEATURES = [
  {
    title: 'Expert Ex Army Faculty',
    desc: 'Learn from retired defence officers and subject matter experts with decades of experience.',
    Icon: IcoUser,
  },
  {
    title: 'Residential Campus',
    desc: 'Fully residential program with disciplined environment similar to defence academies, separated for Girls and Boys.',
    Icon: IcoHome,
  },
  {
    title: 'Physical Training',
    desc: 'Regular fitness sessions and outdoor activities to build stamina and endurance.',
    Icon: IcoRun,
  },
  {
    title: 'Study Material',
    desc: 'Comprehensive study material updated regularly as per latest exam patterns.',
    Icon: IcoDoc,
  },
  {
    title: 'Mock Tests',
    desc: 'Weekly mock tests and performance analysis to track progress effectively.',
    Icon: IcoCheck,
  },
  {
    title: 'Medical Support',
    desc: 'Regular fitness sessions and outdoor activities to build stamina and endurance.',
    Icon: IcoMed,
  },
];

const FAQS = [
  {
    q: 'What is the NDA Foundation course at LWS?',
    a: (
      <p>
        The NDA Foundation course at LWS is a long-term integrated program that
        combines school education + NDA written exam preparation + early SSB
        orientation, starting from Class 9 or Class 11.
      </p>
    ),
  },
  {
    q: 'Which NDA Foundation courses does LWS offer?',
    a: (
      <>
        <p>
          LWS offers <b>four NDA Foundation pathways</b>, mainly including:
        </p>
        <ul>
          <li>
            <b>4-Year NDA Foundation (After Class 8)</b> – Class 9 to 12
          </li>
          <li>
            <b>2-Year NDA Foundation (After Class 10)</b> – Class 11 &amp; 12
            (Designed for early starters and serious NDA aspirants)
          </li>
        </ul>
      </>
    ),
  },
  {
    q: 'What is the 4-Year NDA Foundation course after Class 8?',
    a: (
      <p>
        The <b>4-Year NDA Foundation (After 8th)</b> covers{' '}
        <b>Class 9–12 schooling</b> with continuous{' '}
        <b>NDA + SSB foundation training</b>, ideal for students aiming for{' '}
        <b>early discipline, academics, and officer-like qualities</b>.
      </p>
    ),
  },
  {
    q: 'Who should join the NDA Foundation after Class 8?',
    a: (
      <>
        <p>Students who:</p>
        <ul>
          <li>
            Are in <b>Class 8 or just passed Class 8</b>
          </li>
          <li>
            Dream of <b>NDA after Class 12</b>
          </li>
          <li>
            Want <b>early preparation, discipline, and personality development</b>
          </li>
        </ul>
      </>
    ),
  },
  {
    q: 'What is the 2-Year NDA Foundation course after Class 10?',
    a: (
      <p>
        The <b>2-Year NDA Foundation (After 10th)</b> integrates{' '}
        <b>Class 11 &amp; 12 schooling</b> with focused{' '}
        <b>NDA written exam preparation and SSB basics</b>, ensuring{' '}
        <b>board success + NDA readiness</b>.
      </p>
    ),
  },
  {
    q: 'Who is eligible for the 2-Year NDA Foundation course?',
    a: (
      <>
        <p>Students who:</p>
        <ul>
          <li>
            Have <b>passed Class 10</b>
          </li>
          <li>
            Are entering <b>Class 11</b>
          </li>
          <li>
            Want <b>serious NDA preparation alongside board exams</b>
          </li>
        </ul>
      </>
    ),
  },
  {
    q: 'Does LWS provide school education with NDA coaching?',
    a: (
      <p>
        Yes, LWS offers <b>integrated schooling (CBSE-aligned)</b> along with{' '}
        <b>NDA written preparation, SSB orientation, discipline training, and
        personality development</b>.
      </p>
    ),
  },
  {
    q: 'Is SSB preparation included in NDA Foundation courses?',
    a: (
      <>
        <p>Yes, Basic SSB orientation is included, focusing on:</p>
        <ul>
          <li>Officer-Like Qualities (OLQs)</li>
          <li>Confidence, leadership, communication</li>
          <li>Early exposure to psychology &amp; GTO concepts</li>
        </ul>
      </>
    ),
  },
  {
    q: 'Are NDA Foundation courses suitable for boys and girls?',
    a: (
      <p>
        Absolutely, <b>Both boys and girls</b> can join LWS NDA Foundation
        courses, fully aligned with <b>latest NDA eligibility rules</b>.
      </p>
    ),
  },
  {
    q: 'Why choose LWS for NDA Foundation preparation?',
    a: (
      <>
        <p>LWS stands out for:</p>
        <ul>
          <li>
            <b>Early-start NDA preparation</b>
          </li>
          <li>
            <b>Integrated schooling + coaching</b>
          </li>
          <li>
            <b>Discipline-oriented environment</b>
          </li>
          <li>
            <b>Experienced defence faculty</b>
          </li>
          <li>
            <b>Proven track record in NDA &amp; SSB training</b>
          </li>
        </ul>
      </>
    ),
  },
];

/* ---------------- gallery data ---------------- */
const GALLERY_1 = [
  '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16',
].map((n) => `https://learnwithsumit.in/wp-content/uploads/2026/03/${n}.webp`);

const GALLERY_2 = [
  '17','18','19','20','21','22','23','24','25','26','27','28','29','30',
  '31','32','33','34','35','36',
].map((n) => `https://learnwithsumit.in/wp-content/uploads/2026/03/${n}.webp`);

const GALLERY_3 = [
  '37','38','39','41','42','43','44','46','47','48','49','50','51','52',
  '53','54','55','56','57','58','59','60','61','62','63','64','65','66',
  '67','68','69','70','71','73',
].map((n) => `https://learnwithsumit.in/wp-content/uploads/2026/03/${n}.webp`);

/* ---------------- marquee component ---------------- */
function Marquee({ images, reverse = false }) {
  return (
    <div className="ndf-marquee-wrap">
      <div className={`ndf-marquee${reverse ? ' rev' : ''}`}>
        {[...images, ...images].map((src, i) => (
          <figure className="ndf-slide" key={i}>
            <img src={src} alt={`LWS campus ${i}`} loading="lazy" />
          </figure>
        ))}
      </div>
    </div>
  );
}

/* ---------------- form helpers ---------------- */
const PROGRAMS_LIST = [
  '4-Year Integrated Program',
  '2-Year Foundation Course',
  'SSB Interview Coaching',
];
const EMPTY_FORM = { name: '', mobile: '', email: '', program: '' };
const digits = (v) => v.replace(/\D/g, '').slice(-10);

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[6-9]\d{9}$/.test(digits(v.mobile)))
    e.mobile = 'Enter a valid 10-digit mobile number.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = 'Enter a valid email address.';
  if (!v.program) e.program = 'Please select a program.';
  return e;
}

/* ================================================================
   PAGE
   ================================================================ */
export default function NdaFoundation() {
  const [openFaq, setOpenFaq] = useState(0);
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    document.title = 'NDA Foundation | Learn with Sumit (LWS)';
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    setApiError('');
    try {
      await submitEnquiry({
        name: values.name.trim(),
        mobile: digits(values.mobile),
        email: values.email.trim(),
        program: values.program,
        source: 'nda-foundation-page',
      });
      setStatus('done');
      setValues(EMPTY_FORM);
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <main className="ndf">
      {/* -------- HERO / BANNER -------- */}
      <section
        className="ndf-hero"
        style={{ '--ndf-banner': `url("${BANNER}")` }}
      >
        <div className="ndf-w">
          <span className="ndf-badge">India&apos;s Premier Defence Coaching</span>
          <h1>NDA Foundation</h1>
          <p>
            Transform your dreams into reality with our comprehensive NDA
            Foundation programs. Integrated schooling with professional defence
            coaching for aspiring officers.
          </p>
        </div>
      </section>

      {/* -------- PROGRAMS -------- */}
      <section className="ndf-sec">
        <div className="ndf-w">
          <div className="ndf-sec-head">
            <div className="ndf-line" />
            <h2>
              Our NDA Foundation <em>Programs</em>
            </h2>
            <p>Designed to build future officers from the ground up</p>
          </div>

          <div className="ndf-programs">
            {PROGRAMS.map(({ tag, title, desc, link, Icon }) => (
              <article className="ndf-pcard" key={title}>
                <span className="ndf-ptag">{tag}</span>
                <div className="ndf-picon">
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <a
                  className="ndf-plink"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -------- WHY LWS -------- */}
      <section className="ndf-sec ndf-why">
        <div className="ndf-w">
          <div className="ndf-sec-head">
            <div className="ndf-line" />
            <h2>
              Why <em>LWS</em> Stands Out
            </h2>
            <p>Designed to build future officers from the ground up</p>
          </div>

          <div className="ndf-features">
            {FEATURES.map(({ title, desc, Icon }) => (
              <div className="ndf-feat" key={title}>
                <div className="ndf-fic">
                  <Icon />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------- GALLERY (3-row marquee) -------- */}
      <section className="ndf-gallery">
        <div className="ndf-w">
          <div className="ndf-sec-head">
            <div className="ndf-line" />
            <h2>
              Life at <em>LWS</em>
            </h2>
            <p>Glimpses of our campus and training sessions</p>
          </div>
        </div>

        <Marquee images={GALLERY_1} />
        <Marquee images={GALLERY_2} reverse />
        <Marquee images={GALLERY_3} />
      </section>

      {/* -------- FAQ -------- */}
      <section className="ndf-sec ndf-faq">
        <div className="ndf-w">
          <div className="ndf-sec-head">
            <div className="ndf-line" />
            <h2>
              Frequently Asked Questions <em>(FAQs)</em>
            </h2>
          </div>

          <div className="ndf-faq-list">
            {FAQS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  className={`ndf-faq-item${isOpen ? ' open' : ''}`}
                  key={i}
                >
                  <button
                    className="ndf-faq-q"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <span className="ndf-faq-ic" aria-hidden="true">
                      +
                    </span>
                  </button>
                  <div className="ndf-faq-a">
                    <div className="ndf-faq-a-in">{item.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------- CTA + FORM -------- */}
      <section className="ndf-cta">
        <div className="ndf-w ndf-cta-in">
          <div className="ndf-cta-tx">
            <h2>
              Start Your <em>Defence Career</em> Journey
            </h2>
            <p>
              Get personalized guidance and take the first step towards becoming
              an officer in the Indian Armed Forces.
            </p>
          </div>

          <form className="ndf-form" onSubmit={onSubmit} noValidate>
            <h3>Get Free Consultation</h3>

            <input
              name="name"
              value={values.name}
              onChange={onChange}
              placeholder="Your Name"
              autoComplete="name"
            />
            {errors.name && <p className="ndf-msg err">{errors.name}</p>}

            <input
              name="mobile"
              value={values.mobile}
              onChange={onChange}
              placeholder="Mobile Number"
              inputMode="numeric"
              autoComplete="tel"
            />
            {errors.mobile && <p className="ndf-msg err">{errors.mobile}</p>}

            <input
              name="email"
              type="email"
              value={values.email}
              onChange={onChange}
              placeholder="Email"
              autoComplete="email"
            />
            {errors.email && <p className="ndf-msg err">{errors.email}</p>}

            <select name="program" value={values.program} onChange={onChange}>
              <option value="">Select A Program</option>
              {PROGRAMS_LIST.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {errors.program && (
              <p className="ndf-msg err">{errors.program}</p>
            )}

            {status === 'error' && (
              <p className="ndf-msg err">{apiError}</p>
            )}
            {status === 'done' && (
              <p className="ndf-msg">
                Thank you! Our team will call you soon.
              </p>
            )}

            <button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Get Free Consultation'}
            </button>
          </form>
        </div>
      </section>

      <div className="ndf-back ndf-w">
        <Link to="/">← Back to home</Link>
      </div>
    </main>
  );
}