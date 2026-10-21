import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi2';
import { useCart } from '@/context/CartContext';
import CartLine from '@/components/cart/CartLine';
import FreeShippingBar from '@/components/cart/FreeShippingBar';

/** Cart ke items ki list */
export default function CartItems() {
  const { items, totals, clearCart } = useCart();
  const [confirm, setConfirm] = useState(false);

  return (
    <div>
      <FreeShippingBar toFreeShipping={totals.toFreeShipping} subtotal={totals.subtotal - totals.couponDiscount} />

      <div className="mt-6 hidden grid-cols-[1fr_auto] border-b border-line pb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted sm:grid">
        <span>Product</span>
        <span>Total</span>
      </div>

      <ul className="divide-y divide-line">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.key}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -30, height: 0, paddingTop: 0, paddingBottom: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden py-5"
            >
              <CartLine item={item} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-primary">
          <HiArrowLeft /> Continue shopping
        </Link>
        {confirm ? (
          <span className="flex items-center gap-3 text-sm">
            <span className="text-ink-soft">Remove all items?</span>
            <button type="button" onClick={clearCart} className="font-semibold text-primary hover:underline">Yes, clear</button>
            <button type="button" onClick={() => setConfirm(false)} className="text-muted hover:text-ink">No</button>
          </span>
        ) : (
          <button type="button" onClick={() => setConfirm(true)} className="text-sm text-muted hover:text-primary">
            Clear cart
          </button>
        )}
      </div>
    </div>
  );
}
