import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const SWIPE_PX = 45;

/**
 * Seamless infinite slider. The caller renders `total + clones` slides; when the
 * track reaches a clone we silently jump back to the matching real slide.
 * A CSS progress bar (`.lwsx-fill`) drives autoplay through `onFillEnd`.
 */
export function useInfiniteSlider({ total, clones = 2 }) {
  const trackRef = useRef(null);
  const busy = useRef(false);
  const pending = useRef(null);
  const touchX = useRef(null);
  const [pos, setPos] = useState({ i: 0, animate: false });
  const [step, setStep] = useState(0);
  const [runKey, setRunKey] = useState(0);
  const perView = useMediaQuery('(min-width: 761px)') ? 2 : 1;
  const iRef = useRef(0);
  iRef.current = pos.i;

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const first = track?.firstElementChild;
      if (first) setStep(first.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0));
    };
    measure();
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(measure, 150);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [perView, total, clones]);

  // Second half of a backwards wrap: after the silent jump, animate one slide back.
  useLayoutEffect(() => {
    if (pending.current === null) return;
    void trackRef.current?.offsetWidth; // force reflow so the jump is painted without transition
    const d = pending.current;
    pending.current = null;
    setPos((p) => ({ i: p.i + d, animate: true }));
  }, [pos]);

  useEffect(() => setRunKey((k) => k + 1), [pos.i]);

  const go = useCallback(
    (d) => {
      if (busy.current) return;
      busy.current = true;
      setTimeout(() => {
        busy.current = false; // safety net if transitionend never fires
      }, 1200);
      if (d < 0 && iRef.current === 0) {
        pending.current = d;
        setPos({ i: total, animate: false });
      } else {
        setPos((p) => ({ i: p.i + d, animate: true }));
      }
    },
    [total],
  );

  const onTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    if (iRef.current >= total) setPos({ i: iRef.current - total, animate: false });
    busy.current = false;
  };
  const onFillEnd = (e) => {
    if (e.animationName === 'lwsx-fill') go(1);
  };
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const d = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(d) > SWIPE_PX) go(d < 0 ? 1 : -1);
  };

  const trackStyle = {
    transition: pos.animate ? undefined : 'none',
    transform: `translateX(${-pos.i * step}px)`,
  };
  return { index: pos.i, perView, go, trackRef, trackStyle, runKey, onTransitionEnd, onFillEnd, onTouchStart, onTouchEnd };
}
