import { Link } from 'react-router-dom'
import imgLogoWhite from '@/assets/images/brand/logo-white.webp'
// import './Footer.css'

/**
 * Site footer: app badges, about + social, quick links, courses, map,
 * contact cards (office, phone, email) and a copyright bar.
 * Internal pages use `to`, external pages use `href`. Change the paths to match your routes.
 */
const ABOUT =
  'LWS is India\u2019s most trusted NDA & SSB coaching, offering an NDA Foundation Course (4 years after Class 8, 2 years after Class 10). With branches across Delhi, Haryana, Pune & more, LWS has achieved thousands of selections in NDA, CDS, AFCAT, including AIR 1, 2, 3 and top ranks.'

const USEFUL = [
  { label: 'About Us', to: '/about-us' },
  { label: 'Contact', to: '/contact' },
  { label: 'Results', to: '/results' },
  { label: 'Answer Key NDA 1 2026', href: 'https://learnwithsumit.in/lws-answer-key/' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms and Conditions', to: '/terms-and-conditions' },
]

const COURSES = [
  { label: 'NDA', to: '/#courses' },
  { label: 'CDS', to: '/#courses' },
  { label: 'CUET', to: '/#courses' },
  { label: 'RIMC', to: '/#courses' },
  { label: 'RMS', to: '/#courses' },
  { label: 'AFCAT', to: '/#courses' },
]

const CALLS = [
  { label: 'Online Courses', nums: ['9211637514', '8799711840'] },
  { label: 'Foundation Batch (School + NDA Preparation, Classes IX\u2013XII)', nums: ['9528091141', '7983507721'] },
  { label: 'SSB Interview', nums: ['8882453854', '9266683750'] },
]

const EMAIL = 'learnwithsumitsir@gmail.com'
const UP = 'https://learnwithsumit.in/wp-content/uploads/2025/11'
const MAP_SRC =
  'https://maps.google.com/maps?q=LWS%2C%2012%2F6%2F1%2C%20Block%20C%2C%20Near%20Mahila%20Park%2C%20Mohit%20Nagar%2C%20Vikaspuri%2C%20Dwarka%20Sec%2015%2C%20New%20Delhi%20110059&t=m&z=15&output=embed'

const SOCIAL = [
  {
    name: 'Facebook', href: 'https://www.facebook.com/learnwithsumitsir', vb: '0 0 512 512',
    d: 'M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z',
  },
  {
    name: 'X', href: 'https://x.com/LearnWithSumit1', vb: '0 0 512 512',
    d: 'M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z',
  },
  {
    name: 'YouTube', href: 'https://www.youtube.com/c/LearnwithSumitSir', vb: '0 0 576 512',
    d: 'M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z',
  },
  {
    name: 'Instagram', href: 'https://www.instagram.com/learnwithsumitsir/', vb: '0 0 448 512',
    d: 'M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z',
  },
]

const ICONS = {
  pin: <><path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 0 0-13 0C5.5 15.4 12 21 12 21z" /><circle cx="12" cy="10" r="2.4" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
}
const Ic = ({ n }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {ICONS[n]}
  </svg>
)

const pretty = (n) => n.replace(/^(\d{5})(\d{5})$/, '$1 $2')

function FLink({ item }) {
  return item.to
    ? <Link to={item.to}>{item.label}</Link>
    : <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
}

export default function Footer() {
  return (
    <div className="lwf" id="contact" role="contentinfo">
      {/* App download band */}
      <div className="lwf-app">
        <div className="lwf-w lwf-app-in">
          <div>
            <p className="lwf-app-t">Get the LWS app</p>
            <p className="lwf-app-s">Study anytime, anywhere with the LWS app.</p>
          </div>
          <div className="lwf-badges">
            <a href="https://play.google.com/store/apps/details?id=co.george.lvvwl" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
              <img src={`${UP}/google-play.svg`} alt="Get it on Google Play" width="135" height="40" loading="lazy" />
            </a>
            <a href="https://apps.apple.com/in/app/lws-learn-with-sumit/id6465135446" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
              <img src={`${UP}/app-store.svg`} alt="Download on the App Store" width="120" height="40" loading="lazy" />
            </a>
          </div>
        </div>
      </div>

      <div className="lwf-w">
        {/* Main columns */}
        <div className="lwf-main">
          <div className="lwf-brand">
            <Link to="/" aria-label="Learn with Sumit home">
              <img src={imgLogoWhite} alt="Learn with Sumit" height="62" />
            </Link>
            <p>{ABOUT}</p>
            <div className="lwf-social">
              {SOCIAL.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                  <svg viewBox={s.vb} width="18" height="18" fill="currentColor" aria-hidden="true"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="lwf-h">Useful links</p>
            <ul className="lwf-list">
              {USEFUL.map((it) => <li key={it.label}><FLink item={it} /></li>)}
            </ul>
          </div>

          <div>
            <p className="lwf-h">Courses</p>
            <ul className="lwf-list">
              {COURSES.map((it) => <li key={it.label}><FLink item={it} /></li>)}
            </ul>
          </div>

          <div className="lwf-map">
            <p className="lwf-h">Find us here</p>
            <iframe
              title="LWS, 12/6/1, Block C, Near Mahila Park, Mohit Nagar, Vikaspuri, Dwarka Sec 15, New Delhi 110059"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Contact cards */}
        <div className="lwf-cards">
          <div className="lwf-card">
            <span className="lwf-ic"><Ic n="pin" /></span>
            <div>
              <p className="lwf-ct">Our Registered Office</p>
              <p><b>Head Office:</b> 12/6/1, Block C, Near Mahila Park, Mohit Nagar, Vikaspuri, Dwarka Sec 15, New Delhi 110059</p>
              <p><b>SSB Wing:</b> LWS Campus, Bhartiya International School, Shani and Mangal Bazar, Near SBI ATM Rajokari, New Delhi 110038</p>
            </div>
          </div>

          <div className="lwf-card">
            <span className="lwf-ic"><Ic n="phone" /></span>
            <div>
              <p className="lwf-ct">Give Us a Call</p>
              {CALLS.map((c) => (
                <p key={c.label}>
                  <b>{c.label}:</b>{' '}
                  {c.nums.map((n, i) => (
                    <span key={n}>
                      <a href={`tel:+91${n}`}>{pretty(n)}</a>{i < c.nums.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>

          <div className="lwf-card">
            <span className="lwf-ic"><Ic n="mail" /></span>
            <div>
              <p className="lwf-ct">Send Us a Message</p>
              <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="lwf-bottom">
          <p>&copy; {new Date().getFullYear()} Learn with Sumit (LWS). All rights reserved.</p>
          <div>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </div>
  )
}