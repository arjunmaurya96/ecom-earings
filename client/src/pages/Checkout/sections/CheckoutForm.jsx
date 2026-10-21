import { Link } from 'react-router-dom';
import { HiOutlineLockClosed, HiOutlineBanknotes, HiOutlineCreditCard, HiPlus, HiCheck } from 'react-icons/hi2';
import { COD_FEE } from '@/utils/cartTotals';
import { formatPrice } from '@/utils/format';
import { TextField } from '@/components/form/Field';
import AddressFields from '@/components/form/AddressFields';

/** Section card with number */
export function Block({ n, title, action, children }) {
  return (
    <section className="rounded-3xl border border-line bg-white p-5 sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 text-lg">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-sm font-semibold text-white">{n}</span>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

/** 1. Contact */
export function ContactBlock({ form, set, errors, user }) {
  return (
    <Block
      n={1}
      title="Contact details"
      action={
        !user && (
          <Link to="/login" state={{ from: '/checkout' }} className="text-sm font-medium text-primary hover:underline">
            Have an account? Log in
          </Link>
        )
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="co-email" label="Email" type="email" autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="you@example.com" hint="Order updates will be sent here" />
        <TextField id="co-phone" label="Mobile number" inputMode="numeric" autoComplete="tel" value={form.phone} onChange={set('phone')} error={errors.phone} placeholder="98765 43210" hint="For delivery updates on WhatsApp" />
      </div>
    </Block>
  );
}

/** 2. Address – saved addresses (logged in) ya naya form */
export function AddressBlock({ form, set, errors, user, selectedId, setSelectedId, saveNew, setSaveNew, delivery }) {
  const saved = user?.addresses || [];
  const usingSaved = saved.length > 0 && selectedId !== 'new';

  return (
    <Block n={2} title="Delivery address">
      {saved.length > 0 && (
        <div className="mb-5 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Saved addresses">
          {saved.map((a) => {
            const on = selectedId === a.id;
            return (
              <button
                key={a.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setSelectedId(a.id)}
                className={`relative rounded-2xl border-2 p-4 text-left text-sm transition-colors ${on ? 'border-primary bg-blush/40' : 'border-line hover:border-primary/40'}`}
              >
                {on && <HiCheck className="absolute right-3 top-3 text-primary" size={18} />}
                <p className="font-semibold text-ink">
                  {a.fullName} {a.isDefault && <span className="ml-1 rounded-pill bg-ink px-2 py-0.5 text-[10px] font-medium text-white">Default</span>}
                </p>
                <p className="mt-1 text-ink-soft">{a.line1}{a.line2 ? `, ${a.line2}` : ''}</p>
                <p className="text-ink-soft">{a.city}, {a.state} – {a.pincode}</p>
                <p className="mt-1 text-muted">{a.addrPhone}</p>
              </button>
            );
          })}
          <button
            type="button"
            role="radio"
            aria-checked={selectedId === 'new'}
            onClick={() => setSelectedId('new')}
            className={`flex min-h-28 items-center justify-center gap-2 rounded-2xl border-2 border-dashed text-sm font-medium transition-colors ${
              selectedId === 'new' ? 'border-primary bg-blush/40 text-primary' : 'border-line text-ink-soft hover:border-primary/40'
            }`}
          >
            <HiPlus /> Add a new address
          </button>
        </div>
      )}

      {!usingSaved && (
        <>
          <AddressFields form={form} set={set} errors={errors} />
          {user && (
            <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-ink-soft">
              <input id="co-save" type="checkbox" checked={saveNew} onChange={(e) => setSaveNew(e.target.checked)} className="h-5 w-5 accent-[var(--color-primary)]" />
              Save this address for next time
            </label>
          )}
        </>
      )}

      {delivery && (
        <p className="mt-5 rounded-xl bg-success/10 px-4 py-3 text-sm text-success">
          Estimated delivery: <span className="font-semibold">{delivery.label}</span>
        </p>
      )}
    </Block>
  );
}

/** 3. Payment */
export function PaymentBlock({ payment, setPayment }) {
  const options = [
    {
      id: 'online',
      icon: HiOutlineCreditCard,
      title: 'Pay online',
      text: 'UPI, Google Pay, PhonePe, cards, net banking – secured by Razorpay',
    },
    {
      id: 'cod',
      icon: HiOutlineBanknotes,
      title: 'Cash on Delivery',
      text: COD_FEE ? `Pay when your order arrives (+${formatPrice(COD_FEE)})` : 'Pay in cash or UPI when your order arrives',
    },
  ];
  return (
    <Block n={3} title="Payment">
      <div className="grid gap-3" role="radiogroup" aria-label="Payment method">
        {options.map(({ id, icon: Icon, title, text }) => {
          const on = payment === id;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setPayment(id)}
              className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${on ? 'border-primary bg-blush/40' : 'border-line hover:border-primary/40'}`}
            >
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${on ? 'border-primary' : 'border-ink/25'}`}>
                {on && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
              </span>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cream text-primary">
                <Icon size={22} />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold text-ink">{title}</span>
                <span className="block text-sm text-muted">{text}</span>
              </span>
            </button>
          );
        })}
      </div>
      {payment === 'online' && (
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-cream px-4 py-3 text-[13px] text-ink-soft">
          <HiOutlineLockClosed className="mt-0.5 shrink-0 text-gold-dark" />
          Demo: Razorpay will be connected in Step 9. For now the order is saved with payment marked as pending.
        </p>
      )}
    </Block>
  );
}
