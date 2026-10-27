import { useEffect } from 'react';

const BASE = 'Learn with Sumit (LWS)';

/** Sets document.title for a route and restores the default on unmount. */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : BASE;
    return () => { document.title = 'Learn with Sumit (LWS) | NDA, CDS & AFCAT Coaching'; };
  }, [title]);
}
