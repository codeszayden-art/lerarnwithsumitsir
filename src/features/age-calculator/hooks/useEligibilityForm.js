import { useCallback, useEffect, useRef, useState } from 'react';
import { submitLead } from '../services/leadService';
import { evaluateEligibility } from '../utils/eligibility';
import { dateFromParts, toIsoDate } from '../utils/dateUtils';
import { FIELD_ORDER, normalizeName, validateField } from '../utils/validators';

const INITIAL_VALUES = { name: '', phone: '', state: '', email: '', day: '', month: '', year: '' };
const TEXT_FIELDS = ['name', 'phone', 'email'];
const DOB_FIELDS = ['day', 'month', 'year'];
const SCAN_DELAY_MS = 1500;

/**
 * Owns all form state: values, per-field validation, shake animation,
 * the "scanning" delay and the final eligibility result.
 */
export function useEligibilityForm({ onResult }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [fields, setFields] = useState({});
  const [scanning, setScanning] = useState(false);
  const [shaking, setShaking] = useState(false);
  const refs = useRef({});
  const scanTimer = useRef();

  useEffect(() => () => clearTimeout(scanTimer.current), []);

  const registerRef = useCallback(
    (key) => (el) => {
      refs.current[key] = el;
    },
    [],
  );

  const validate = (key, nextValues) => {
    const error = validateField(key, nextValues, new Date());
    setFields((prev) => ({
      ...prev,
      [key]: { error, status: error ? 'bad' : key !== 'dob' ? 'good' : '' },
    }));
    return !error;
  };

  const handleChange = (event) => {
    const { name } = event.target;
    let { value } = event.target;
    if (name === 'phone') value = value.replace(/[^\d+\s-]/g, '');

    const next = { ...values, [name]: value };
    setValues(next);

    if (TEXT_FIELDS.includes(name)) {
      if (fields[name]?.status === 'bad') validate(name, next);
    } else if (name === 'state') {
      validate('state', next);
    } else if (DOB_FIELDS.includes(name)) {
      const complete = next.day && next.month && next.year;
      if (complete || fields.dob?.status === 'bad') validate('dob', next);
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    if (TEXT_FIELDS.includes(name)) validate(name, values);
  };

  const triggerShake = () => {
    setShaking(false);
    requestAnimationFrame(() => setShaking(true));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (scanning) return;

    let firstInvalid = null;
    FIELD_ORDER.forEach((key) => {
      if (!validate(key, values) && !firstInvalid) firstInvalid = key;
    });

    if (firstInvalid) {
      triggerShake();
      refs.current[firstInvalid === 'dob' ? 'day' : firstInvalid]?.focus();
      return;
    }

    setScanning(true);
    const lead = {
      name: normalizeName(values.name),
      phone: values.phone.replace(/\D/g, '').slice(-10),
      email: values.email.trim(),
      state: values.state,
      dob: toIsoDate(values.year, values.month, values.day),
      page: window.location.href,
    };
    submitLead(lead);

    scanTimer.current = setTimeout(() => {
      try {
        const birth = dateFromParts(values.year, values.month, values.day);
        onResult({ id: Date.now(), lead, birth, ...evaluateEligibility(birth, new Date()) });
      } catch (error) {
        console.error(error);
        window.alert('Something went wrong. Please try again.');
      }
      setScanning(false);
    }, SCAN_DELAY_MS);
  };

  return {
    values,
    fields,
    scanning,
    shaking,
    registerRef,
    focusName: () => refs.current.name?.focus({ preventScroll: true }),
    onShakeEnd: () => setShaking(false),
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
