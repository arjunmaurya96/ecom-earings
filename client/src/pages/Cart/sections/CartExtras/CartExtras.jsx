import { useState } from 'react';
import { HiOutlineTicket, HiCheckCircle, HiXMark, HiOutlineGift } from 'react-icons/hi2';
import { useCart } from '@/context/CartContext';
import { COUPONS } from '@/data/coupons';
import { GIFT_WRAP_FEE } from '@/utils/cartTotals';
import { formatPrice } from '@/utils/format';

/** Coupon code */
export function CouponBox() {
  const { couponCode, totals, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const apply = (c = code) => {
    if (!c.trim()) return setMsg({ ok: false, text: 'Enter a coupon code' });
    const res = applyCoupon(c);
    setMsg({ ok: res.ok, text: res.message });
    if (res.ok) setCode('');
  };

  const applied = couponCode && totals.coupon;

  return (
    <div className="rounded-2xl border border-line p-4">
      <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
        <HiOutlineTicket className="text-primary" size={19} /> Apply coupon
      </p>

      {applied ? (
        <div className={`mt-3 flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 ${totals.coupon.ok ? 'bg-success/10' : 'bg-primary/10'}`}>
          <div className="min-w-0 text-sm">
            <p className="font-semibold tracking-wider text-ink">{couponCode}</p>
            <p className={totals.coupon.ok ? 'text-success' : 'text-primary-dark'}>
              {totals.coupon.ok
                ? totals.couponDiscount
                  ? `You saved ${formatPrice(totals.couponDiscount)}`
                  : totals.coupon.message
                : totals.coupon.message}
            </p>
          </div>
          <button type="button" onClick={removeCoupon} aria-label="Remove coupon" className="grid h-8 w-8 shrink-0 place-items-center rounded-full hover:bg-white">
            <HiXMark />
          </button>
        </div>
      ) : (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              apply();
            }}
            className="mt-3 flex gap-2"
          >
            <label htmlFor="coupon-code" className="sr-only">Coupon code</label>
            <input
              id="coupon-code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Enter code"
              className="h-11 min-w-0 flex-1 rounded-pill border border-line px-4 text-sm uppercase tracking-wider text-ink outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-muted focus:border-primary"
            />
            <button type="submit" className="h-11 shrink-0 rounded-pill bg-ink px-5 text-sm font-medium text-white hover:bg-primary">
              Apply
            </button>
          </form>
          {msg && !msg.ok && <p className="mt-2 text-sm text-primary-dark">{msg.text}</p>}
        </>
      )}

      <button type="button" onClick={() => setShowAll(!showAll)} className="mt-3 text-[13px] font-medium text-primary hover:underline">
        {showAll ? 'Hide offers' : `View available offers (${COUPONS.length})`}
      </button>
      {showAll && (
        <ul className="mt-3 space-y-2">
          {COUPONS.map((c) => (
            <li key={c.code} className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-gold/60 bg-cream px-3.5 py-2.5">
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-wider text-ink">{c.code}</p>
                <p className="text-xs text-muted">{c.label}</p>
              </div>
              <button
                type="button"
                onClick={() => apply(c.code)}
                disabled={couponCode === c.code}
                className="shrink-0 text-sm font-semibold text-primary disabled:text-success"
              >
                {couponCode === c.code ? <HiCheckCircle size={20} /> : 'Apply'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Gift wrap + message */
export function GiftOptions() {
  const { giftWrap, giftMessage, setGiftWrap, setGiftMessage } = useCart();
  return (
    <div className="rounded-2xl border border-line p-4">
      <label className="flex cursor-pointer items-start gap-3">
        <input id="gift-wrap" type="checkbox" className="peer sr-only" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} />
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-ink/25 bg-white text-white transition-colors peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary">
          {giftWrap && '✓'}
        </span>
        <span className="flex-1">
          <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
            <HiOutlineGift className="text-primary" size={19} /> Gift wrap this order
          </span>
          <span className="mt-0.5 block text-sm text-muted">
            Pretty box, ribbon and a handwritten card for {formatPrice(GIFT_WRAP_FEE)}
          </span>
        </span>
      </label>
      {giftWrap && (
        <div className="mt-3">
          <label htmlFor="gift-message" className="text-sm text-ink-soft">Message for the card (optional)</label>
          <textarea
            id="gift-message"
            rows={3}
            value={giftMessage}
            onChange={(e) => setGiftMessage(e.target.value)}
            placeholder="Happy birthday, Riya! Love, Ananya"
            className="mt-1.5 w-full resize-none rounded-xl border border-line px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus:border-primary"
          />
          <p className="text-right text-xs text-muted">{giftMessage.length}/200</p>
        </div>
      )}
    </div>
  );
}
