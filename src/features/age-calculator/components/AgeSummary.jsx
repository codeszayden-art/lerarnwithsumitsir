import { useCountUp } from '../hooks/useCountUp';

function AgeStat({ value, unit }) {
  const shown = useCountUp(value);
  return (
    <div>
      <b>{shown}</b>
      <span>{unit}</span>
    </div>
  );
}

export default function AgeSummary({ age }) {
  return (
    <div className="a-age" id="r-age">
      <AgeStat value={age.y} unit="years" />
      <AgeStat value={age.m} unit="months" />
      <AgeStat value={age.d} unit="days" />
    </div>
  );
}
