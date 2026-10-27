import { NavLink } from 'react-router-dom';

/**
 * Highlighted navigation link with a small badge (e.g. "NEW").
 * Gets the gold underline while its route is active.
 */
export default function HotNavLink({ to, children, badge = 'NEW' }) {
  return (
    <NavLink to={to} className={({ isActive }) => `nav-hot${isActive ? ' active' : ''}`}>
      {children}
      {badge && <span className="nav-badge">{badge}</span>}
    </NavLink>
  );
}