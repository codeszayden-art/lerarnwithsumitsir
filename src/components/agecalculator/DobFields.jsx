import { useMemo } from 'react';
// import { MONTH_LABELS } from '..utils/dateUtils';
import { MONTH_LABELS } from '../../features/age-calculator/utils/dateUtils';


const DAYS = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  label: String(i + 1).padStart(2, '0'),
}));
const MONTHS = MONTH_LABELS.map((label, i) => ({ value: i + 1, label }));

/** Aspirants aged roughly 10 to 45 */
function buildYears(currentYear) {
  const years = [];
  for (let y = currentYear - 10; y >= currentYear - 45; y--) years.push({ value: y, label: String(y) });
  return years;
}

function Select({ id, name, placeholder, ariaLabel, options, value, onChange, selectRef }) {
  return (
    <select id={id} name={name} aria-label={ariaLabel} value={value} onChange={onChange} ref={selectRef}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export default function DobFields({ values, onChange, registerRef }) {
  const years = useMemo(() => buildYears(new Date().getFullYear()), []);

  return (
    <div className="a-dob" role="group" aria-labelledby="l-dob">
      <Select
        id="f-d"
        name="day"
        placeholder="Day"
        ariaLabel="Day"
        options={DAYS}
        value={values.day}
        onChange={onChange}
        selectRef={registerRef('day')}
      />
      <Select
        id="f-m"
        name="month"
        placeholder="Month"
        ariaLabel="Month"
        options={MONTHS}
        value={values.month}
        onChange={onChange}
        selectRef={registerRef('month')}
      />
      <Select
        id="f-y"
        name="year"
        placeholder="Year"
        ariaLabel="Year"
        options={years}
        value={values.year}
        onChange={onChange}
        selectRef={registerRef('year')}
      />
    </div>
  );
}
