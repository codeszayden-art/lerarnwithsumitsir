import { ENV } from '@/config/env';

export const SITE = {
  name: 'Learn with Sumit',
  shortName: 'LWS',
  phone: '9211637514',
  appLinks: { playStore: ENV.playStoreUrl, appStore: ENV.appStoreUrl },
};

/** Campuses rotated in the top-bar pill. */
export const CAMPUSES = ['Delhi', 'Haryana', 'Pune', 'Lucknow'];

/** Exams ticker. */
export const EXAMS = ['NDA', 'CDS', 'AFCAT', 'CAPF', 'SSC CGL', 'CUET', 'RIMC', 'RMS', 'State Police', 'SSB', 'Railway'];

/** Qualities ticker. */
export const QUALITIES = [
  'Build discipline that lasts a lifetime.',
  'Stay focused on your goal every single day.',
  'Practice consistency until it becomes a habit.',
  'Develop a strong competitive spirit.',
  'Lead from the front with confidence.',
  'Grow officer-like qualities in every action.',
  'Work as a team and win together.',
  'Face every challenge with courage.',
  'Take responsibility for your decisions.',
  'Act with honesty and integrity.',
  'Stay calm and think clearly under pressure.',
  'Show initiative without waiting to be told.',
  'Bounce back stronger after every failure.',
  'Communicate your ideas with clarity.',
  'Make quick and practical decisions.',
];