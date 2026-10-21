import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { isPhone, passwordProblem } from '@/utils/validate';
import { TextField, PasswordField, SubmitButton } from '@/components/form/Field';

/** Profile details + password change */
export default function AccountProfile({ user }) {
  const { updateProfile, changePassword } = useAuth();
  const [p, setP] = useState({ name: user.name, phone: user.phone });
  const [pErr, setPErr] = useState({});
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [pwErr, setPwErr] = useState({});
  const [saving, setSaving] = useState(false);

  const saveProfile = (e) => {
    e.preventDefault();
    const er = {};
    if (p.name.trim().length < 2) er.name = 'Enter your full name';
    if (!isPhone(p.phone)) er.phone = 'Enter a 10-digit mobile number';
    setPErr(er);
    if (Object.keys(er).length) return;
    updateProfile(p);
    toast.success('Profile updated');
  };

  const savePassword = async (e) => {
    e.preventDefault();
    const er = {};
    if (!pw.current) er.current = 'Enter your current password';
    const prob = passwordProblem(pw.next);
    if (prob) er.next = prob;
    if (pw.next !== pw.confirm) er.confirm = 'Passwords do not match';
    setPwErr(er);
    if (Object.keys(er).length) return;
    setSaving(true);
    const res = await changePassword(pw.current, pw.next);
    setSaving(false);
    if (!res.ok) return setPwErr({ current: res.message });
    setPw({ current: '', next: '', confirm: '' });
    toast.success('Password changed');
  };

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <form onSubmit={saveProfile} noValidate className="rounded-3xl border border-line bg-white p-5 sm:p-7">
        <h2 className="text-xl">Personal details</h2>
        <div className="mt-5 space-y-4">
          <TextField id="pr-name" label="Full name" value={p.name} onChange={(e) => { setP({ ...p, name: e.target.value }); setPErr({}); }} error={pErr.name} />
          <TextField id="pr-email" label="Email" value={user.email} disabled hint="Email cannot be changed" />
          <TextField id="pr-phone" label="Mobile number" inputMode="numeric" value={p.phone} onChange={(e) => { setP({ ...p, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }); setPErr({}); }} error={pErr.phone} />
          <SubmitButton className="!w-auto px-8">Save changes</SubmitButton>
        </div>
      </form>

      <form onSubmit={savePassword} noValidate className="rounded-3xl border border-line bg-white p-5 sm:p-7">
        <h2 className="text-xl">Change password</h2>
        <div className="mt-5 space-y-4">
          <PasswordField id="pw-current" label="Current password" autoComplete="current-password" value={pw.current} onChange={(e) => { setPw({ ...pw, current: e.target.value }); setPwErr({}); }} error={pwErr.current} />
          <PasswordField id="pw-next" label="New password" autoComplete="new-password" value={pw.next} onChange={(e) => { setPw({ ...pw, next: e.target.value }); setPwErr({}); }} error={pwErr.next} hint="At least 8 characters with a letter and a number" />
          <PasswordField id="pw-confirm" label="Confirm new password" autoComplete="new-password" value={pw.confirm} onChange={(e) => { setPw({ ...pw, confirm: e.target.value }); setPwErr({}); }} error={pwErr.confirm} />
          <SubmitButton loading={saving} className="!w-auto px-8">Update password</SubmitButton>
        </div>
      </form>
    </div>
  );
}
