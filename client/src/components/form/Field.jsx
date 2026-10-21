import { forwardRef, useState } from 'react';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

/**
 * FORM FIELDS – Login, Register, Checkout, Account, Contact sab mein yahi.
 * label, error, hint ke saath. Error ho to laal border + message.
 */
const base =
  'w-full rounded-xl border bg-white px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted disabled:bg-cream disabled:text-muted';
const state = (error) => (error ? 'border-primary-dark focus:border-primary-dark' : 'border-line focus:border-primary');

function Wrap({ id, label, error, hint, optional, children, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-ink">
          {label}
          {optional && <span className="text-xs font-normal text-muted">Optional</span>}
        </label>
      )}
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-primary-dark" role="alert">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-[13px] text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export const TextField = forwardRef(function TextField({ id, label, error, hint, optional, className, ...rest }, ref) {
  return (
    <Wrap id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${base} h-12 ${state(error)}`}
        {...rest}
      />
    </Wrap>
  );
});

export function PasswordField({ id, label, error, hint, className, ...rest }) {
  const [show, setShow] = useState(false);
  return (
    <Wrap id={id} label={label} error={error} hint={hint} className={className}>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${base} h-12 pr-12 ${state(error)}`}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-muted hover:text-ink"
        >
          {show ? <HiOutlineEyeSlash size={19} /> : <HiOutlineEye size={19} />}
        </button>
      </div>
    </Wrap>
  );
}

export function SelectField({ id, label, error, hint, options, placeholder, className, ...rest }) {
  return (
    <Wrap id={id} label={label} error={error} hint={hint} className={className}>
      <select id={id} aria-invalid={!!error} className={`${base} h-12 pr-8 ${state(error)}`} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </Wrap>
  );
}

export function TextArea({ id, label, error, hint, optional, className, ...rest }) {
  return (
    <Wrap id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <textarea id={id} aria-invalid={!!error} className={`${base} resize-none py-3 ${state(error)}`} {...rest} />
    </Wrap>
  );
}

/** Pink submit button with loading spinner */
export function SubmitButton({ loading, children, className = '', ...rest }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`flex h-12 w-full items-center justify-center gap-2 rounded-pill bg-primary text-[15px] font-medium text-white shadow-soft transition-colors hover:bg-primary-dark disabled:opacity-70 ${className}`}
      {...rest}
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
      {children}
    </button>
  );
}
