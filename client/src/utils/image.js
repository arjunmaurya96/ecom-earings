/**
 * Unsplash demo photos (free to use, unsplash.com/license).
 * Client ki asli photos aane pe data files mein path badal do, jaise:
 *   image: '/images/products/floral-claw-pink.webp'
 */
export const unsplash = (id, w = 800, h, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=${q}`;

/** Photo load na ho to ye placeholder dikhega (main.jsx mein laga hai) */
export const PLACEHOLDER_IMAGE = '/images/placeholder.svg';

/** Unsplash URL ka size badlo (local photo ho to waisa hi) */
export const resizeUrl = (url, w, h) => {
  if (!url || !url.includes('images.unsplash.com')) return url;
  let out = url.replace(/([?&])w=\d+/, `$1w=${w}`);
  if (h) out = /[?&]h=\d+/.test(out) ? out.replace(/([?&])h=\d+/, `$1h=${h}`) : `${out}&h=${h}`;
  return out;
};

/**
 * srcSet – browser screen ke hisaab se sahi size ki photo khud chunta hai
 * (mobile pe chhoti, desktop/retina pe badi). ratio = height / width
 */
export const srcSetFor = (url, widths, ratio) => {
  if (!url || !url.includes('images.unsplash.com')) return undefined;
  return widths.map((w) => `${resizeUrl(url, w, ratio ? Math.round(w * ratio) : undefined)} ${w}w`).join(', ');
};
