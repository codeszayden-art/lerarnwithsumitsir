import { useEffect, useState } from 'react';

/** Returns the id (from `ids`) of the section that currently crosses the middle of the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.4;
      let current = null;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      });
      if (window.scrollY < 200) current = null;
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);

  return active;
}
