import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
// import './CallFab.css'
// import '@/styles/layout/CallFab.css'
import '../../styles/layout/CallFab.css'

/**
 * Floating "Call" button + number panel.
 * Desktop: button ke upar chhota card. Mobile: neeche se bottom-sheet.
 * Position badalne ke liye CallFab.css mein --cf-right / --cf-bottom change karo.
 */
const NUMBERS = [
  { number: '9528091141', label: 'NDA Foundation 1', color: '#3b82f6' },
  { number: '9557976848', label: 'NDA Foundation 2', color: '#22b573' },
  { number: '8882453854', label: 'SSB Interview', color: '#8b5cf6' },
  { number: '9211637514', label: 'Online', color: '#f4a31b' }
]

const pretty = n => n.replace(/^(\d{5})(\d{5})$/, '$1 $2')

const ICONS = {
  phone: (
    <path d='M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z' />
  ),
  close: <path d='M6 6l12 12M18 6L6 18' />,
  copy: (
    <>
      <rect x='9' y='9' width='11' height='11' rx='2' />
      <path d='M5 15V6a2 2 0 0 1 2-2h9' />
    </>
  ),
  check: <path d='M5 12.5l4.5 4.5L19 7.5' />
}
const Ic = ({ n, s = 18, w = 2 }) => (
  <svg
    viewBox='0 0 24 24'
    width={s}
    height={s}
    fill='none'
    stroke='currentColor'
    strokeWidth={w}
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    {ICONS[n]}
  </svg>
)

export default function CallFab () {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState('')

  // Esc se band
  useEffect(() => {
    if (!open) return
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const copy = async num => {
    try {
      await navigator.clipboard.writeText(num)
      setCopied(num)
      setTimeout(() => setCopied(''), 1600)
    } catch (e) {}
  }

  return createPortal(
    <div className='cf'>
      {open && <div className='cf-bd' onClick={() => setOpen(false)} />}

      <section
        className={'cf-panel' + (open ? ' is-open' : '')}
        role='dialog'
        aria-label='Call LWS'
        aria-hidden={!open}
      >
        <header className='cf-head'>
          <span className='cf-head-ic'>
            <Ic n='phone' s={17} />
          </span>
          <h2>Call LWS</h2>
          <button
            type='button'
            className='cf-x'
            aria-label='Close'
            onClick={() => setOpen(false)}
          >
            <Ic n='close' s={18} w={2.4} />
          </button>
        </header>

        <p className='cf-sub'>Tap a number to call our counsellors.</p>

        <ul className='cf-list'>
          {NUMBERS.map(({ number, label, color }) => (
            <li key={number} style={{ '--c': color }}>
              <a className='cf-row' href={`tel:+91${number}`}>
                <span className='cf-ic'>
                  <Ic n='phone' s={17} />
                </span>
                <span className='cf-tx'>
                  <b>{pretty(number)}</b>
                  <small>{label}</small>
                </span>
              </a>
              <button
                type='button'
                className='cf-copy'
                aria-label={`Copy ${pretty(number)}`}
                onClick={() => copy(number)}
              >
                {copied === number ? (
                  <Ic n='check' s={16} w={2.6} />
                ) : (
                  <Ic n='copy' s={16} />
                )}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <button
        type='button'
        className={'cf-fab' + (open ? ' on' : '')}
        aria-label={open ? 'Close call menu' : 'Call LWS'}
        aria-expanded={open}
        aria-haspopup='dialog'
        onClick={() => setOpen(o => !o)}
      >
        <Ic n='phone' s={22} />
      </button>
    </div>,
    document.body
  )
}
