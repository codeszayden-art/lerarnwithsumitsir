/** Single place that reads Vite environment variables. */
export const ENV = {
  apiUrl: (import.meta.env.VITE_API_URL || '/api/v1').replace(/\/$/, ''),
  playStoreUrl: import.meta.env.VITE_PLAY_STORE_URL || '#',
  appStoreUrl: import.meta.env.VITE_APP_STORE_URL || '#',
  enablePwa: import.meta.env.PROD && import.meta.env.VITE_ENABLE_PWA !== 'false',
};
