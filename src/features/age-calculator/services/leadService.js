import { ENV } from '@/config/env';

/**
 * Sends the lead to the backend (e.g. Laravel `POST /api/v1/enquiries`).
 * Fire-and-forget: the aspirant still sees the result if the request fails.
 */
export async function submitLead(lead) {
  if (!ENV.leadEndpoint) return;
  try {
    await fetch(ENV.leadEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(lead),
    });
  } catch {
    /* intentionally ignored */
  }
}
