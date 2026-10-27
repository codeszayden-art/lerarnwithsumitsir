import { useEffect } from 'react';

/** Adds the `in` class to every `selector` match inside `rootRef` once it scrolls into view. */
export function useRevealOnScroll(rootRef, selector, { threshold = 0.15 } = {}) {
  useEffect(() => {
    const items = [...(rootRef.current?.querySelectorAll(selector) ?? [])];
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in'));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }),
      { threshold },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef, selector, threshold]);
}
