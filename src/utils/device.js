/** Small, SSR-safe wrappers around matchMedia checks used by the interactive sections. */
const matches = (query) => typeof window !== 'undefined' && window.matchMedia(query).matches;

export const canHover = () => matches('(hover: hover)');
export const hasFinePointer = () => matches('(pointer: fine)');
export const prefersReducedMotion = () => matches('(prefers-reduced-motion: reduce)');
export const isStandalone = () =>
  matches('(display-mode: standalone)') || window.navigator.standalone === true;
