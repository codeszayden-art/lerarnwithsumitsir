const CDN = 'https://learnwithsumit.in/wp-content/uploads/2026/03/';

/** Champion photos (73 files on the CDN, minus the four numbers that were never published). */
export const CHAMPION_PHOTOS = Array.from({ length: 73 }, (_, k) => k + 1)
  .filter((n) => ![40, 67, 68, 72].includes(n))
  .map((n) => `${CDN}${n}.webp`);
