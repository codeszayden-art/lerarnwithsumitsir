import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// import './EnquiryNow.css'

/**
 * Route:  <Route path='/enquiry' element={<EnquiryNow />} />
 * Data bhejne ke liye:  <EnquiryNow onSubmit={async (formData) => { ... }} />
 */
const POSITIONS = [
  'Faculty – NDA / CDS / AFCAT',
  'SSB Interview Trainer',
  'Student Counsellor',
  'Content Writer',
  'Digital Marketing',
  'Front Office / Admin',
  'Other',
]
const QUALS = ['12th Pass', 'Graduate', 'Post Graduate', 'PhD', 'Diploma / Other']
const EXPS = ['Fresher', 'Less than 1 year', '1 – 3 years', '3 – 5 years', '5+ years']
const MAX_MB = 5

const EMPTY = { name: '', phone: '', email: '', city: '', position: '', qual: '', exp: '', msg: '', agree: false }

const validate = (d, file) => {
  const e = {}
  if (d.name.trim().length < 2) e.name = 'Please enter your full name'
  if (!/^[6-9]\d{9}$/.test(d.phone)) e.phone = 'Enter a valid 10-digit mobile number'
  if (!/^\S+@\S+\.\S+$/.test(d.email.trim())) e.email = 'Enter a valid email address'
  if (d.city.trim().length < 2) e.city = 'Please enter your city'
  if (!d.position) e.position = 'Please select a position'
  if (!d.qual) e.qual = 'Please select your qualification'
  if (!d.exp) e.exp = 'Please select your experience'
  if (!file) e.file = 'Please upload your resume'
  if (!d.agree) e.agree = 'Please accept to continue'
  return e
}

const size = (f) => (f.size > 1048576 ? (f.size / 1048576).toFixed(2) + ' MB' : Math.max(1, Math.round(f.size / 1024)) + ' KB')

function Field({ id, label, error, children }) {
  return (
    <div className={'lwa-f' + (error ? ' has-err' : '')}>
      <label htmlFor={id}>{label} <span aria-hidden="true">*</span></label>
      {children}
      {error && <p className="lwa-err" id={id + '-err'} role="alert">{error}</p>}
    </div>
  )
}

function Step({ n, title, text }) {
  return (
    <div className="lwa-step">
      <b>{n}</b>
      <div><h2>{title}</h2><p>{text}</p></div>
    </div>
  )
}

export default function EnquiryNow({ onSubmit }) {
  const [v, setV] = useState(EMPTY)
  const [file, setFile] = useState(null)
  const [err, setErr] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [drag, setDrag] = useState(false)
  const fileRef = useRef(null)
  const formRef = useRef(null)

  const change = (e) => {
    const { name, type, checked } = e.target
    let val = type === 'checkbox' ? checked : e.target.value
    if (name === 'phone') val = val.replace(/\D/g, '').slice(0, 10)
    setV((p) => ({ ...p, [name]: val }))
    if (err[name]) setErr((p) => ({ ...p, [name]: undefined }))
    if (status === 'error') setStatus('idle')
  }

  const pickFile = (f) => {
    if (!f) return
    if (!/\.(pdf|doc|docx)$/i.test(f.name)) return setErr((p) => ({ ...p, file: 'Only PDF, DOC or DOCX files are allowed' }))
    if (f.size > MAX_MB * 1048576) return setErr((p) => ({ ...p, file: `File is too large. Maximum size is ${MAX_MB} MB` }))
    setFile(f)
    setErr((p) => ({ ...p, file: undefined }))
  }

  const submit = async (ev) => {
    ev.preventDefault()
    if (status === 'sending') return
    const e = validate(v, file)
    setErr(e)
    const bad = Object.keys(e)[0]
    if (bad) {
      const el = formRef.current && formRef.current.querySelector(`[name="${bad}"]`)
      if (el) el.focus()
      return
    }
    setStatus('sending')
    try {
      const fd = new FormData()
      Object.entries(v).forEach(([k, val]) => fd.append(k, typeof val === 'string' ? val.trim() : val))
      fd.append('resume', file)
      await (onSubmit ? onSubmit(fd) : new Promise((r) => setTimeout(r, 900)))
      setStatus('done')
      setV(EMPTY)
      setFile(null)
    } catch (e2) {
      setStatus('error')
    }
  }

  const ip = (name) => ({
    id: 'lwa-' + name,
    name,
    value: v[name],
    onChange: change,
    'aria-invalid': !!err[name],
    'aria-describedby': err[name] ? 'lwa-' + name + '-err' : undefined,
  })

  return (
    <main className="lwa">
      <section className="lwa-hero">
        <div className="lwa-w">
          <div className="lwa-crumb"><Link to="/">Home</Link> › Carrer</div>
          <span className="lwa-chip">Careers at LWS</span>
          <h1>Carrer</h1>
          <p>Want to be part of the LWS team? Fill in the form below and send us your details and resume.</p>
        </div>
      </section>

      <section className="lwa-w lwa-body">
        <aside className="lwa-side">
          <h2>Get in touch</h2>
          <p>Have a question before you apply? Reach us directly.</p>
          <ul>
            <li>
              <small>Email</small>
              <a href="mailto:learnwithsumitsir@gmail.com">learnwithsumitsir@gmail.com</a>
            </li>
            <li>
              <small>Call</small>
              <a href="tel:+919211637514">92116 37514</a>
            </li>
            <li>
              <small>Office</small>
              <span>12/6/1, Block C, Near Mahila Park, Mohit Nagar, Vikaspuri, Dwarka Sec 15, New Delhi 110059</span>
            </li>
          </ul>
          <div className="lwa-tips">
            <h3>Before you apply</h3>
            <ul>
              <li>Keep your resume in PDF format.</li>
              <li>Select the position you are applying for.</li>
              <li>File size should be under {MAX_MB} MB.</li>
            </ul>
          </div>
        </aside>

        <div className="lwa-card">
          {status === 'done' ? (
            <div className="lwa-done">
              <div className="lwa-ok">
                <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              </div>
              <h2>Application submitted</h2>
              <p>Thank you for applying. Our team will review your details and contact you if your profile matches.</p>
              <button type="button" className="lwa-btn" onClick={() => setStatus('idle')}>Submit another application</button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={submit} noValidate>
              <Step n="1" title="Personal details" text="Tell us who you are." />
              <div className="lwa-row">
                <Field id="lwa-name" label="Full name" error={err.name}>
                  <input {...ip('name')} type="text" placeholder="Enter your full name" autoComplete="name" />
                </Field>
                <Field id="lwa-phone" label="Phone no." error={err.phone}>
                  <input {...ip('phone')} type="tel" inputMode="numeric" placeholder="10-digit mobile number" autoComplete="tel-national" />
                </Field>
              </div>
              <div className="lwa-row">
                <Field id="lwa-email" label="Email ID" error={err.email}>
                  <input {...ip('email')} type="email" placeholder="you@example.com" autoComplete="email" />
                </Field>
                <Field id="lwa-city" label="City" error={err.city}>
                  <input {...ip('city')} type="text" placeholder="Your city" autoComplete="address-level2" />
                </Field>
              </div>

              <Step n="2" title="Professional details" text="The role you want and your background." />
              <Field id="lwa-position" label="Position applying for" error={err.position}>
                <select {...ip('position')} className={v.position ? '' : 'is-empty'}>
                  <option value="" disabled>Select a position</option>
                  {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </Field>
              <div className="lwa-row">
                <Field id="lwa-qual" label="Highest qualification" error={err.qual}>
                  <select {...ip('qual')} className={v.qual ? '' : 'is-empty'}>
                    <option value="" disabled>Select qualification</option>
                    {QUALS.map((q) => <option key={q} value={q}>{q}</option>)}
                  </select>
                </Field>
                <Field id="lwa-exp" label="Experience" error={err.exp}>
                  <select {...ip('exp')} className={v.exp ? '' : 'is-empty'}>
                    <option value="" disabled>Select experience</option>
                    {EXPS.map((x) => <option key={x} value={x}>{x}</option>)}
                  </select>
                </Field>
              </div>

              <Step n="3" title="Resume & message" text={`PDF, DOC or DOCX, up to ${MAX_MB} MB.`} />
              <div className={'lwa-f' + (err.file ? ' has-err' : '')}>
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" hidden onChange={(e) => { pickFile(e.target.files[0]); e.target.value = '' }} />
                {file ? (
                  <div className="lwa-file">
                    <span className="lwa-fi">DOC</span>
                    <div><b>{file.name}</b><small>{size(file)}</small></div>
                    <button type="button" aria-label="Remove file" onClick={() => setFile(null)}>✕</button>
                  </div>
                ) : (
                  <button
                    type="button"
                    name="file"
                    className={'lwa-drop' + (drag ? ' is-drag' : '')}
                    onClick={() => fileRef.current.click()}
                    onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={(e) => { e.preventDefault(); setDrag(false); pickFile(e.dataTransfer.files[0]) }}
                  >
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 20h14" /></svg>
                    <b>Upload your resume</b>
                    <span>Drag and drop here, or <u>browse files</u></span>
                  </button>
                )}
                {err.file && <p className="lwa-err" role="alert">{err.file}</p>}
              </div>

              <div className="lwa-f">
                <label htmlFor="lwa-msg">Message <em>(optional)</em></label>
                <textarea id="lwa-msg" name="msg" value={v.msg} onChange={change} maxLength={500} rows={4} placeholder="Tell us a little about yourself and why you want to join LWS" />
                <small className="lwa-count">{v.msg.length}/500</small>
              </div>

              <div className={'lwa-agree' + (err.agree ? ' has-err' : '')}>
                <label>
                  <input type="checkbox" name="agree" checked={v.agree} onChange={change} />
                  <span>I confirm that the information given above is correct and I agree to be contacted by LWS.</span>
                </label>
                {err.agree && <p className="lwa-err" role="alert">{err.agree}</p>}
              </div>

              {status === 'error' && <p className="lwa-fail" role="alert">Something went wrong. Please try again, or call us directly.</p>}

              <button type="submit" className="lwa-btn" disabled={status === 'sending'}>
                {status === 'sending' ? <><span className="lwa-spin" />Submitting…</> : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}