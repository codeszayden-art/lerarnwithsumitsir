import { useActiveSection } from '@/hooks/useActiveSection';

const ITEMS = [
  { id: null, href: '#top', label: 'Home', icon: 'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z' },
  { id: 'courses', href: '#courses', label: 'Courses', icon: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7M8 11h7' },
  { id: 'centers', href: '#centers', label: 'Centres', icon: 'M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z' },
  { id: 'champions', href: '#champions', label: 'Results', icon: 'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3' },
  { id: 'enquire', href: '#enquire', label: 'Enquire', icon: 'M4 4h16v12H8l-4 4zM8 9h8M8 12h5' },
];
const IDS = ITEMS.map((i) => i.id).filter(Boolean);

/** App-style tab bar. Only visible on phones (see styles/layout/app-shell.css). */
export default function BottomNav() {
  const active = useActiveSection(IDS);

  const onClick = (e, item) => {
    if (item.id === null) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bnav" aria-label="Primary">
      {ITEMS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={`bnav-item${active === item.id ? ' on' : ''}`}
          aria-current={active === item.id ? 'page' : undefined}
          onClick={(e) => onClick(e, item)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={item.icon} />
          </svg>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
