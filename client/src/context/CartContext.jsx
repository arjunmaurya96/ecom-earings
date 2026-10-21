import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import toast from 'react-hot-toast';
import { cartKey } from '@/utils/format';
import { loadState, saveState } from '@/utils/storage';
import { calcTotals, evaluateCoupon } from '@/utils/cartTotals';

/**
 * CART CONTEXT
 * - items: cart ke products (color/size ke saath)
 * - coupon, gift wrap, gift message
 * - totals: subtotal, discount, shipping, total (utils/cartTotals.js)
 * - drawer: header ka mini cart khulna/band hona
 * Sab localStorage mein save hota hai (refresh pe gayab nahi hoga)
 */
const STORAGE_KEY = 'pa_cart';
const EXTRAS_KEY = 'pa_cart_extras';
const MAX_QTY = 10;
const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const item = action.item;
      const existing = state.find((i) => i.key === item.key);
      if (existing) {
        return state.map((i) => (i.key === item.key ? { ...i, qty: Math.min(MAX_QTY, i.qty + item.qty) } : i));
      }
      return [...state, { ...item, qty: Math.min(MAX_QTY, item.qty) }];
    }
    case 'UPDATE_QTY':
      return state.map((i) => (i.key === action.key ? { ...i, qty: Math.min(MAX_QTY, Math.max(1, action.qty)) } : i));
    case 'REMOVE':
      return state.filter((i) => i.key !== action.key);
    case 'RESTORE':
      return state.some((i) => i.key === action.item.key) ? state : [...state.slice(0, action.index), action.item, ...state.slice(action.index)];
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], () => loadState(STORAGE_KEY, []));
  const [extras, setExtras] = useState(() => loadState(EXTRAS_KEY, { couponCode: '', giftWrap: false, giftMessage: '' }));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => saveState(STORAGE_KEY, items), [items]);
  useEffect(() => saveState(EXTRAS_KEY, extras), [extras]);

  /**
   * addToCart(product, { color, size, qty, image, openDrawer })
   * Custom hamper ke liye extra: { key, url, meta }
   */
  const addToCart = useCallback((product, { color = null, size = null, qty = 1, image, openDrawer = true, key, url, meta } = {}) => {
    dispatch({
      type: 'ADD',
      item: {
        key: key || cartKey(product.id, color, size),
        url: url || null,
        meta: meta || null,
        id: product.id,
        slug: product.slug,
        name: product.name,
        category: product.category,
        price: product.price,
        mrp: product.mrp,
        image: image || product.image || product.colors?.[0]?.image,
        color,
        size,
        qty,
      },
    });
    if (openDrawer) setDrawerOpen(true);
    else toast.success(`${product.name}${color ? ` (${color})` : ''} added to cart`);
  }, []);

  const updateQty = useCallback((key, qty) => dispatch({ type: 'UPDATE_QTY', key, qty }), []);

  /** Remove + "Undo" toast */
  const removeFromCart = useCallback(
    (key, { silent = false } = {}) => {
      const index = items.findIndex((i) => i.key === key);
      const item = items[index];
      dispatch({ type: 'REMOVE', key });
      if (item && !silent) {
        toast(
          (t) => (
            <span className="flex items-center gap-3">
              Removed {item.name}
              <button
                type="button"
                className="font-semibold text-primary-light underline"
                onClick={() => {
                  dispatch({ type: 'RESTORE', item, index });
                  toast.dismiss(t.id);
                }}
              >
                Undo
              </button>
            </span>
          ),
          { duration: 4000 },
        );
      }
    },
    [items],
  );

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
    setExtras({ couponCode: '', giftWrap: false, giftMessage: '' });
  }, []);

  /** Coupon lagao – { ok, message } return karta hai */
  const applyCoupon = useCallback(
    (code) => {
      const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
      const res = evaluateCoupon(code, items, subtotal);
      if (res.ok) setExtras((e) => ({ ...e, couponCode: res.coupon.code }));
      return res;
    },
    [items],
  );
  const removeCoupon = useCallback(() => setExtras((e) => ({ ...e, couponCode: '' })), []);
  const setGiftWrap = useCallback((giftWrap) => setExtras((e) => ({ ...e, giftWrap })), []);
  const setGiftMessage = useCallback((giftMessage) => setExtras((e) => ({ ...e, giftMessage: giftMessage.slice(0, 200) })), []);

  const value = useMemo(() => {
    const totals = calcTotals(items, extras);
    return {
      items,
      count: totals.count,
      subtotal: totals.subtotal,
      totals,
      couponCode: extras.couponCode,
      giftWrap: extras.giftWrap,
      giftMessage: extras.giftMessage,
      drawerOpen,
      openDrawer,
      closeDrawer,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      applyCoupon,
      removeCoupon,
      setGiftWrap,
      setGiftMessage,
      maxQty: MAX_QTY,
    };
  }, [items, extras, drawerOpen, openDrawer, closeDrawer, addToCart, updateQty, removeFromCart, clearCart, applyCoupon, removeCoupon, setGiftWrap, setGiftMessage]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
