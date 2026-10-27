import { useRef } from 'react'
import { SITE } from '@/data/site'
import { useInView } from '@/hooks/useInView'
import { usePointerVars } from '@/hooks/usePointerVars'
import '@/styles/sections/app-promo.css'
import teamImg from '../../assets/images/mobile-inside.png'
/** LWS mobile-app promo with store badges and a pointer-parallax phone stage. */
export default function AppPromo () {
  const [sectionRef, inView] = useInView({ threshold: 0.25 })
  const cardRef = useRef(null)
  const stageRef = useRef(null)
  usePointerVars(cardRef, { target: stageRef, factor: 2, fineOnly: true, respectReducedMotion: true })

  return (
    <section
      className={`lwa${inView ? ' in' : ''}`}
      id='lws-app'
      aria-label='LWS mobile app'
      ref={sectionRef}
    >
      <div className='lwa-w'>
        <div className='lwa-card' ref={cardRef}>
          <i className='lwa-gw' aria-hidden='true' />
          <i className='lwa-nw' aria-hidden='true' />
          <div className='lwa-copy'>
            <span className='lwa-pill'>
              <svg viewBox='0 0 24 24' aria-hidden='true'>
                <path d='M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm5 17.2a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2zM7.5 5v10.5h9V5z' />
              </svg>
              LWS App
            </span>
            <h2 className='lwa-h'>Learn Anytime, Anywhere</h2>
            <p className='lwa-p'>
              Access NDA, CDS, AFCAT and SSB interview preparation content, books, tests and updates directly
              on the LWS mobile app.
            </p>
            <ul className='lwa-ft'>
              <li>
                <i>
                  <svg viewBox='0 0 24 24' aria-hidden='true'>
                    <path d='M12 6.5C10.3 5.2 7.8 4.6 4 5v13c3.8-.4 6.3.2 8 1.5 1.7-1.3 4.2-1.9 8-1.5V5c-3.800-.4-6.300.2-8 1.500zM12 6.5v13' />
                  </svg>
                </i>
                Study content
              </li>
              <li>
                <i>
                  <svg viewBox='0 0 24 24' aria-hidden='true'>
                    <path d='M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5' />
                  </svg>
                </i>
                Books & PDFs
              </li>
              <li>
                <i>
                  <svg viewBox='0 0 24 24' aria-hidden='true'>
                    <path d='M9 11l2.5 2.5L16 9M4 5h16v14H4z' />
                  </svg>
                </i>
                Mock tests
              </li>
              <li>
                <i>
                  <svg viewBox='0 0 24 24' aria-hidden='true'>
                    <path d='M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4' />
                  </svg>
                </i>
                Latest updates
              </li>
            </ul>
            <div className='lwa-st'>
              <a
                className='lwa-sb'
                href='https://play.google.com/store/apps/details?id=co.george.lvvwl'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Get the LWS app on Google Play'
              >
                <svg viewBox='0 0 24 24' aria-hidden='true'>
                  <path
                    fill='#00d0ff'
                    d='M3.6 2.3c-.3.3-.5.8-.5 1.400v16.600c0 .6.2 1.100.5 1.400l9.200-9.700z'
                  />
                  <path
                    fill='#00f076'
                    d='M16.300 15.400l-3.500-3.800 3.500-3.700 4.100 2.400c1.200.7 1.200 1.800 0 2.500z'
                  />
                  <path fill='#ff3a44' d='M16.300 15.400l-3.500-3.800-9.200 9.700c.4.400 1 .4 1.700 0z' />
                  <path fill='#ffd500' d='M16.300 7.900L5.300 1.700c-.7-.4-1.300-.4-1.700 0l9.200 9.700z' />
                </svg>{' '}
                <span>
                  <small>GET IT ON</small>
                  <b>Google Play</b>
                </span>
              </a>{' '}
              <a
                className='lwa-sb'
                href='https://apps.apple.com/in/app/lws-learn-with-sumit/id6465135446'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Download the LWS app on the App Store'
              >
                <svg viewBox='0 0 24 24' aria-hidden='true'>
                  <path
                    fill='#fff'
                    d='M12.152 6.896c-.948 0-2.415-1.078-3.960-1.040-2.040.027-3.910 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.090 1.013 1.454 2.208 3.090 3.792 3.039 1.520-.065 2.090-.987 3.935-.987 1.831 0 2.350.987 3.960.948 1.637-.026 2.676-1.480 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.220-4.857-.026-3.040 2.480-4.494 2.597-4.559-1.429-2.090-3.623-2.324-4.390-2.376-2-.156-3.675 1.090-4.610 1.090zM15.530 3.830c.843-1.012 1.400-2.427 1.245-3.830-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701'
                  />
                </svg>{' '}
                <span>
                  <small>Download on the</small>
                  <b>App Store</b>
                </span>
              </a>
            </div>
          </div>
          <div className='lwa-stage' ref={stageRef} aria-hidden='true'>
            <svg className='lwa-orb' viewBox='0 0 100 73.3' preserveAspectRatio='none'>
              <g>
                <circle
                  cx={66}
                  cy={42}
                  r={21}
                  fill='none'
                  stroke='#f4a31b'
                  strokeWidth='.28'
                  strokeDasharray='1.2 1.1'
                />
                <circle cx={66} cy={21} r={1.1} fill='#f4a31b' />
              </g>
              <g className='r'>
                <circle
                  cx={66}
                  cy={42}
                  r={31}
                  fill='none'
                  stroke='#4a5bd8'
                  strokeWidth='.26'
                  strokeDasharray='1 1.2'
                />
                <circle cx={35} cy={42} r={1} fill='#4a5bd8' />
              </g>
              <g>
                <circle
                  cx={66}
                  cy={42}
                  r={41}
                  fill='none'
                  stroke='#01094f'
                  strokeOpacity='.55'
                  strokeWidth='.24'
                  strokeDasharray='1.4 1.3'
                />
                <circle cx={66} cy={83} r={1} fill='#01094f' />
              </g>
            </svg>
            <div className='lwa-fl lwa-f1'>
              <span>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#f4a31b'
                  strokeWidth={1.8}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M9 18h6M10 21h4M12 3a6 6 0 0 0-3.500 10.900c.6.500 1 1.200 1 2.100h5c0-.9.4-1.600 1-2.100A6 6 0 0 0 12 3z' />
                </svg>
              </span>
            </div>
            <div className='lwa-fl lwa-f2'>
              <span>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#01094f'
                  strokeWidth={1.8}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path
                    d='M12 6.500C10.300 5.200 7.800 4.600 4 5v13c3.800-.4 6.300.2 8 1.500 1.700-1.300 4.200-1.900 8-1.500V5c-3.800-.4-6.300.2-8 1.500zM12 6.500v13'
                    stroke='#2a56e8'
                  />
                </svg>
              </span>
            </div>
            <div className='lwa-fl lwa-f3'>
              <span>
                <svg viewBox='0 0 24 24'>
                  <rect x={5} y={3} width={14} height={18} rx={2.4} fill='#8b5cf6' />
                  <rect x={8} y={7} width={8} height={2} rx={1} fill='#ffd27a' />
                  <rect x={8} y={11} width={8} height={1.6} rx='.8' fill='#fff' opacity='.7' />
                  <rect x={8} y={14.5} width={5} height={1.6} rx='.8' fill='#fff' opacity='.7' />
                </svg>
              </span>
            </div>
            <div className='lwa-fl lwa-f4'>
              <span>
                <svg viewBox='0 0 24 24'>
                  <path d='M6 2h8l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z' fill='#e53935' />
                  <path d='M14 2l5 5h-4a1 1 0 0 1-1-1z' fill='#ff8a80' />
                  <text
                    x={11.5}
                    y={17}
                    textAnchor='middle'
                    fontFamily='Inter,Arial,sans-serif'
                    fontSize='6.500'
                    fontWeight='800'
                    fill='#fff'
                  >
                    PDF
                  </text>
                </svg>
              </span>
            </div>
            <div className='lwa-fl lwa-f5'>
              <span>
                <svg viewBox='0 0 24 24'>
                  <rect x={3} y={5} width={18} height={12} rx={2} fill='#6d4ae0' />
                  <rect x={5} y={7} width={14} height={8} rx={1} fill='#2a1a8f' />
                  <path d='M12 8.200l5 2.100-5 2.100-5-2.100z' fill='#fff' />
                  <path d='M9.500 12v1.600c.7.900 4.300.9 5 0V12' fill='none' stroke='#fff' strokeWidth={1} />
                  <path d='M9 20h6M12 17v3' stroke='#6d4ae0' strokeWidth={1.8} strokeLinecap='round' />
                </svg>
              </span>
            </div>
            <div className='lwa-ph lwa-p2'>
              <div className='lwa-bz'>
                <div className='lwa-scr lwa-s2'>
                  <i className='lwa-nt' />
                  <div className='lg'>LWS</div>
                  <h3>
                    One stop solution
                    <small>for defence aspirants</small>
                  </h3>
                  <div className='ls'>
                    <div>
                      <i>NDA</i>
                      <span>
                        <b>NDA</b>
                        <small>Foundation & preparation</small>
                      </span>
                    </div>
                    <div>
                      <i>SSB</i>
                      <span>
                        <b>SSB</b>
                        <small>Interview preparation</small>
                      </span>
                    </div>
                    <div>
                      <i>CDS</i>
                      <span>
                        <b>CDS</b>
                        <small>Combined Defence Services</small>
                      </span>
                    </div>
                    <div>
                      <i>AF</i>
                      <span>
                        <b>AFCAT</b>
                        <small>Air Force entry</small>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='lwa-ph lwa-p1'>
              <div className='lwa-bz'>
                <div className='lwa-scr lwa-s1'>
                  <i className='lwa-nt' />
                  {/* <div className="tb">
                    <i />
                    Learn With Sumit
                  </div> */}
                  <div className='lwa-shot'>
                    <img src={teamImg} alt='' loading='lazy' decoding='async' />
                  </div>
                  <div className='ap'>
                    <div className='lg'>LWS</div>
                    <div>
                      <b>Learn With Sumit</b>
                      <small>LWS Learning Studies</small>
                    </div>
                  </div>
                  <div className='st'>
                    <div>
                      <span>NDA</span>
                      Foundation
                    </div>
                    <div>
                      <span>SSB</span>
                      Interview
                    </div>
                    <div>
                      <span>CDS</span>
                      Written
                    </div>
                    <div>
                      <span>AFCAT</span>
                      Graduates
                    </div>
                  </div>
                  <div className='ins'>Install</div>
                  <div className='th'>
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className='ab'>
                    About this app
                    <u />
                    <u />
                    <u />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
