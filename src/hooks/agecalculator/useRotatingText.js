import { useEffect, useState } from 'react';

/**
 * Cycles through `items`. `swapping` is true for `swapMs` before each change
 * so CSS can fade the old value out first.
 */
export function useRotatingText(items, { intervalMs = 2500, swapMs = 300 } = {}) {
  const [index, setIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    if (items.length < 2) return undefined;
    let swapTimer;
    const interval = setInterval(() => {
      setSwapping(true);
      swapTimer = setTimeout(() => {
        setIndex((i) => (i + 1) % items.length);
        setSwapping(false);
      }, swapMs);
    }, intervalMs);
    return () => {
      clearInterval(interval);
      clearTimeout(swapTimer);
    };
  }, [items, intervalMs, swapMs]);

  return { text: items[index], swapping };
}
