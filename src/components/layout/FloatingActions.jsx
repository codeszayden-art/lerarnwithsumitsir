import { useEffect, useState } from 'react';
// import QuickActionIcon from '.@/components/QuickActionIcon';
import QuickActionIcon from '../../features/age-calculator/components/QuickActionIcon';

// import { QUICK_ACTIONS } from '@/data/quickActions';
import { QUICK_ACTIONS } from '../../features/age-calculator/data/quickActions';

// import '@/styles/layout/floating-actions.css';
//  import '../../styles/layout/floating-actions.css';


const isDesktop = () => window.matchMedia('(min-width: 769px)').matches;

/**
 * Floating shortcuts:
 *  1. Collapsible quick-action rail docked to the left edge (hover shows the label).
 *  2. "Ask LWS" tab.
 *  3. Call + WhatsApp buttons (FAB).
 */


export default function FloatingActions() {
  // open on desktop, collapsed on phones so it never covers content
  const [open, setOpen] = useState(isDesktop);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <aside className={`fa-rail${open ? ' open' : ''}`} aria-label="Quick actions">
        <button
          type="button"
          className="fa-toggle"
          aria-expanded={open}
          aria-controls="fa-list"
          aria-label={open ? 'Hide quick actions' : 'Show quick actions'}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? '←' : '→'}</span>
        </button>

        <ul className="fa-list" id="fa-list">
          {QUICK_ACTIONS.map((a) => (
            <li key={a.id}>
              <a
                className="fa-item"
                href={a.href}
                aria-label={a.label}
                tabIndex={open ? 0 : -1}
                {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...(a.download ? { download: true } : {})}
              >
                <span className="fa-ic">
                  <QuickActionIcon type={a.type} />
                </span>
                <span className="fa-label">{a.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>




    </>
  );
}