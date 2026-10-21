import { SITE } from '@/config/site.config';
import { formatPrice } from './format';

/** WhatsApp chat link with pre-filled message */
export const whatsappLink = (message = '') =>
  `https://wa.me/${SITE.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

/** Product order message – color/size ho to woh bhi jaata hai */
export const productOrderMessage = (product, { color, size, qty = 1 } = {}) => {
  const lines = [
    `Hi ${SITE.name}! I want to order:`,
    `• ${product.name}`,
    color ? `• Colour: ${color}` : null,
    size ? `• Size: ${size}` : null,
    `• Quantity: ${qty}`,
    `• Price: ${formatPrice(product.price * qty)}`,
    `${SITE.url}/product/${product.slug}`,
  ];
  return lines.filter(Boolean).join('\n');
};

/** Custom hamper ki detail lines */
export const hamperLines = (h) => [
  `${h.boxName}, ${h.ribbon} ribbon, ${h.occasion}`,
  ...h.items.map((i) => `- ${i.qty} × ${i.name}${i.color ? ` (${i.color}${i.size ? `, ${i.size}` : ''})` : i.size ? ` (${i.size})` : ''}`),
  h.to ? `To: ${h.to}${h.from ? ` | From: ${h.from}` : ''}` : null,
  h.message ? `Card: "${h.message}"` : null,
  h.hidePrices ? 'Please hide prices inside the hamper' : null,
].filter(Boolean);

/** Custom hamper ka seedha WhatsApp order */
export const hamperOrderMessage = (h, total) =>
  [`Hi ${SITE.name}! I want to order a custom hamper:`, '', ...hamperLines(h), '', `Total: ${formatPrice(total)}`].join('\n');

/** Poore cart ka order message */
export const cartOrderMessage = (items, totals, { couponCode, giftWrap, giftMessage } = {}) => {
  const lines = [`Hi ${SITE.name}! I want to order:`, ''];
  items.forEach((i, n) => {
    const opts = [i.color, i.size && `Size ${i.size}`].filter(Boolean).join(', ');
    lines.push(`${n + 1}. ${i.name}${opts ? ` (${opts})` : ''} × ${i.qty} = ${formatPrice(i.price * i.qty)}`);
    if (i.meta?.type === 'hamper') lines.push(...hamperLines(i.meta).map((l) => `   ${l}`));
  });
  lines.push('');
  if (totals.couponDiscount) lines.push(`Coupon ${couponCode}: -${formatPrice(totals.couponDiscount)}`);
  if (giftWrap) lines.push(`Gift wrap: ${formatPrice(totals.wrap)}`);
  if (giftMessage) lines.push(`Gift message: "${giftMessage}"`);
  lines.push(`Shipping: ${totals.shipping ? formatPrice(totals.shipping) : 'Free'}`);
  lines.push(`Total: ${formatPrice(totals.total)}`);
  return lines.join('\n');
};
