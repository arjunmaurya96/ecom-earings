// =========================================================
// PRODUCT DETAILS (dummy) – description, details, care, size guide, reviews
// Step 7 mein ye sab product ke saath database se aayega.
// Abhi category ke hisaab se common text use ho raha hai.
// =========================================================
import { unsplash } from '@/utils/image';
import { SITE } from '@/config/site.config';

const HAIR = {
  material: 'Premium acrylic / resin with a strong steel spring',
  care: ['Wipe with a soft dry cloth', 'Keep away from perfume and water', 'Store in the pouch provided'],
  highlights: ['Strong grip, holds thick and thin hair', 'Lightweight, no headache', 'Smooth teeth – no hair pulling'],
};
const FABRIC = {
  material: 'Soft satin / velvet / chiffon with covered elastic',
  care: ['Hand wash in cold water', 'Air dry, do not wring', 'Do not iron directly'],
  highlights: ['Gentle on hair – no breakage or dents', 'Stretchy elastic, keeps its shape', 'Comfortable for all-day wear'],
};
const JEWEL = {
  material: 'Brass with anti-tarnish gold plating, stones and pearls',
  care: ['Keep away from water, sweat and perfume', 'Store in the zip pouch after use', 'Clean with a soft cotton cloth'],
  highlights: ['Nickel-free and skin friendly', 'Lightweight and comfortable', 'Anti-tarnish finish'],
};
const HAMPER = {
  material: 'Curated box with ribbon, filler and greeting card',
  care: ['Keep the box in a cool, dry place', 'Open within 7 days of delivery'],
  highlights: ['Gift-ready packing with ribbon', 'Free personalised message card', 'Items can be swapped on WhatsApp'],
};

const BY_CATEGORY = {
  'floral-claw': { ...HAIR, about: 'A pretty pastel claw clip with hand-painted flowers. Twist your hair into a bun or half-up style and clip it in seconds.' },
  furclaw: { ...HAIR, material: 'Faux fur on a strong acrylic claw', about: 'Soft faux-fur claw clip for a cosy, cute look. Perfect for winter outfits and messy buns.' },
  'transparent-flower-claw-clips': { ...HAIR, about: 'Clear, glass-like flower clips in dreamy shades. They match every outfit and look lovely in photos.' },
  scrunchies: { ...FABRIC, about: 'Soft scrunchies that hold your hair without pulling or leaving dents. Wear them in your hair or on your wrist.' },
  jhumka: { ...JEWEL, about: 'Traditional jhumkas with fine detailing, made for festivals, weddings and every ethnic look.' },
  'korean-earrings': { ...JEWEL, about: 'Dainty Korean-style earrings that are light enough for all-day wear, from college to office.' },
  necklace: { ...JEWEL, about: 'A delicate necklace with an adjustable chain. Wear it alone or layer it with your favourites.' },
  bracelet: { ...JEWEL, about: 'A pretty everyday bracelet. Stack it with others or wear it alone for a minimal look.' },
  hamper: { ...HAMPER, about: 'A ready-to-gift hamper packed with our best-selling accessories and little treats. Add your message and we will wrap it with love.' },
};

export const getProductDetails = (product) => {
  const d = BY_CATEGORY[product.category] || JEWEL;
  return {
    ...d,
    shipping: [
      `Free shipping on orders above ₹${SITE.freeShippingAbove}`,
      'Dispatched within 24–48 hours',
      'Delivery in 3–7 working days across India',
      'Cash on Delivery available',
    ],
    returns: [
      `Easy ${SITE.returnDays}-day return or exchange`,
      'Earrings are not returnable for hygiene reasons',
      'Item must be unused, with original packing',
    ],
  };
};

// ---------- Size guide ----------
export const SIZE_GUIDES = {
  bracelet: {
    title: 'Bracelet size guide',
    note: 'Measure the widest part of your hand with fingers together.',
    head: ['Size', 'Inner diameter', 'Fits wrist'],
    rows: [
      ['2.4', '5.7 cm', 'Small (14–15 cm)'],
      ['2.6', '6.2 cm', 'Medium (15–16 cm)'],
      ['2.8', '6.7 cm', 'Large (16–17.5 cm)'],
    ],
  },
  necklace: {
    title: 'Necklace length guide',
    note: 'All chains have a 2-inch extender.',
    head: ['Length', 'Where it sits'],
    rows: [
      ['14"', 'Choker – around the neck'],
      ['16"', 'At the collarbone'],
      ['18"', 'Just below the collarbone'],
    ],
  },
  hair: {
    title: 'Clip & scrunchie size guide',
    note: 'Not sure? Medium suits most hair types.',
    head: ['Size', 'Length', 'Best for'],
    rows: [
      ['Small', '5–6 cm', 'Fine hair, half-up styles'],
      ['Medium', '8–9 cm', 'Most hair types'],
      ['Large', '10–11 cm', 'Thick or long hair'],
      ['Regular', '—', 'Scrunchie for daily wear'],
      ['Oversized', '—', 'Scrunchie for a big, puffy look'],
    ],
  },
};

export const getSizeGuide = (product) => {
  if (!product.hasSizes) return null;
  if (product.category === 'bracelet') return SIZE_GUIDES.bracelet;
  if (product.category === 'necklace') return SIZE_GUIDES.necklace;
  return SIZE_GUIDES.hair;
};

// ---------- Reviews (dummy) ----------
const NAMES = [
  ['Ananya S.', 'Jaipur'], ['Riya M.', 'Pune'], ['Sneha K.', 'Indore'], ['Priya D.', 'Delhi'],
  ['Kavya R.', 'Bengaluru'], ['Meera J.', 'Ahmedabad'], ['Isha P.', 'Mumbai'], ['Tanvi G.', 'Lucknow'],
];
const TEXTS = [
  'Looks exactly like the photos. The quality is really good for the price.',
  'Packing was so cute and delivery was quick. Will order again!',
  'Bought it as a gift and my friend loved it. Highly recommend.',
  'Very pretty and comfortable. Got so many compliments.',
  'Good product, colour is slightly lighter than the photo but still lovely.',
  'My favourite purchase this month. Worth every rupee.',
];
const PHOTOS = ['1625552187571-7ee60ac43d2b', '1744177762306-6432f05fa7b1', '1706076876830-b2d1a3d61a43', '1626784215013-13322cb0e471'];
const DATES = ['2 days ago', '1 week ago', '2 weeks ago', '3 weeks ago', '1 month ago'];

/** Har product ke liye 4 reviews (fixed, random nahi) */
export const getProductReviews = (product) => {
  const seed = Number(product.id.replace(/\D/g, '')) || 1;
  return Array.from({ length: 4 }, (_, i) => {
    const k = (seed + i) % NAMES.length;
    const color = product.colors?.[(seed + i) % (product.colors.length || 1)]?.name;
    return {
      id: `${product.id}-r${i}`,
      name: NAMES[k][0],
      city: NAMES[k][1],
      rating: i === 3 ? 4 : 5,
      date: DATES[i % DATES.length],
      variant: color || null,
      text: TEXTS[(seed + i) % TEXTS.length],
      photos: i % 2 === 0 ? [unsplash(PHOTOS[(seed + i) % PHOTOS.length], 400, 400)] : [],
      verified: true,
    };
  });
};

/** Star breakdown (5★ ... 1★) rating aur count se andaza */
export const getRatingBreakdown = (rating, count) => {
  const five = Math.round(count * Math.min(0.92, Math.max(0.4, rating - 4 + 0.15)));
  const four = Math.round((count - five) * 0.65);
  const three = Math.round((count - five - four) * 0.6);
  const two = Math.round((count - five - four - three) * 0.6);
  const one = Math.max(0, count - five - four - three - two);
  return [five, four, three, two, one];
};
