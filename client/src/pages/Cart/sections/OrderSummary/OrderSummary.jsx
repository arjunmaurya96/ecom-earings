import { useNavigate } from 'react-router-dom';
import { HiOutlineLockClosed } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/format';
import { whatsappLink, cartOrderMessage } from '@/utils/whatsapp';
import { CouponBox, GiftOptions } from '../CartExtras/CartExtras';

function Row({ label, value, className = '' }) {
  return (
    <div className={`flex items-center justify-between gap-4 text-[15px] ${className}`}>
      <dt>{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}

/** Right side: coupon, gift wrap, price breakup, checkout */
export default function OrderSummary() {
  const { items, totals, couponCode, giftWrap, giftMessage } = useCart();
  const navigate = useNavigate();
  const t = totals;

  return (
    <div className="space-y-4">
      <CouponBox />
      <GiftOptions />

      <div className="rounded-3xl bg-cream p-5 sm:p-6">
        <h2 className="text-lg">Order summary</h2>
        <dl className="mt-4 space-y-3 text-ink-soft">
          <Row label={`Items (${t.count})`} value={formatPrice(t.mrpTotal)} />
          {t.productSavings > 0 && <Row label="Discount on MRP" value={`-${formatPrice(t.productSavings)}`} className="text-success" />}
          {t.couponDiscount > 0 && <Row label={`Coupon (${couponCode})`} value={`-${formatPrice(t.couponDiscount)}`} className="text-success" />}
          {t.wrap > 0 && <Row label="Gift wrap" value={formatPrice(t.wrap)} />}
          <Row label="Shipping" value={t.shipping ? formatPrice(t.shipping) : <span className="font-medium text-success">Free</span>} />
          <div className="border-t border-dashed border-ink/15 pt-3">
            <Row label={<span className="text-lg font-semibold text-ink">Total</span>} value={<span className="text-xl font-semibold text-ink">{formatPrice(t.total)}</span>} />
            <p className="mt-1 text-xs text-muted">Inclusive of all taxes</p>
          </div>
        </dl>

        {t.totalSavings > 0 && (
          <p className="mt-4 rounded-xl bg-success/10 px-3.5 py-2.5 text-center text-sm font-medium text-success">
            You save {formatPrice(t.totalSavings)} on this order 🎉
          </p>
        )}

        <button
          type="button"
          onClick={() => navigate('/checkout')}
          className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-pill bg-primary text-[15px] font-medium text-white shadow-soft transition-colors hover:bg-primary-dark"
        >
          <HiOutlineLockClosed size={18} /> Proceed to checkout
        </button>
        <a
          href={whatsappLink(cartOrderMessage(items, t, { couponCode, giftWrap, giftMessage }))}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-pill border border-whatsapp/40 bg-white text-[15px] font-medium text-ink transition-colors hover:bg-whatsapp hover:text-white"
        >
          <FaWhatsapp className="text-whatsapp group-hover:text-white" size={19} /> Order this cart on WhatsApp
        </a>
        <p className="mt-4 text-center text-xs text-muted">UPI · Cards · Net Banking · Cash on Delivery</p>
      </div>
    </div>
  );
}
