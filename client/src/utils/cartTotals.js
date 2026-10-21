import { SITE } from '@/config/site.config';
import { PRODUCTS } from '@/data/products';
import { findCoupon } from '@/data/coupons';

// TODO (client se confirm): shipping charge aur gift wrap ka price
export const SHIPPING_FEE = 59;
export const GIFT_WRAP_FEE = 49;

const categoryOf = (item) => item.category || PRODUCTS.find((p) => p.id === item.id)?.category;

/**
 * Coupon check – { ok, discount, freeShipping, message }
 * Checkout (Step 9) bhi yahi function use karega.
 */
export function evaluateCoupon(code, items, subtotal) {
  const coupon = findCoupon(code || '');
  if (!coupon) return { ok: false, message: 'This coupon code is not valid.' };
  if (subtotal < coupon.minOrder) {
    return { ok: false, message: `Add items worth ₹${coupon.minOrder - subtotal} more to use ${coupon.code}.` };
  }
  const eligible = coupon.categories.length
    ? items.filter((i) => coupon.categories.includes(categoryOf(i)))
    : items;
  const eligibleTotal = eligible.reduce((n, i) => n + i.price * i.qty, 0);
  if (coupon.categories.length && !eligibleTotal) {
    return { ok: false, message: `${coupon.code} works only on ${coupon.label.split(' on ')[1] || 'selected items'}.` };
  }

  let discount = 0;
  if (coupon.type === 'percent') discount = Math.round((eligibleTotal * coupon.value) / 100);
  if (coupon.type === 'flat') discount = Math.min(coupon.value, eligibleTotal);
  if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);

  return { ok: true, coupon, discount, freeShipping: coupon.type === 'freeship', message: coupon.label };
}

/** Cart ka poora hisaab */
export function calcTotals(items, { couponCode, giftWrap } = {}) {
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
  const mrpTotal = items.reduce((n, i) => n + (i.mrp || i.price) * i.qty, 0);
  const productSavings = mrpTotal - subtotal;

  const coupon = couponCode ? evaluateCoupon(couponCode, items, subtotal) : null;
  const couponDiscount = coupon?.ok ? coupon.discount : 0;

  const afterDiscount = subtotal - couponDiscount;
  const freeShipping = !items.length || afterDiscount >= SITE.freeShippingAbove || coupon?.freeShipping;
  const shipping = freeShipping ? 0 : SHIPPING_FEE;
  const wrap = giftWrap && items.length ? GIFT_WRAP_FEE : 0;
  const total = Math.max(0, afterDiscount + shipping + wrap);

  return {
    count,
    subtotal,
    mrpTotal,
    productSavings,
    coupon,
    couponDiscount,
    shipping,
    wrap,
    total,
    totalSavings: productSavings + couponDiscount + (freeShipping && items.length ? SHIPPING_FEE : 0),
    toFreeShipping: Math.max(0, SITE.freeShippingAbove - afterDiscount),
  };
}

// Cash on Delivery charge (TODO: client se confirm – 0 rakhna hai ya kuch charge)
export const COD_FEE = 0;
