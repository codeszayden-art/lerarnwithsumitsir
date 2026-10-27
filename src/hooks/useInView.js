import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether an element is visible in the viewport.
 * Returns `[ref, inView]`. Pass `ref` to observe an element you already own.
 * With `once` (default) the observer disconnects after the first intersection.
 */
export function useInView({ threshold = 0.2, once = true, ref: external } = {}) {
  const own = useRef(null);
  const ref = external || own;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold, once]);

  return [ref, inView];
}
