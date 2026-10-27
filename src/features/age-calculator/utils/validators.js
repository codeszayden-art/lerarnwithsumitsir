import { calculateAge, dateFromParts } from './dateUtils.js';

const collapse = (value) => value.replace(/\s+/g, ' ').trim();

export const normalizeName = collapse;

/** Strips spaces/dashes/brackets and an optional +91 / 0 prefix. */
export function normalizePhone(value) {
  return value
    .replace(/[\s\-()]/g, '')
    .replace(/^\+?91(?=\d{10}$)/, '')
    .replace(/^0(?=\d{10}$)/, '');
}

export function validateName(value) {
  const v = collapse(value);
  if (!v) return 'Enter your full name.';
  if (!/^[A-Za-z][A-Za-z .'-]*$/.test(v)) return 'Use letters only. Numbers and symbols are not allowed.';
  if (v.replace(/[^A-Za-z]/g, '').length < 3) return 'Enter at least 3 letters.';
  return '';
}

export function validatePhone(value) {
  const v = normalizePhone(value);
  if (!v) return 'Enter your mobile number.';
  if (!/^\d+$/.test(v)) return 'Use digits only.';
  if (v.length !== 10) return 'Mobile number must be exactly 10 digits.';
  if (!/^[6-9]/.test(v) || /^(\d)\1{9}$/.test(v)) return 'Enter a valid Indian mobile number.';
  return '';
}

export function validateEmail(value) {
  const v = value.trim();
  if (!v) return 'Enter your email address.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter a valid email, like name@example.com.';
  return '';
}

export const validateState = (value) => (value ? '' : 'Select your state.');

export function validateDob({ day, month, year }, today = new Date()) {
  const d = Number(day);
  const m = Number(month);
  const y = Number(year);
  if (!d || !m || !y) return 'Select day, month and year of birth.';

  const birth = dateFromParts(y, m, d);
  if (birth.getDate() !== d) return 'That date does not exist. Check the day and month.';
  if (birth > today) return 'Date of birth cannot be in the future.';

  const age = calculateAge(birth, today).y;
  if (age < 12) return 'This checker is for aspirants aged 12 and above.';
  if (age > 40) return 'Enter a valid date of birth. Maximum age is 40.';
  return '';
}

/** Validate one field by key against the whole values object. */
export function validateField(key, values, today = new Date()) {
  switch (key) {
    case 'name':
      return validateName(values.name);
    case 'phone':
      return validatePhone(values.phone);
    case 'email':
      return validateEmail(values.email);
    case 'state':
      return validateState(values.state);
    case 'dob':
      return validateDob(values, today);
    default:
      return '';
  }
}

/** Order in which errors are checked and the first invalid field is focused. */
export const FIELD_ORDER = ['name', 'phone', 'state', 'email', 'dob'];
