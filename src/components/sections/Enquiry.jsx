import { PROGRAMS } from '@/data/faqs'
import { useEnquiryForm } from '@/hooks/useEnquiryForm'
import '@/styles/sections/enquiry.css';

/** Sirf NDA aur SSB ke FAQs. Naya sawal jodne ke liye ek object aur add kar do. */
const FAQS = [
  {
    id: 'nda-1',
    tag: 'NDA',
    question: 'What makes LWS the top choice for NDA Foundation coaching in India?',
    answer: 'LWS is recognized as India’s best NDA foundation coaching institute, offering integrated CBSE schooling with rigorous NDA preparation led by retired defence officers and the best subject experts, producing consistent All India Rankers (AIR 1, AIR 2, AIR 3).'
  },
  {
    id: 'nda-2',
    tag: 'NDA',
    question: 'Who is eligible for the LWS NDA Foundation Programs?',
    answer: 'Students entering Class 9th can enroll in the 4-year integrated NDA Foundation course while those entering Class 11th can join the 2-year NDA Foundation course, focusing on academics plus defence exam preparation.'
  },
  {
    id: 'nda-3',
    tag: 'NDA',
    question: 'What courses does LWS offer for NDA (after Class 12)?',
    answer: 'LWS provides full NDA preparation for Army, Navy, and Air Force, with programs ranging from 1-month crash courses to 4-year foundation courses, covering mathematics, GAT, current affairs, and physical training.'
  },
  {
    id: 'ssb-1',
    tag: 'SSB',
    question: 'Why is LWS regarded as India’s leading SSB coaching institute?',
    answer: 'LWS boasts India’s highest number of SSB recommendations led by expert retired officers like Commander Vikas Yadav, with exclusive GTO ground training ensuring practical, results-driven preparations.'
  },
  {
    id: 'ssb-2',
    tag: 'SSB',
    question: 'What key SSB GTO tasks are practiced at LWS?',
    answer: 'Aspiring officers train in Progressive Group Task, Command Task, Half Group Task, Group Obstacle Race, and personal interviews, mimicking real SSB scenarios.'
  },
  {
    id: 'ssb-3',
    tag: 'SSB',
    question: 'Does LWS SSB coaching include psychological test preparation?',
    answer: 'Yes. LWS thoroughly prepares students in TAT, WAT, SRT, PPDT with personalized evaluation and mock interviews fostering confidence and clarity.'
  }
]

/** FAQ accordion and the enquiry form that posts to the Laravel API. */
export default function Enquiry () {
  const { values, errors, status, message, onChange, onSubmit } = useEnquiryForm()
  const busy = status === 'submitting'

  return (
    <section className='sec' id='enquire' style={{ background: 'var(--bg2)' }}>
      <div className='wrap two enq-two'>
        <div className='enq-faq'>
          <h2>Frequently asked questions</h2>
          {FAQS.map((f, i) => (
            <details key={f.id} open={i === 0}>
              <summary>
                <span className={`enq-tag ${f.tag.toLowerCase()}`}>{f.tag}</span>
                {f.question}
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
        <div className='form enq-form'>
          <h3>Enquiry Form</h3>
          <form noValidate onSubmit={onSubmit}>
            <input
              name='name'
              value={values.name}
              onChange={onChange}
              placeholder='Your Name*'
              aria-label='Name'
              aria-invalid={!!errors.name}
              autoComplete='name'
            />
            {errors.name && <small className='form-error'>{errors.name}</small>}
            <input
              name='mobile'
              value={values.mobile}
              onChange={onChange}
              type='tel'
              inputMode='numeric'
              placeholder='Mobile Number*'
              aria-label='Mobile'
              aria-invalid={!!errors.mobile}
              autoComplete='tel'
            />
            {errors.mobile && <small className='form-error'>{errors.mobile}</small>}
            <input
              name='email'
              value={values.email}
              onChange={onChange}
              type='email'
              placeholder='Email Address*'
              aria-label='Email'
              aria-invalid={!!errors.email}
              autoComplete='email'
            />
            {errors.email && <small className='form-error'>{errors.email}</small>}
            <select
              name='program'
              value={values.program}
              onChange={onChange}
              aria-label='Program'
              aria-invalid={!!errors.program}
            >
              <option value=''>Select A Program*</option>
              {PROGRAMS.map(p => (
                <option key={p}>{p}</option>
              ))}
            </select>
            {errors.program && <small className='form-error'>{errors.program}</small>}
            <button className='btn' type='submit' disabled={busy}>
              {busy ? 'Sending…' : 'Get Free Consultation'}
            </button>
            <div id='ok' role='status' style={{ display: status === 'success' ? 'block' : undefined }}>
              {message}
            </div>
            {status === 'error' && (
              <div className='form-error' role='alert'>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}