const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

/** 1299 → "₹1,299" */
export const formatPrice = (amount) => inr.format(amount || 0);

/** price 249, mrp 399 → 38 */
export const discountPercent = (price, mrp) => (mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0);

/** Cart item ki unique key: same product alag color/size = alag line */
export const cartKey = (id, color, size) => [id, color || '-', size || '-'].join('|');

/** Multicolor swatch ke liye gradient */
export const MULTI_GRADIENT = 'conic-gradient(#F48FB1, #FFD54F, #81D4FA, #A5D6A7, #CE93D8, #F48FB1)';
export const swatchStyle = (hex) => ({ background: hex === 'multi' ? MULTI_GRADIENT : hex });
