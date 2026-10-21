import { Link } from 'react-router-dom';
import { HiOutlineLockClosed, HiOutlineShieldCheck } from 'react-icons/hi2';
import { formatPrice } from '@/utils/format';
import { resizeUrl } from '@/utils/image';

function Row({ label, value, className = '' }) {
  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      <dt>{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}

/** Right side: items + price breakup + Place order */
export default function CheckoutSummary({ items, totals, couponCode, codFee, loading, payment }) {
  const total = totals.total + codFee;
  return (
    <div className="rounded-3xl bg-cream p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg">Order summary</h2>
        <Link to="/cart" className="text-sm font-medium text-primary hover:underline">Edit cart</Link>
      </div>

      <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1" data-lenis-prevent>
        {items.map((i) => (
          <li key={i.key} className="flex items-center gap-3">
            <span className="relative shrink-0">
              <img src={resizeUrl(i.image, 120, 150)} alt="" className="h-16 w-13 rounded-xl object-cover" />
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[11px] font-semibold text-white">{i.qty}</span>
            </span>
            <span className="min-w-0 flex-1 text-sm">
              <span className="line-clamp-2 font-medium text-ink">{i.name}</span>
              <span className="text-xs text-muted">{[i.color, i.size && `Size ${i.size}`].filter(Boolean).join(' · ')}</span>
            </span>
            <span className="text-sm font-medium tabular-nums text-ink">{formatPrice(i.price * i.qty)}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-5 space-y-2.5 border-t border-ink/10 pt-4 text-[15px] text-ink-soft">
        <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
        {totals.couponDiscount > 0 && <Row label={`Coupon (${couponCode})`} value={`-${formatPrice(totals.couponDiscount)}`} className="text-success" />}
        {totals.wrap > 0 && <Row label="Gift wrap" value={formatPrice(totals.wrap)} />}
        <Row label="Shipping" value={totals.shipping ? formatPrice(totals.shipping) : <span className="font-medium text-success">Free</span>} />
        {codFee > 0 && <Row label="COD charge" value={formatPrice(codFee)} />}
        <div className="border-t border-dashed border-ink/15 pt-3">
          <Row label={<span className="text-lg font-semibold text-ink">Total</span>} value={<span className="text-xl font-semibold text-ink">{formatPrice(total)}</span>} />
        </div>
      </dl>

      <button
        type="submit"
        form="checkout-form"
        disabled={loading}
        className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-pill bg-primary text-[15px] font-medium text-white shadow-soft transition-colors hover:bg-primary-dark disabled:opacity-70"
      >
        {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : <HiOutlineLockClosed size={18} />}
        {payment === 'cod' ? 'Place order' : 'Pay'} · {formatPrice(total)}
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
        <HiOutlineShieldCheck className="text-success" /> 100% secure checkout
      </p>
      <p className="mt-2 text-center text-xs text-muted">
        By placing the order you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/return-policy" className="underline">Return Policy</Link>.
      </p>
    </div>
  );
}
