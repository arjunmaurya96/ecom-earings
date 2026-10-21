import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiPlus, HiOutlinePencilSquare, HiOutlineTrash, HiOutlineMapPin } from 'react-icons/hi2';
import { useAuth } from '@/context/AuthContext';
import { isPhone, isPincode } from '@/utils/validate';
import AddressFields from '@/components/form/AddressFields';
import { SubmitButton } from '@/components/form/Field';

const EMPTY = { fullName: '', addrPhone: '', line1: '', line2: '', pincode: '', city: '', state: '', isDefault: false };

/** Saved addresses – add / edit / delete / default */
export default function AccountAddresses({ user }) {
  const { saveAddress, deleteAddress } = useAuth();
  const [editing, setEditing] = useState(null); // null | 'new' | address
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [confirmId, setConfirmId] = useState(null);
  const list = user.addresses || [];

  const open = (a) => {
    setEditing(a || 'new');
    setForm(a ? { ...EMPTY, ...a } : { ...EMPTY, fullName: user.name, addrPhone: user.phone });
    setErrors({});
  };

  const set = (k) => (e) => {
    let v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    if (k === 'addrPhone') v = v.replace(/\D/g, '').slice(0, 10);
    if (k === 'pincode') v = v.replace(/\D/g, '').slice(0, 6);
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: '' }));
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (form.fullName.trim().length < 2) e.fullName = 'Enter the receiver’s name';
    if (!isPhone(form.addrPhone)) e.addrPhone = 'Enter a 10-digit mobile number';
    if (form.line1.trim().length < 5) e.line1 = 'Enter house number and street';
    if (!isPincode(form.pincode)) e.pincode = 'Enter a valid 6-digit pincode';
    if (!form.city.trim()) e.city = 'Enter your city';
    if (!form.state) e.state = 'Select your state';
    setErrors(e);
    if (Object.keys(e).length) return;
    saveAddress(form);
    toast.success(editing === 'new' ? 'Address added' : 'Address updated');
    setEditing(null);
  };

  if (editing) {
    return (
      <form onSubmit={submit} noValidate className="rounded-3xl border border-line bg-white p-5 sm:p-7">
        <h2 className="mb-5 text-xl">{editing === 'new' ? 'Add a new address' : 'Edit address'}</h2>
        <AddressFields form={form} set={set} errors={errors} prefix="acc" />
        <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-ink-soft">
          <input id="acc-default" type="checkbox" checked={!!form.isDefault} onChange={set('isDefault')} className="h-5 w-5 accent-[var(--color-primary)]" />
          Make this my default address
        </label>
        <div className="mt-6 flex flex-wrap gap-3">
          <SubmitButton className="!w-auto px-8">Save address</SubmitButton>
          <button type="button" onClick={() => setEditing(null)} className="h-12 rounded-pill border border-line px-6 text-[15px] font-medium text-ink">
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {list.map((a) => (
        <div key={a.id} className={`relative rounded-2xl border-2 bg-white p-5 ${a.isDefault ? 'border-primary' : 'border-line'}`}>
          {a.isDefault && <span className="absolute right-4 top-4 rounded-pill bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-white">Default</span>}
          <HiOutlineMapPin className="text-primary" size={22} />
          <p className="mt-2 font-semibold text-ink">{a.fullName}</p>
          <p className="mt-1 text-sm text-ink-soft">{a.line1}{a.line2 ? `, ${a.line2}` : ''}</p>
          <p className="text-sm text-ink-soft">{a.city}, {a.state} – {a.pincode}</p>
          <p className="mt-1 text-sm text-muted">{a.addrPhone}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3 text-sm">
            <button type="button" onClick={() => open(a)} className="inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-ink hover:bg-blush">
              <HiOutlinePencilSquare /> Edit
            </button>
            {!a.isDefault && (
              <button type="button" onClick={() => saveAddress({ ...a, isDefault: true })} className="rounded-pill px-3 py-1.5 text-ink hover:bg-blush">
                Set as default
              </button>
            )}
            {confirmId === a.id ? (
              <span className="ml-auto flex items-center gap-2">
                <button type="button" onClick={() => { deleteAddress(a.id); setConfirmId(null); }} className="font-semibold text-primary">Delete</button>
                <button type="button" onClick={() => setConfirmId(null)} className="text-muted">Keep</button>
              </span>
            ) : (
              <button type="button" onClick={() => setConfirmId(a.id)} aria-label="Delete address" className="ml-auto grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-blush hover:text-primary">
                <HiOutlineTrash />
              </button>
            )}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => open(null)}
        className="flex min-h-48 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line text-ink-soft transition-colors hover:border-primary hover:text-primary"
      >
        <HiPlus size={24} />
        <span className="font-medium">Add a new address</span>
      </button>
    </div>
  );
}
