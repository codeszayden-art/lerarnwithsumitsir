import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { submitEnquiry } from '@/services/enquiryService';
// import '@/styles/pages/enquire.css';

// Online banner photo. If it does not load, the navy gradient shows instead.
const BANNER_IMAGE =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=70';

const PROGRAMS = ['AFCAT', 'NDA Foundation', 'CDS', 'Defence Gurukul'];
const EMPTY = { name: '', mobile: '', email: '', program: '' };

const digits = (v) => v.replace(/\D/g, '').slice(-10);

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[6-9]\d{9}$/.test(digits(v.mobile))) e.mobile = 'Enter a valid 10-digit mobile number.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if (!v.program) e.program = 'Please select a program.';
  return e;
}

export default function Enquire() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    document.title = 'Enquire Now | Learn with Sumit (LWS)';
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
    try {
      await submitEnquiry({
        name: values.name.trim(),
        mobile: digits(values.mobile),
        email: values.email.trim(),
        program: values.program,
        source: 'website-enquire-page',
      });
      setStatus('done');
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const field = (name) => ({
    id: `enq-${name}`,
    name,
    value: values[name],
    onChange,
    'aria-invalid': !!errors[name],
    className: errors[name] ? 'bad' : undefined,
  });

  return (
    <>
      {/* ---------- banner ---------- */}
      <section className="enq-banner" style={{ '--banner-img': `url("${BANNER_IMAGE}")` }}>
        <div className="enq-banner-in">
          <nav className="enq-crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Enquire Now</span>
          </nav>
          <h1>
            Start your journey to the <em>Defence Forces</em>
          </h1>
          <p>Share your details and our counsellors will guide you on courses, batches and eligibility.</p>
        </div>
      </section>

      {/* ---------- form ---------- */}
      <section className="enq-main">
        {status === 'done' ? (
          <div className="enq-card enq-done" role="status">
            <div className="enq-tick">✓</div>
            <h2>Thank you!</h2>
            <p>Our team will call you soon.</p>
            <Link className="enq-btn" to="/">
              Back to home
            </Link>
          </div>
        ) : (
          <form className="enq-card" noValidate onSubmit={onSubmit}>
            <h2>Enquiry Form</h2>
            <p className="enq-sub">Fill in your details and get a free consultation.</p>

            <label htmlFor="enq-name">Full name *</label>
            <input {...field('name')} type="text" placeholder="e.g. Rahul Sharma" autoComplete="name" />
            {errors.name && <small>{errors.name}</small>}

            <label htmlFor="enq-mobile">Mobile number *</label>
            <input {...field('mobile')} type="tel" inputMode="numeric" placeholder="10-digit number" autoComplete="tel" />
            {errors.mobile && <small>{errors.mobile}</small>}

            <label htmlFor="enq-email">Email address *</label>
            <input {...field('email')} type="email" placeholder="you@example.com" autoComplete="email" />
            {errors.email && <small>{errors.email}</small>}

            <label htmlFor="enq-program">Program *</label>
            <select {...field('program')}>
              <option value="">Select a program</option>
              {PROGRAMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {errors.program && <small>{errors.program}</small>}

            {status === 'error' && <div className="enq-alert">{apiError}</div>}

            <button className="enq-btn" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Get Free Consultation →'}
            </button>
          </form>
        )}
      </section>
    </>
  );
}