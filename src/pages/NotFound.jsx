import { Link } from 'react-router-dom';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <section className="sec page-stub">
      <div className="wrap">
        <h2>Page not found</h2>
        <p className="sub">The page you are looking for does not exist.</p>
        <Link className="btn p" to="/">Go to home</Link>
      </div>
    </section>
  );
}
