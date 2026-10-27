import { useState } from 'react';
import { submitEnquiry } from '@/services/enquiryService';

const INITIAL = { name: '', mobile: '', email: '', program: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const SUCCESS = 'Thank you! Our team will call you soon.';

export const normalizeMobile = (v) => v.replace(/\D/g, '').slice(-10);

export function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!MOBILE_RE.test(normalizeMobile(values.mobile))) errors.mobile = 'Enter a valid 10-digit mobile number.';
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!values.program) errors.program = 'Please select a program.';
  return errors;
}

/** State machine for the enquiry form: idle -> submitting -> success | error. */
export function useEnquiryForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
    if (status !== 'submitting') setStatus('idle');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('submitting');
    try {
      await submitEnquiry({
        name: values.name.trim(),
        mobile: normalizeMobile(values.mobile),
        email: values.email.trim(),
        program: values.program,
        source: 'website-home',
      });
      setValues(INITIAL);
      setMessage(SUCCESS);
      setStatus('success');
    } catch (err) {
      if (err.status === 422 && err.errors) setErrors(Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v[0]])));
      setMessage(err.message || 'Something went wrong. Please call us or try again.');
      setStatus('error');
    }
  };

  return { values, errors, status, message, onChange, onSubmit };
}
