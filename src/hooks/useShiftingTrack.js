import { useCallback, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/utils/device';

/**
 * Endless "conveyor" track: every `interval` ms the first card slides out and is
 * moved to the end of the list. Pauses while hovered and for reduced-motion users.
 */
export function useShiftingTrack(items, { interval = 2200, duration = 600, gap = 4 } = {}) {
  const trackRef = useRef(null);
  const moving = useRef(false);
  const timer = useRef(null);
  const [order, setOrder] = useState(items);
  const [shift, setShift] = useState({ px: 0, animate: false });

  useEffect(() => setOrder(items), [items]);

  const step = useCallback(() => {
    const first = trackRef.current?.firstElementChild;
    if (moving.current || !first) return;
    moving.current = true;
    setShift({ px: first.getBoundingClientRect().width + gap, animate: true });
    setTimeout(() => {
      setOrder((list) => [...list.slice(1), list[0]]);
      setShift({ px: 0, animate: false });
      moving.current = false;
    }, duration + 20);
  }, [duration, gap]);

  const resume = useCallback(() => {
    clearInterval(timer.current);
    if (!prefersReducedMotion()) timer.current = setInterval(step, interval);
  }, [step, interval]);
  const pause = useCallback(() => clearInterval(timer.current), []);

  useEffect(() => {
    resume();
    return pause;
  }, [resume, pause]);

  const trackStyle = {
    transition: shift.animate ? `transform ${duration / 1000}s ease` : 'none',
    transform: shift.px ? `translateX(-${shift.px}px)` : 'none',
  };
  return { order, trackRef, trackStyle, pause, resume };
}
