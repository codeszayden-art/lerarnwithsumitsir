import { ENV } from '@/config/env';

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

/** Minimal fetch wrapper: JSON in/out, timeout, Laravel validation errors (422) surfaced as ApiError. */
export async function request(path, { method = 'GET', body, timeout = 10000, signal } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  signal?.addEventListener('abort', () => controller.abort());
  try {
    const res = await fetch(`${ENV.apiUrl}${path}`, {
      method,
      headers: { Accept: 'application/json', ...(body ? { 'Content-Type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new ApiError(data.message || 'Request failed', res.status, data.errors);
    return data;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(err.name === 'AbortError' ? 'The server took too long to respond.' : 'Network error. Please check your connection.', 0);
  } finally {
    clearTimeout(timer);
  }
}
