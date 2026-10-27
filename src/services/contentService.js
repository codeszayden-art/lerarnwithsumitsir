import { request } from '@/services/apiClient';

/** GET /api/v1/content -> { centers, rankers, experts, achievers, reviews, faqs } */
export const fetchSiteContent = (signal) => request('/content', { signal, timeout: 6000 });
