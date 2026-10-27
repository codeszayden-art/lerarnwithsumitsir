import { request } from '@/services/apiClient';

/** POST /api/v1/enquiries */
export const submitEnquiry = (payload) => request('/enquiries', { method: 'POST', body: payload });
