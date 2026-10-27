import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { prefersReducedMotion } from '@/utils/device';

const DURATION_MS = 1100;

/** Number that eases from 0 to `to` the first time it scrolls into view. */
export default function CountUp({ to }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const [value, setValue] = useState(to);
  const frame = useRef();

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return undefined;
    let start = null;
    const tick = (ts) => {
      if (start === null) start = ts;
      const k = Math.min((ts - start) / DURATION_MS, 1);
      setValue(Math.max(1, Math.round(to * (1 - (1 - k) ** 3))));
      if (k < 1) frame.current = requestAnimationFrame(tick);
    };
    setValue(0);
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [inView, to]);

  return <b ref={ref}>{value}</b>;
}
