import { useEffect, useState } from 'react';

/** Cycles through `items`; `swapping` is true for `swapMs` before each change (for CSS transitions). */
export function useRotatingText(items, everyMs = 2500, swapMs = 300) {
  const [index, setIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    let timeout;
    const id = setInterval(() => {
      setSwapping(true);
      timeout = setTimeout(() => {
        setIndex((i) => (i + 1) % items.length);
        setSwapping(false);
      }, swapMs);
    }, everyMs);
    return () => {
      clearInterval(id);
      clearTimeout(timeout);
    };
  }, [items.length, everyMs, swapMs]);

  return { value: items[index], swapping };
}
