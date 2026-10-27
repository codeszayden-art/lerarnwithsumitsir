import { ENV } from './env';

export const SITE = Object.freeze({
  name: 'Learn with Sumit',
  phone: ENV.contactPhone,
  whatsapp: ENV.whatsappNumber,
  campuses: ['Delhi', 'Haryana', 'Pune', 'Lucknow'],
});

/** Link to a section of the main website, e.g. siteUrl('courses') -> "/#courses". */
export const siteUrl = (hash = '') => `${ENV.mainSiteUrl}/${hash ? `#${hash}` : ''}`;
