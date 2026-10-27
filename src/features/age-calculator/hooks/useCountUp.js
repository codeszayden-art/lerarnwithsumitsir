import { useEffect, useState } from 'react';

/** Animates 0 -> target with an ease-out cubic curve. */
export function useCountUp(target, { duration = 900 } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame;
    let startedAt = null;

    const tick = (now) => {
      if (startedAt === null) startedAt = now;
      const progress = Math.min((now - startedAt) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}
