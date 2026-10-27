import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ACHIEVERS } from '@/data/achievers';
import { CENTERS } from '@/data/centers';
import { EXPERTS } from '@/data/experts';
import { FAQS } from '@/data/faqs';
import { RANKERS } from '@/data/rankers';
import { REVIEWS } from '@/data/reviews';
import { fetchSiteContent } from '@/services/contentService';

const DEFAULTS = { centers: CENTERS, rankers: RANKERS, experts: EXPERTS, achievers: ACHIEVERS, reviews: REVIEWS, faqs: FAQS };
const ContentContext = createContext(DEFAULTS);

/**
 * Serves page content. The site renders immediately from the bundled defaults and
 * silently upgrades to the Laravel API data (per collection) when it is reachable.
 * Centers always keep their bundled map pins / images; the API supplies the text.
 */
export function ContentProvider({ children }) {
  const [remote, setRemote] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    fetchSiteContent(controller.signal)
      .then(({ data }) => setRemote(data || {}))
      .catch(() => { }); // offline or API down: keep the defaults
    return () => controller.abort();
  }, []);

  const value = useMemo(() => {
    const pick = (key) => (Array.isArray(remote[key]) && remote[key].length ? remote[key] : DEFAULTS[key]);
    const centers = pick('centers') === DEFAULTS.centers ? CENTERS : mergeCenters(remote.centers);
    return { ...DEFAULTS, rankers: pick('rankers'), experts: pick('experts'), achievers: pick('achievers'), reviews: pick('reviews'), faqs: pick('faqs'), centers };
  }, [remote]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

const mergeCenters = (list) =>
  CENTERS.map((base) => {
    const api = list.find((c) => c.id === base.id);
    return api ? { ...base, name: api.name ?? base.name, address: api.address ?? base.address, phones: api.phones ?? base.phones } : base;
  });

export const useContent = () => useContext(ContentContext);
