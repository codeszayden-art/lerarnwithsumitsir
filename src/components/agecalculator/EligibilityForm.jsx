import FormField from './FormField';
import DobFields from './DobFields';
import { INDIAN_STATES } from '../../features/age-calculator/data/indianStates';
import { PAGE_CONTENT } from '../../features/age-calculator/data/content';

export default function EligibilityForm({ form }) {
  const { values, fields, scanning, shaking, registerRef, handleChange, handleBlur, handleSubmit, onShakeEnd } =
    form;

  return (
    <form
      className={`a-card${shaking ? ' shake' : ''}`}
      id="form"
      noValidate
      autoComplete="on"
      onSubmit={handleSubmit}
      onAnimationEnd={(e) => e.target === e.currentTarget && onShakeEnd()}
    >
      <div className="a-head">
        <h2>{PAGE_CONTENT.card.title}</h2>
        <p>{PAGE_CONTENT.card.subtitle}</p>
      </div>

      <div className="a-form">
        <FormField fieldKey="name" label="Full name" htmlFor="f-name" wide state={fields.name}>
          <input
            id="f-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="As on your Class 10 certificate"
            maxLength={60}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={registerRef('name')}
          />
        </FormField>

        <FormField fieldKey="phone" label="Mobile number" htmlFor="f-phone" state={fields.phone}>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="10-digit number"
            maxLength={16}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={registerRef('phone')}
          />
        </FormField>

        <FormField fieldKey="state" label="State" htmlFor="f-state" state={fields.state}>
          <select
            id="f-state"
            name="state"
            autoComplete="address-level1"
            value={values.state}
            onChange={handleChange}
            ref={registerRef('state')}
          >
            <option value="">Select your state</option>
            {INDIAN_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </FormField>

        <FormField fieldKey="email" label="Email address" htmlFor="f-email" wide state={fields.email}>
          <input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={100}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={registerRef('email')}
          />
        </FormField>

        <FormField fieldKey="dob" label="Date of birth" labelId="l-dob" wide state={fields.dob}>
          <DobFields values={values} onChange={handleChange} registerRef={registerRef} />
        </FormField>

        <button className={`a-go${scanning ? ' load' : ''}`} id="go" type="submit" disabled={scanning}>
          <span className="sp" />
          <span id="go-t">{scanning ? 'Scanning your attempts...' : 'Check my eligibility'}</span>
        </button>
        <p className="a-trust">{PAGE_CONTENT.card.consent}</p>
      </div>
    </form>
  );
}
