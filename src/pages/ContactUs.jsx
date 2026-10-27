import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { submitEnquiry } from '@/services/enquiryService';
// import '@/styles/pages/contact.css';

/* Banner background (army/defence themed) */
const BANNER =
  'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=1800&q=70';

/* ---------- Icons ---------- */
const IcoPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IcoMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IcoMap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IcoClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/* ---------- Form Logic ---------- */
const EMPTY = { name: '', email: '', mobile: '', subject: '', message: '' };
const digits = (v) => v.replace(/\D/g, '').slice(-10);

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email.';
  if (!/^[6-9]\d{9}$/.test(digits(v.mobile))) e.mobile = 'Enter a valid 10-digit mobile number.';
  if (v.subject.trim().length < 3) e.subject = 'Please enter a subject.';
  if (v.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
  return e;
}

export default function ContactUs() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    document.title = 'Contact Us | Learn with Sumit (LWS)';
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
        program: values.subject, // mapping subject to program
        message: values.message,
        source: 'contact-us-page',
      });
      setStatus('done');
      setValues(EMPTY);
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <main className="ct">
      {/* -------- HERO -------- */}
      <section className="ct-hero" style={{ '--ct-banner': `url("${BANNER}")` }}>
        <div className="ct-w">
          <h1>Get in <em>Touch</em></h1>
          <p>Have a question about our courses or want to visit our campus? We're here to help you on your journey to the defence forces.</p>
        </div>
      </section>

      {/* -------- MAIN CONTENT -------- */}
      <section className="ct-main">
        <div className="ct-w">
          <div className="ct-grid">
            
            {/* LEFT: Info Card */}
            <div className="ct-card ct-info">
              <h2>Contact Information</h2>
              <p>Reach out to us via phone, email, or visit our campus directly.</p>

              <div className="ct-item">
                <div className="ct-item-ic"><IcoPhone /></div>
                <div className="ct-item-body">
                  <h3>Call Us</h3>
                  <p>+91 98765 43210<br />+91 12345 67890</p>
                </div>
              </div>

              <div className="ct-item">
                <div className="ct-item-ic"><IcoMail /></div>
                <div className="ct-item-body">
                  <h3>Email Us</h3>
                  <p><a href="mailto:info@learnwithsumit.in">info@learnwithsumit.in</a></p>
                </div>
              </div>

              <div className="ct-item">
                <div className="ct-item-ic"><IcoMap /></div>
                <div className="ct-item-body">
                  <h3>Campus Address</h3>
                  <p>LWS Defence Academy,<br />Main Road, Sector 14,<br />New Delhi - 110001</p>
                </div>
              </div>

              <div className="ct-item">
                <div className="ct-item-ic"><IcoClock /></div>
                <div className="ct-item-body">
                  <h3>Office Hours</h3>
                  <p>Mon - Sat: 9:00 AM - 6:00 PM<br />Sunday: Closed</p>
                </div>
              </div>

              {/* Google Map Placeholder */}
              <div className="ct-map">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112077.26387993529!2d77.12438263597337!3d28.571744538944382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce38039b31a7d%3A0x6b9e9b8b1b1b1b1b!2sNew%20Delhi!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  title="Campus Location"
                ></iframe>
              </div>
            </div>

            {/* RIGHT: Form Card */}
            <div className="ct-card ct-form">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and our team will get back to you shortly.</p>

              <form onSubmit={onSubmit} noValidate>
                <div className="ct-fields">
                  <div className="ct-row">
                    <div className="ct-input-w">
                      <label htmlFor="name">Full Name</label>
                      <input id="name" name="name" value={values.name} onChange={onChange} placeholder="John Doe" />
                      {errors.name && <small>{errors.name}</small>}
                    </div>
                    <div className="ct-input-w">
                      <label htmlFor="mobile">Mobile Number</label>
                      <input id="mobile" name="mobile" value={values.mobile} onChange={onChange} placeholder="10-digit number" inputMode="numeric" />
                      {errors.mobile && <small>{errors.mobile}</small>}
                    </div>
                  </div>

                  <div className="ct-row">
                    <div className="ct-input-w">
                      <label htmlFor="email">Email Address</label>
                      <input id="email" type="email" name="email" value={values.email} onChange={onChange} placeholder="john@example.com" />
                      {errors.email && <small>{errors.email}</small>}
                    </div>
                    <div className="ct-input-w">
                      <label htmlFor="subject">Subject</label>
                      <input id="subject" name="subject" value={values.subject} onChange={onChange} placeholder="e.g. NDA Foundation" />
                      {errors.subject && <small>{errors.subject}</small>}
                    </div>
                  </div>

                  <div className="ct-input-w">
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" name="message" value={values.message} onChange={onChange} placeholder="How can we help you?" />
                    {errors.message && <small>{errors.message}</small>}
                  </div>

                  <button className="ct-submit" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>

                  {status === 'error' && <div className="ct-alert err">{apiError}</div>}
                  {status === 'done' && (
                    <div className="ct-alert ok">
                      ✓ Thank you! Your message has been sent successfully.
                    </div>
                  )}
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      <div style={{ textAlign: 'center', paddingBottom: '40px' }}>
        <Link to="/" style={{ color: '#0b2a5e', fontWeight: 700, textDecoration: 'none' }}>
          ← Back to home
        </Link>
      </div>
    </main>
  );
}