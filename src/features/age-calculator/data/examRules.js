/**
 * Age-window rules per exam.
 *
 * An aspirant is eligible for an attempt when born between
 *   start = (year - startAge) / month / 2     and     end = (year - endAge) / month / 1
 * `month` is zero-based (0 = January, 6 = July).
 *
 * EDIT THIS FILE when UPSC / IAF publish new notifications (add years, change ages).
 */
export const EXAM_RULES = [
  {
    key: 'nda',
    title: 'NDA exam eligibility',
    years: [2026, 2027, 2028],
    nameFormat: '{exam} {variant} {year}',
    label: 'NDA',
    variants: [
      { label: 'I', month: 0, startAge: 19, endAge: 16 },
      { label: 'II', month: 6, startAge: 19, endAge: 16 },
    ],
  },
  {
    key: 'cds',
    title: 'CDS exam eligibility',
    years: [2026],
    nameFormat: '{exam} {variant} {year}',
    label: 'CDS',
    variants: [
      { label: 'I', month: 0, startAge: 24, endAge: 18 },
      { label: 'II', month: 6, startAge: 24, endAge: 18 },
    ],
  },
  {
    key: 'afcat',
    title: 'AFCAT exam eligibility',
    years: [2026, 2027, 2028],
    nameFormat: '{exam} {year} - {variant}',
    label: 'AFCAT',
    variants: [
      { label: 'Flying', month: 0, startAge: 23, endAge: 19 },
      { label: 'CPL holder', month: 0, startAge: 25, endAge: 19 },
      { label: 'Ground duty', month: 0, startAge: 25, endAge: 19 },
    ],
  },
];
