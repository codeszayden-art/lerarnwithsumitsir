import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateAge } from './dateUtils.js';
import { evaluateEligibility, joinList, buildResultSummary } from './eligibility.js';
import { validateName, validatePhone, validateEmail, validateDob } from './validators.js';

const TODAY = new Date(2026, 9, 20); // 20 Oct 2026

test('calculateAge handles month/day borrow', () => {
  assert.deepEqual(calculateAge(new Date(2008, 9, 21), TODAY), { y: 17, m: 11, d: 29 });
  assert.deepEqual(calculateAge(new Date(2008, 9, 20), TODAY), { y: 18, m: 0, d: 0 });
});

test('NDA I 2027 window is 2 Jan 2008 to 1 Jan 2011; a 2010 birth is too young for 2026', () => {
  const r = evaluateEligibility(new Date(2010, 5, 15), TODAY);
  const nda = r.groups.find((g) => g.key === 'nda');
  assert.equal(nda.attempts.find((a) => a.name === 'NDA I 2027').eligible, true);
  assert.equal(nda.attempts.find((a) => a.name === 'NDA I 2026').eligible, false);
  assert.ok(r.openKeys.includes('NDA'));
});

test('boundary dates are inclusive', () => {
  const nda26 = (b) =>
    evaluateEligibility(b, TODAY).groups[0].attempts.find((a) => a.name === 'NDA I 2026');
  assert.equal(nda26(new Date(2007, 0, 2)).eligible, true);
  assert.equal(nda26(new Date(2010, 0, 1)).eligible, true);
  assert.equal(nda26(new Date(2007, 0, 1)).label, 'Over age');
  assert.equal(nda26(new Date(2010, 0, 2)).label, 'Under age');
});

test('AFCAT names and windows', () => {
  const afcat = evaluateEligibility(new Date(2004, 5, 1), TODAY).groups.find((g) => g.key === 'afcat');
  assert.equal(afcat.attempts.length, 9);
  assert.equal(afcat.attempts[0].name, 'AFCAT 2026 - Flying');
  assert.equal(afcat.attempts[0].eligible, true);
});

test('chip index is sequential across groups', () => {
  const r = evaluateEligibility(new Date(2002, 5, 1), TODAY);
  const all = r.groups.flatMap((g) => g.attempts.map((a) => a.index));
  assert.deepEqual(all, all.map((_, i) => i));
});

test('joinList / summary text', () => {
  assert.equal(joinList(['NDA']), 'NDA');
  assert.equal(joinList(['NDA', 'CDS']), 'NDA and CDS');
  assert.equal(joinList(['NDA', 'CDS', 'AFCAT']), 'NDA, CDS and AFCAT');
  assert.match(buildResultSummary('Aman', []).heading, /no attempt is open/);
});

test('validators', () => {
  assert.notEqual(validateName(''), '');
  assert.notEqual(validateName('A1'), '');
  assert.equal(validateName('Aman Kumar'), '');
  assert.equal(validatePhone('+91 98765 43210'), '');
  assert.notEqual(validatePhone('5876543210'), '');
  assert.notEqual(validatePhone('9999999999'), '');
  assert.notEqual(validateEmail('a@b'), '');
  assert.equal(validateEmail('a@b.in'), '');
  assert.equal(validateDob({ day: 15, month: 6, year: 2009 }, TODAY), '');
  assert.match(validateDob({ day: 31, month: 2, year: 2009 }, TODAY), /does not exist/);
  assert.match(validateDob({ day: 1, month: 1, year: 2020 }, TODAY), /12 and above/);
  assert.match(validateDob({ day: 1, month: 1, year: 1970 }, TODAY), /Maximum age/);
});
