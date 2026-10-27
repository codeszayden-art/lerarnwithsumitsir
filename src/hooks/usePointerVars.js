import { useEffect } from 'react';
import { hasFinePointer, prefersReducedMotion } from '@/utils/device';

/**
 * Writes the pointer position over `ref` into CSS custom properties (default `--mx` / `--my`)
 * on `target` (default: the same element). Values are `(relative - 0.5) * factor`.
 */
export function usePointerVars(
  ref,
  {
    target,
    names = ['--mx', '--my'],
    factor = 2,
    factors,
    unit = '',
    fineOnly = false,
    respectReducedMotion = false,
    resetOnLeave = true,
  } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (fineOnly && !hasFinePointer()) return undefined;
    if (respectReducedMotion && prefersReducedMotion()) return undefined;
    const [fx, fy] = factors || [factor, factor];
    const out = () => target?.current || el;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      out().style.setProperty(names[0], `${((e.clientX - r.left) / r.width - 0.5) * fx}${unit}`);
      out().style.setProperty(names[1], `${((e.clientY - r.top) / r.height - 0.5) * fy}${unit}`);
    };
    const onLeave = () => {
      out().style.setProperty(names[0], `0${unit}`);
      out().style.setProperty(names[1], `0${unit}`);
    };
    el.addEventListener('pointermove', onMove);
    if (resetOnLeave) el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, target, factor, unit, fineOnly, respectReducedMotion, resetOnLeave]);
}
