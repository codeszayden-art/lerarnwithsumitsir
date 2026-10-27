import { ENV } from '@/config/env';

/** Registers the service worker (production only) so the site opens offline like an installed app. */
export function registerServiceWorker() {
  if (!ENV.enablePwa || !('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => console.warn('SW registration failed', err));
  });
}
