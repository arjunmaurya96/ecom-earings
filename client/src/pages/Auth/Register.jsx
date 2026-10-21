import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { isEmail, isPhone, passwordProblem, passwordStrength } from '@/utils/validate';
import { TextField, PasswordField, SubmitButton } from '@/components/form/Field';
import AuthLayout from './AuthLayout';

const STRENGTH = ['Too weak', 'Weak', 'Okay', 'Good', 'Strong'];
const STRENGTH_COLOR = ['bg-line', 'bg-primary-dark', 'bg-gold', 'bg-success/70', 'bg-success'];

/** /register */
export default function Register() {
  const { register, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const from = useLocation().state?.from || '/account';
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', agree: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) return <Navigate to={from} replace />;

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [k]: k === 'phone' ? v.replace(/\D/g, '').slice(0, 10) : v });
    setErrors({ ...errors, [k]: '', form: '' });
  };

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Enter your full name';
    if (!isEmail(form.email)) next.email = 'Enter a valid email, like name@gmail.com';
    if (!isPhone(form.phone)) next.phone = 'Enter a 10-digit mobile number';
    const pw = passwordProblem(form.password);
    if (pw) next.password = pw;
    if (!form.agree) next.agree = 'Please accept the terms to continue';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    const res = await register(form);
    setLoading(false);
    if (!res.ok) return setErrors({ form: res.message });
    toast.success(`Welcome to Pretty Aura, ${form.name.split(' ')[0]}!`);
    navigate(from, { replace: true });
  };

  const strength = passwordStrength(form.password);

  return (
    <AuthLayout title="Create your account" subtitle="It takes less than a minute.">
      <form onSubmit={submit} noValidate className="space-y-4">
        {errors.form && (
          <p className="rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary-dark" role="alert">
            {errors.form} <Link to="/login" className="font-semibold underline">Log in</Link>
          </p>
        )}
        <TextField id="reg-name" label="Full name" autoComplete="name" value={form.name} onChange={set('name')} error={errors.name} placeholder="Ananya Sharma" />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField id="reg-email" label="Email" type="email" autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="you@example.com" />
          <TextField id="reg-phone" label="Mobile number" inputMode="numeric" autoComplete="tel" value={form.phone} onChange={set('phone')} error={errors.phone} placeholder="98765 43210" />
        </div>
        <div>
          <PasswordField id="reg-password" label="Password" autoComplete="new-password" value={form.password} onChange={set('password')} error={errors.password} hint="At least 8 characters with a letter and a number" />
          {form.password && (
            <div className="mt-2 flex items-center gap-3">
              <div className="flex flex-1 gap-1">
                {[1, 2, 3, 4].map((n) => (
                  <span key={n} className={`h-1.5 flex-1 rounded-full transition-colors ${n <= strength ? STRENGTH_COLOR[strength] : 'bg-line'}`} />
                ))}
              </div>
              <span className="w-16 text-right text-xs text-muted">{STRENGTH[strength]}</span>
            </div>
          )}
        </div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
          <input id="reg-agree" type="checkbox" checked={form.agree} onChange={set('agree')} className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-primary)]" />
          <span>
            I agree to the <Link to="/terms" className="font-medium text-primary hover:underline">Terms</Link> and{' '}
            <Link to="/privacy-policy" className="font-medium text-primary hover:underline">Privacy Policy</Link>
          </span>
        </label>
        {errors.agree && <p className="-mt-2 text-[13px] text-primary-dark">{errors.agree}</p>}
        <SubmitButton loading={loading}>Create account</SubmitButton>
      </form>
      <p className="mt-6 text-center text-[15px] text-muted">
        Already have an account? <Link to="/login" state={{ from }} className="font-semibold text-primary hover:underline">Log in</Link>
      </p>
    </AuthLayout>
  );
}
