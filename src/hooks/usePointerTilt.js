import { hasFinePointer } from '@/utils/device';

/** Returns pointer handlers that tilt a card in 3D (`--rx` / `--ry`). No-op on touch devices. */
export function usePointerTilt({ maxX = 10, maxY = 8 } = {}) {
  if (typeof window === 'undefined' || !hasFinePointer()) return {};
  return {
    onPointerMove: (e) => {
      const el = e.currentTarget;
      const b = el.getBoundingClientRect();
      el.style.setProperty('--ry', `${((e.clientX - b.left) / b.width - 0.5) * maxX}deg`);
      el.style.setProperty('--rx', `${-((e.clientY - b.top) / b.height - 0.5) * maxY}deg`);
    },
    onPointerOut: (e) => {
      e.currentTarget.style.setProperty('--rx', '0deg');
      e.currentTarget.style.setProperty('--ry', '0deg');
    },
  };
}
