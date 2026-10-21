import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineEnvelopeOpen } from 'react-icons/hi2';
import { useAuth } from '@/context/AuthContext';
import { isEmail } from '@/utils/validate';
import { TextField, SubmitButton } from '@/components/form/Field';
import AuthLayout from './AuthLayout';

/** /forgot-password – Step 8 mein asli reset email jaayega */
export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) return setError('Enter a valid email, like name@gmail.com');
    setLoading(true);
    await forgotPassword(email);
    setLoading(false);
    setSent(true);
  };

  return (
    <AuthLayout title="Forgot your password?" subtitle="Enter your email and we will send you a link to reset it." metaTitle="Reset password">
      {sent ? (
        <div className="rounded-2xl bg-cream p-6 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-primary shadow-card">
            <HiOutlineEnvelopeOpen size={26} />
          </span>
          <h2 className="mt-4 text-xl">Check your inbox</h2>
          <p className="mt-2 text-sm text-muted">
            If an account exists for <span className="font-medium text-ink">{email}</span>, you will get a reset link in a few minutes. Check your spam folder too.
          </p>
          <Link to="/login" className="mt-5 inline-block text-sm font-semibold text-primary hover:underline">Back to log in</Link>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="space-y-4">
          <TextField
            id="forgot-email"
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            error={error}
            placeholder="you@example.com"
          />
          <SubmitButton loading={loading}>Send reset link</SubmitButton>
          <p className="text-center text-[15px] text-muted">
            Remembered it? <Link to="/login" className="font-semibold text-primary hover:underline">Log in</Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
