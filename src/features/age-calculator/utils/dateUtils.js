export const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2 Jan 2007" */
export function formatDate(date) {
  return `${date.getDate()} ${MONTH_LABELS[date.getMonth()]} ${date.getFullYear()}`;
}

/** Completed years / months / days between `birth` and `today`. */
export function calculateAge(birth, today = new Date()) {
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let years = t.getFullYear() - birth.getFullYear();
  let months = t.getMonth() - birth.getMonth();
  let days = t.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(t.getFullYear(), t.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { y: years, m: months, d: days };
}

/** Build a Date from the three select values (month is 1-based here). */
export const dateFromParts = (year, month, day) => new Date(Number(year), Number(month) - 1, Number(day));

/** "2007-03-09" */
export const toIsoDate = (year, month, day) =>
  `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
