/**
 * Wrapper for one form control: label, control and an accessible error message.
 * `state` is `{ error, status }` where status is '' | 'good' | 'bad'.
 */
export default function FormField({ fieldKey, label, htmlFor, labelId, wide, state, children }) {
  const status = state?.status ?? '';
  const classes = ['a-f', wide ? 'w' : '', status].filter(Boolean).join(' ');

  return (
    <div className={classes} data-f={fieldKey}>
      <label id={labelId} htmlFor={htmlFor}>
        {label} <i>*</i>
      </label>
      {children}
      <small className="a-err" id={`e-${fieldKey}`} role="alert">
        {state?.error ?? ''}
      </small>
    </div>
  );
}
