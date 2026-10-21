import { INDIAN_STATES } from '@/data/indianStates';
import { TextField, SelectField } from './Field';

/** Address form – Checkout aur My Account dono mein */
export default function AddressFields({ form, set, errors, prefix = 'co' }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextField id={`${prefix}-name`} label="Full name" autoComplete="name" value={form.fullName} onChange={set('fullName')} error={errors.fullName} placeholder="Receiver’s name" />
      <TextField id={`${prefix}-aphone`} label="Phone" inputMode="numeric" autoComplete="tel" value={form.addrPhone} onChange={set('addrPhone')} error={errors.addrPhone} placeholder="Receiver’s mobile" />
      <TextField id={`${prefix}-line1`} label="House no., building, street" autoComplete="address-line1" value={form.line1} onChange={set('line1')} error={errors.line1} className="sm:col-span-2" placeholder="Flat 12, Rose Apartments, MG Road" />
      <TextField id={`${prefix}-line2`} label="Area, landmark" optional autoComplete="address-line2" value={form.line2} onChange={set('line2')} className="sm:col-span-2" placeholder="Near City Mall" />
      <TextField id={`${prefix}-pin`} label="Pincode" inputMode="numeric" autoComplete="postal-code" value={form.pincode} onChange={set('pincode')} error={errors.pincode} placeholder="302001" />
      <TextField id={`${prefix}-city`} label="City" autoComplete="address-level2" value={form.city} onChange={set('city')} error={errors.city} placeholder="Jaipur" />
      <SelectField id={`${prefix}-state`} label="State" value={form.state} onChange={set('state')} error={errors.state} options={INDIAN_STATES} placeholder="Select state" className="sm:col-span-2" />
    </div>
  );
}

