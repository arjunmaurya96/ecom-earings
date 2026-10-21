import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { isEmail } from '@/utils/validate';
import { TextField, PasswordField, SubmitButton } from '@/components/form/Field';
import AuthLayout from './AuthLayout';

/** /login – login ke baad wapas usi page pe jahan se aaye the */
export default function Login() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/account';
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) return <Navigate to={from} replace />;

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    setErrors({ ...errors, [k]: '', form: '' });
  };

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!isEmail(form.email)) next.email = 'Enter a valid email, like name@gmail.com';
    if (!form.password) next.password = 'Enter your password';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    const res = await login(form.email, form.password);
    setLoading(false);
    if (!res.ok) return setErrors({ form: res.message });
    toast.success('Welcome back!');
    navigate(from, { replace: true });
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to track orders and check out faster.">
      <form onSubmit={submit} noValidate className="space-y-4">
        {errors.form && <p className="rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary-dark" role="alert">{errors.form}</p>}
        <TextField id="login-email" label="Email" type="email" autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="you@example.com" />
        <PasswordField id="login-password" label="Password" autoComplete="current-password" value={form.password} onChange={set('password')} error={errors.password} placeholder="Your password" />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">Forgot password?</Link>
        </div>
        <SubmitButton loading={loading}>Log in</SubmitButton>
      </form>
      <p className="mt-6 text-center text-[15px] text-muted">
        New to Pretty Aura?{' '}
        <Link to="/register" state={{ from }} className="font-semibold text-primary hover:underline">Create an account</Link>
      </p>
    </AuthLayout>
  );
}
