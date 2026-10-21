import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HiXMark, HiOutlineShoppingBag } from 'react-icons/hi2';
import { useCart } from '@/context/CartContext';
import Portal from '@/components/ui/Portal';
import useOverlay from '@/hooks/useOverlay';
import { formatPrice } from '@/utils/format';
import Button from '@/components/ui/Button';
import CartLine from './CartLine';
import FreeShippingBar from './FreeShippingBar';

/** Mini cart – right side se khulta hai (header bag icon ya "Add to cart" pe) */
export default function CartDrawer() {
  const { items, totals, drawerOpen, closeDrawer } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useOverlay(drawerOpen, closeDrawer);

  // Page badalte hi drawer band (kisi bhi link se jao)
  useEffect(() => {
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const go = (to) => {
    closeDrawer();
    if (to !== pathname) navigate(to);
  };

  return (
    <Portal>
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[150] bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <motion.aside
            role="dialog"
            aria-label="Your cart"
            className="fixed inset-y-0 right-0 z-[151] flex w-[88%] max-w-[420px] flex-col bg-white shadow-lift"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="text-lg">
                Your cart <span className="text-muted">({totals.count})</span>
              </h2>
              <button type="button" onClick={closeDrawer} aria-label="Close cart" className="grid h-11 w-11 place-items-center rounded-full bg-blush/60 text-ink transition-colors hover:bg-primary hover:text-white">
                <HiXMark size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-blush text-primary">
                  <HiOutlineShoppingBag size={28} />
                </span>
                <h3 className="mt-5 text-xl">Your cart is empty</h3>
                <p className="mt-2 text-sm text-muted">Find something pretty for yourself or a gift for someone special.</p>
                <Button onClick={() => go('/shop')} className="mt-6">Start shopping</Button>
              </div>
            ) : (
              <>
                <div className="px-5 pt-4">
                  <FreeShippingBar toFreeShipping={totals.toFreeShipping} subtotal={totals.subtotal - totals.couponDiscount} />
                </div>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-5" data-lenis-prevent>
                  {items.map((item) => (
                    <li key={item.key} className="py-4">
                      <CartLine item={item} compact onNavigate={closeDrawer} />
                    </li>
                  ))}
                </ul>
                <div className="space-y-3 border-t border-line bg-cream/60 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-soft">Subtotal</span>
                    <span className="text-lg font-semibold text-ink">{formatPrice(totals.subtotal)}</span>
                  </div>
                  {totals.productSavings > 0 && (
                    <p className="text-[13px] font-medium text-success">You are saving {formatPrice(totals.productSavings)} on this order</p>
                  )}
                  <p className="text-xs text-muted">Coupons, gift wrap and shipping are added on the cart page.</p>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <Button variant="outline" onClick={() => go('/cart')}>View cart</Button>
                    <Button onClick={() => go('/checkout')}>Checkout</Button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
    </Portal>
  );
}
