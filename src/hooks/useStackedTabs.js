import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const STICKY_TOP = 130; // distance of the first panel from the viewport top
const PEEK = 10; // how much of each stacked panel peeks out
const GAP = 34;
const DESKTOP_MIN = 861;

/** Hash links that should open a given course tab instead of jumping. */
const HASH_TO_TAB = {
  '#courses': 3, '#nda': 0, '#gurukul': 1, '#elig': 3, '#why': 3,
  '#t-nda': 0, '#t-ssb': 1, '#t-cds': 2, '#t-afcat': 3, '#t-other': 4,
};

/**
 * Behaviour of the sticky "stacked cards" course tabs:
 * panels stack on desktop, clicking a tab smooth-scrolls to its panel and
 * scrolling highlights the tab of the panel currently on top.
 */
export function useStackedTabs(count) {
  const tabsRef = useRef(null);
  const stackRef = useRef(null);
  const panels = useRef([]);
  const [active, setActive] = useState(0);
  const [stuck, setStuck] = useState(false);

  const panelRefs = useMemo(
    () => Array.from({ length: count }, (_, i) => (node) => { panels.current[i] = node; }),
    [count],
  );
  const setPanelRef = useCallback((i) => panelRefs[i], [panelRefs]);

  const isDesktop = () => window.innerWidth >= DESKTOP_MIN;
  const list = () => panels.current.filter(Boolean);

  const layout = useCallback(() => {
    const items = list();
    items.forEach((p) => { p.style.minHeight = '0'; });
    if (!isDesktop()) {
      items.forEach((p) => { p.style.top = ''; });
      return;
    }
    const tallest = Math.max(...items.map((p) => p.offsetHeight));
    items.forEach((p, i) => {
      p.style.minHeight = `${tallest}px`;
      p.style.top = `${STICKY_TOP + i * PEEK}px`;
    });
  }, []);

  const naturalTop = (i) => {
    const wrap = stackRef.current.firstElementChild;
    const h = panels.current[0].offsetHeight;
    return wrap.getBoundingClientRect().top + window.scrollY + i * (h + GAP);
  };

  const goTo = useCallback((i) => {
    const y = isDesktop()
      ? naturalTop(i) - (STICKY_TOP + i * PEEK) + 1
      : panels.current[i].getBoundingClientRect().top + window.scrollY - 130;
    setActive(i);
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const spy = () => {
      const tabs = tabsRef.current;
      const stack = stackRef.current;
      if (!tabs || !stack) return;
      const st = stack.getBoundingClientRect();
      setStuck(tabs.getBoundingClientRect().top <= 66 && st.bottom > 160);
      if (st.top > 220 || st.bottom < 0) {
        if (st.top > 220) setActive(0);
        return;
      }
      let current = 0;
      list().forEach((p, i) => {
        const y = isDesktop() ? naturalTop(i) - window.scrollY : p.getBoundingClientRect().top;
        if (y <= STICKY_TOP + i * PEEK + 40 + (isDesktop() ? 0 : 40)) current = i;
      });
      setActive(current);
    };
    const refresh = () => { layout(); spy(); };

    refresh();
    window.addEventListener('resize', refresh);
    window.addEventListener('load', refresh);
    window.addEventListener('scroll', spy, { passive: true });
    document.fonts?.ready.then(refresh);

    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const tab = HASH_TO_TAB[a.getAttribute('href')];
      if (tab === undefined) return;
      e.preventDefault();
      goTo(tab);
    };
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('resize', refresh);
      window.removeEventListener('load', refresh);
      window.removeEventListener('scroll', spy);
      document.removeEventListener('click', onClick);
    };
  }, [layout, goTo]);

  return { tabsRef, stackRef, setPanelRef, active, stuck, goTo };
}
