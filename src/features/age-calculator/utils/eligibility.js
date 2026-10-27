import { EXAM_RULES } from '../data/examRules.js';
import { calculateAge, formatDate } from './dateUtils.js';

/** Expand one rule into its list of attempts with the born-between window. */
export function buildAttempts(rule) {
  const attempts = [];
  rule.years.forEach((year) => {
    rule.variants.forEach((variant) => {
      attempts.push({
        name: rule.nameFormat
          .replace('{exam}', rule.label)
          .replace('{variant}', variant.label)
          .replace('{year}', String(year)),
        start: new Date(year - variant.startAge, variant.month, 2),
        end: new Date(year - variant.endAge, variant.month, 1),
      });
    });
  });
  return attempts;
}

export function attemptStatus(birth, attempt) {
  if (birth >= attempt.start && birth <= attempt.end) return { eligible: true, label: 'Eligible' };
  return { eligible: false, label: birth < attempt.start ? 'Over age' : 'Under age' };
}

/**
 * Check a date of birth against every exam.
 * Returns the age, per-exam groups and the list of exam keys that are open.
 */
export function evaluateEligibility(birth, today = new Date(), rules = EXAM_RULES) {
  let chipIndex = 0;

  const groups = rules.map((rule) => {
    const attempts = buildAttempts(rule).map((attempt) => ({
      ...attempt,
      ...attemptStatus(birth, attempt),
      startLabel: formatDate(attempt.start),
      endLabel: formatDate(attempt.end),
      index: chipIndex++,
    }));
    const openCount = attempts.filter((a) => a.eligible).length;
    return {
      key: rule.key,
      title: rule.title,
      attempts,
      openCount,
      percent: Math.round((openCount / attempts.length) * 100),
    };
  });

  return {
    age: calculateAge(birth, today),
    groups,
    openKeys: groups.filter((g) => g.openCount > 0).map((g) => g.key.toUpperCase()),
  };
}

/** ["NDA"] -> "NDA", ["NDA","CDS"] -> "NDA and CDS", three -> "NDA, CDS and AFCAT" */
export function joinList(items) {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

export function buildResultSummary(firstName, openKeys) {
  if (!openKeys.length) {
    return {
      heading: `Hello ${firstName}, no attempt is open for this date of birth.`,
      subheading: 'Talk to a mentor to plan the next best route for your profile.',
    };
  }
  return {
    heading: `Hello ${firstName}, you can apply for ${joinList(openKeys)}.`,
    subheading: 'Every window that fits your age is marked below.',
  };
}

export function buildWhatsappLink({ number, lead, birth, age, groups }) {
  const open = groups.filter((g) => g.openCount > 0).map((g) => `${g.key.toUpperCase()} (${g.openCount})`);
  const text =
    `Hello LWS, I am ${lead.name} from ${lead.state}. DOB: ${formatDate(birth)} ` +
    `(age ${age.y}y ${age.m}m). I checked eligibility on your website. ` +
    `Open for: ${open.join(', ') || 'none'}. Please guide me.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
