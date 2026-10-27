import { useEffect } from 'react';
import { hasFinePointer } from '@/utils/device';

/** Moves every `[data-depth]` child of `ref` with the pointer for a layered parallax effect. */
export function useParallaxDepth(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer()) return undefined;
    const layers = () => [...el.querySelectorAll('[data-depth]')];
    const onMove = (e) => {
      const b = el.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width - 0.5;
      const y = (e.clientY - b.top) / b.height - 0.5;
      layers().forEach((l) => {
        const d = Number(l.dataset.depth);
        l.style.translate = `${x * d}px ${y * d}px`;
      });
    };
    const onLeave = () => layers().forEach((l) => (l.style.translate = '0 0'));
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref]);
}
