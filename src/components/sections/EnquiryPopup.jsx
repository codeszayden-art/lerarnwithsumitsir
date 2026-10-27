import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import '@/styles/sections/EnquiryPopup.css';

/**
 * Enquiry popup: site khulne ke thodi der baad apne aap khulta hai (ek session mein ek baar).
 * Kahin se bhi dobara kholne ke liye:  window.dispatchEvent(new Event('lws:open-enquiry'))
 *
 * Props:
 *  delay       - kitni der baad khule (ms), default 1200
 *  storageKey  - sessionStorage key, default 'lws-enquiry-seen'
 *  onSubmit    - async (data) => {}  apna API call yahan do. Error throw karoge to error message dikhega.
 */

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
]

const COURSES = [
  'NDA Foundation', 'NDA 3 Month', 'NDA 6 Month', 'NDA 1 Year', 'SSB', 'CDS', 'AFCAT',
  'Merchant Navy', 'CUET', 'JEE', 'NEET', 'RIMC', 'RMS', 'Sainik School',
]

const PERKS = [
  'Free counselling session',
  'Right course and batch for your goal',
  'SSB and interview preparation guidance',
]

const ICONS = {
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  pin: <><path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 0 0-13 0C5.5 15.4 12 21 12 21z" /><circle cx="12" cy="10" r="2.4" /></>,
  book: <path d="M4 5.5C6.5 4 9.5 4 12 5.5c2.5-1.5 5.5-1.5 8 0V19c-2.5-1.5-5.5-1.5-8 0-2.5-1.5-5.5-1.5-8 0zM12 5.5V19" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
}

function Icon({ name, size = 18, sw = 1.8 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
         strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

function Field({ id, label, icon, error, children }) {
  return (
    <div className={'eq-f' + (error ? ' has-err' : '')}>
      <label htmlFor={id}>{label} <span aria-hidden="true">*</span></label>
      <div className="eq-in">
        <Icon name={icon} />
        {children}
      </div>
      {error && <p className="eq-err" id={id + '-err'} role="alert">{error}</p>}
    </div>
  )
}

const EMPTY = { name: '', phone: '', email: '', state: '', course: '' }

const validate = (d) => {
  const e = {}
  if (d.name.trim().length < 2) e.name = 'Please enter your name'
  if (!/^[6-9]\d{9}$/.test(d.phone)) e.phone = 'Enter a valid 10-digit mobile number'
  if (!/^\S+@\S+\.\S+$/.test(d.email.trim())) e.email = 'Enter a valid email address'
  if (!d.state) e.state = 'Please select your state'
  if (!d.course) e.course = 'Please select a course'
  return e
}

export default function EnquiryPopup({ delay = 1200, storageKey = 'lws-enquiry-seen', onSubmit }) {
  const [open, setOpen] = useState(false)
  const [v, setV] = useState(EMPTY)
  const [err, setErr] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const box = useRef(null)

  const close = () => {
    setOpen(false)
    try { sessionStorage.setItem(storageKey, '1') } catch (e) {}
  }

  // auto open (once per session)
  useEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem(storageKey) === '1' } catch (e) {}
    if (seen) return
    const t = setTimeout(() => setOpen(true), delay)
    return () => clearTimeout(t)
  }, [delay, storageKey])

  // manual open from anywhere
  useEffect(() => {
    const h = () => { setStatus((s) => (s === 'done' ? 'idle' : s)); setOpen(true) }
    window.addEventListener('lws:open-enquiry', h)
    return () => window.removeEventListener('lws:open-enquiry', h)
  }, [])

  // scroll lock, Esc to close, Tab stays inside the popup
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const f = setTimeout(() => box.current && box.current.focus(), 60)
    const onKey = (e) => {
      if (e.key === 'Escape') return close()
      if (e.key !== 'Tab' || !box.current) return
      const els = box.current.querySelectorAll('button:not([disabled]), input, select, a[href]')
      if (!els.length) return
      const first = els[0], last = els[els.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === box.current)) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      clearTimeout(f)
      document.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const change = (e) => {
    const { name } = e.target
    let val = e.target.value
    if (name === 'phone') val = val.replace(/\D/g, '').slice(0, 10)
    setV((p) => ({ ...p, [name]: val }))
    if (err[name]) setErr((p) => ({ ...p, [name]: undefined }))
    if (status === 'error') setStatus('idle')
  }

  const submit = async (ev) => {
    ev.preventDefault()
    if (status === 'sending') return
    const e = validate(v)
    setErr(e)
    const bad = Object.keys(e)[0]
    if (bad) {
      const el = box.current && box.current.querySelector(`[name="${bad}"]`)
      if (el) el.focus()
      return
    }
    setStatus('sending')
    try {
      const data = { ...v, name: v.name.trim(), email: v.email.trim() }
      await (onSubmit ? onSubmit(data) : new Promise((r) => setTimeout(r, 800)))
      setStatus('done')
      setV(EMPTY)
    } catch (e2) {
      setStatus('error')
    }
  }

  if (!open) return null

  const inputProps = (name) => ({
    id: 'eq-' + name,
    name,
    value: v[name],
    onChange: change,
    'aria-invalid': !!err[name],
    'aria-describedby': err[name] ? 'eq-' + name + '-err' : undefined,
  })

  return createPortal(
    <div className="eq-ov" onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}>
      <div className="eq-box" ref={box} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="eq-title">
        <aside className="eq-side">
          <span className="eq-brand">Learn with Sumit</span>
          <p className="eq-hl">Serve The Nation.<span>Shape Your Future.</span></p>
          <p className="eq-lead">Talk to our counsellors about NDA, CDS, AFCAT, SSB and more.</p>
          <ul>
            {PERKS.map((p) => (
              <li key={p}><i><Icon name="check" size={14} sw={2.6} /></i>{p}</li>
            ))}
          </ul>
        </aside>

        <div className="eq-main">
          <button type="button" className="eq-x" aria-label="Close" onClick={close}>
            <Icon name="close" size={18} sw={2.2} />
          </button>

          {status === 'done' ? (
            <div className="eq-done">
              <div className="eq-ok"><Icon name="check" size={34} sw={2.6} /></div>
              <h3 id="eq-title">Thank you!</h3>
              <p>We have received your details. Our team will contact you shortly.</p>
              <button type="button" className="eq-btn" onClick={close}>Close</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3 id="eq-title">Fill this form to get admission</h3>
              <p className="eq-sub">Share your details and our team will get in touch with you.</p>

              <Field id="eq-name" label="Name" icon="user" error={err.name}>
                <input {...inputProps('name')} type="text" placeholder="Enter your name" autoComplete="name" />
              </Field>

              <div className="eq-row">
                <Field id="eq-phone" label="Phone No." icon="phone" error={err.phone}>
                  <input {...inputProps('phone')} type="tel" inputMode="numeric" placeholder="10-digit mobile number" autoComplete="tel-national" />
                </Field>
                <Field id="eq-email" label="Email ID" icon="mail" error={err.email}>
                  <input {...inputProps('email')} type="email" placeholder="Enter your email ID" autoComplete="email" />
                </Field>
              </div>

              <div className="eq-row">
                <Field id="eq-state" label="State" icon="pin" error={err.state}>
                  <select {...inputProps('state')} className={v.state ? '' : 'is-empty'} autoComplete="address-level1">
                    <option value="" disabled>Select a state</option>
                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field id="eq-course" label="Course" icon="book" error={err.course}>
                  <select {...inputProps('course')} className={v.course ? '' : 'is-empty'}>
                    <option value="" disabled>Select a course</option>
                    {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
              </div>

              {status === 'error' && (
                <p className="eq-fail" role="alert">Something went wrong. Please try again, or call us directly.</p>
              )}

              <button type="submit" className="eq-btn" disabled={status === 'sending'}>
                {status === 'sending' ? <><span className="eq-spin" />Sending…</> : 'Submit'}
              </button>
              <p className="eq-note">Your details are used only to contact you about our courses.</p>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
