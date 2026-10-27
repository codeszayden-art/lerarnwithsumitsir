import { useState } from 'react'
import { SITE } from '@/data/site'
import imgLogoColor from '@/assets/images/brand/logo-color.webp'
import imgLogoWhite from '@/assets/images/brand/logo-white.webp'
import { Link } from 'react-router-dom'
import HotNavLink from '@/components/layout/HotNavLink';

/** Sticky site header with logo, mega-menu navigation and primary calls to action. */
export default function Header () {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header>
      <div className='wrap'>
        <nav>
          <Link className='logo' to='/' aria-label='Learn with Sumit home'>
            <img className='lc' src={imgLogoColor} alt='Learn with Sumit' />
            <img className='lw' src={imgLogoWhite} alt='' />
          </Link>
          <div
            className={`links${menuOpen ? ' open' : ''}`}
            onClick={e => e.target.closest('a') && setMenuOpen(false)}
          >
            <div className='dd'>
              <Link to='/#courses'>Courses</Link>
              <div className='mg'>
                <div className='wrap mgi'>
                  <div>
                    <h5>Defence Courses</h5>
                    <Link to='/#courses'>NDA Foundation</Link>
                    <Link to='/#courses'>NDA 3 Month</Link>
                    <Link to='/#courses'>NDA 6 Month</Link>
                    <Link to='/#courses'>NDA 1 Year</Link>
                  </div>
                  <div>
                    <h5>Defence Courses</h5>
                    <Link to='/#nda'>SSB</Link>
                    <Link to='/#nda'>CDS</Link>
                    <Link to='/#nda'>AFCAT</Link>
                  </div>
                  <div>
                    <h5>School Entrances</h5>
                    <Link to='/#exams'>Merchant Navy</Link>
                    <Link to='/#exams'>CUET</Link>
                    <Link to='/#exams'>JEE</Link>
                    <Link to='/#exams'>NEET</Link>
                  </div>
                  <div>
                    <h5>Specialized Training</h5>
                    <Link to='/#exams'>RIMC</Link>
                    <Link to='/#exams'>RMS</Link>
                    <Link to='/#exams'>Sainik School</Link>
                  </div>
                </div>
              </div>
            </div>
            <HotNavLink to="/mock-tests">SSB Practice</HotNavLink>
            <Link to='/books'>Books</Link>
          
    
            {/* <Link to='/#why'>Service Entries</Link>
            <Link to='/#why'>Free Study Material</Link> */}
            <Link to='/why-lws'>Why LWS</Link>
            <Link to='/blogs'>Blogs</Link>
            <Link to='/contact'>Contact</Link>
          </div>
          <a className='btn o' href='https://pages.razorpay.com/OnlineRegistration2024' target='_blank' rel='noopener noreferrer'>
            Register Now
          </a>
          <Link className='btn p' to='/enquire'>
            Enquire Now →
          </Link>{' '}
          <button
            className='burger'
            aria-label='Menu'
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(open => !open)}
          >
            ☰
          </button>
        </nav>
      </div>
    </header>
  )
}