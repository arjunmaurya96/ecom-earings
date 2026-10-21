import { HiOutlineTruck, HiCheckCircle } from 'react-icons/hi2';
import { SITE } from '@/config/site.config';
import { formatPrice } from '@/utils/format';

/** "₹120 aur add karo, free shipping" progress bar */
export default function FreeShippingBar({ toFreeShipping, subtotal }) {
  const done = toFreeShipping <= 0;
  const pct = Math.min(100, (subtotal / SITE.freeShippingAbove) * 100);
  return (
    <div className="rounded-2xl bg-cream p-3.5">
      <p className="flex items-center gap-2 text-[13.5px] text-ink">
        {done ? <HiCheckCircle className="shrink-0 text-success" size={18} /> : <HiOutlineTruck className="shrink-0 text-primary" size={18} />}
        {done ? (
          <span>
            Yay! You get <b className="text-success">free shipping</b>
          </span>
        ) : (
          <span>
            Add <b className="text-primary">{formatPrice(toFreeShipping)}</b> more for free shipping
          </span>
        )}
      </p>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-soft ${done ? 'bg-success' : 'bg-primary'}`}
          style={{ width: `${done ? 100 : pct}%` }}
        />
      </div>
    </div>
  );
}
