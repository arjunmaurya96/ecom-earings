// =========================================================
// DUMMY PRODUCTS
// Step 7 mein ye data MongoDB se aayega. Shape same rahegi:
//
//   hasColors: true/false   → color swatches dikhenge ya nahi
//   colors: [{ name, hex, image, stock }]   hex: 'multi' = Multicolor
//   hasSizes: true/false    → size buttons dikhenge ya nahi
//   sizes: [{ label, stock }]
// =========================================================

import { unsplash } from '@/utils/image';

// Demo photos (Unsplash) – har color ki alag photo. Client ki photos aane pe yahan badlo.
const img = (id) => unsplash(id, 800, 1000);

export const PRODUCTS = [
  {
    id: 'p1',
    slug: 'pastel-floral-claw-clip',
    name: 'Pastel Floral Claw Clip',
    category: 'floral-claw',
    price: 249,
    mrp: 399,
    rating: 4.8,
    reviewCount: 126,
    isBestSeller: true,
    isNew: false,
    hasColors: true,
    colors: [
      { name: 'Pink', hex: '#F48FB1', image: img('1744177762258-c98418b7a4eb'), stock: 20 },
      { name: 'Lavender', hex: '#B39DDB', image: img('1744177762306-6432f05fa7b1'), stock: 14 },
      { name: 'Peach', hex: '#FFAB91', image: img('1744177762256-e2594b4894b6'), stock: 9 },
      { name: 'Multicolor', hex: 'multi', image: img('1774301844178-c9ce96b76d92'), stock: 12 },
    ],
    hasSizes: false,
    sizes: [],
  },
  {
    id: 'p2',
    slug: 'daisy-bloom-claw-clip',
    name: 'Daisy Bloom Claw Clip',
    category: 'floral-claw',
    price: 199,
    mrp: 299,
    rating: 4.6,
    reviewCount: 58,
    isBestSeller: false,
    isNew: true,
    hasColors: true,
    colors: [
      { name: 'White', hex: '#ECEFF1', image: img('1549236177-77e8271c34b6'), stock: 18 },
      { name: 'Yellow', hex: '#FFD54F', image: img('1581674210501-c760093514e8'), stock: 10 },
    ],
    hasSizes: false,
    sizes: [],
  },
  {
    id: 'p3',
    slug: 'fluffy-fur-claw-clip',
    name: 'Fluffy Fur Claw Clip',
    category: 'furclaw',
    price: 299,
    mrp: 499,
    rating: 4.7,
    reviewCount: 89,
    isBestSeller: true,
    isNew: false,
    hasColors: true,
    colors: [
      { name: 'White', hex: '#ECE7E4', image: img('1613405091285-2c3ece70ff2e'), stock: 15 },
      { name: 'Brown', hex: '#A1887F', image: img('1635423759716-53ccaa71b3fa'), stock: 8 },
      { name: 'Pink', hex: '#F8BBD0', image: img('1626954079979-ec4f7b05e032'), stock: 0 },
    ],
    hasSizes: true,
    sizes: [
      { label: 'Medium', stock: 12 },
      { label: 'Large', stock: 6 },
    ],
  },
  {
    id: 'p4',
    slug: 'crystal-flower-claw-clip',
    name: 'Crystal Flower Claw Clip',
    category: 'transparent-flower-claw-clips',
    price: 199,
    mrp: 299,
    rating: 4.5,
    reviewCount: 64,
    isBestSeller: false,
    isNew: true,
    hasColors: true,
    colors: [
      { name: 'Clear Pink', hex: '#F48FB1', image: img('1578220154766-1c39bcecc1dc'), stock: 22 },
      { name: 'Clear Blue', hex: '#81D4FA', image: img('1635423759863-4ce5e848b8b5'), stock: 11 },
      { name: 'Multicolor', hex: 'multi', image: img('1774301844178-c9ce96b76d92'), stock: 16 },
    ],
    hasSizes: false,
    sizes: [],
  },
  {
    id: 'p5',
    slug: 'satin-scrunchies-set',
    name: 'Satin Scrunchies (Set of 3)',
    category: 'scrunchies',
    price: 199,
    mrp: 349,
    rating: 4.9,
    reviewCount: 212,
    isBestSeller: true,
    isNew: false,
    hasColors: true,
    colors: [
      { name: 'Multicolor', hex: 'multi', image: img('1671272981038-970ceaa8edb6'), stock: 30 },
      { name: 'Blush Pink', hex: '#F8BBD0', image: img('1630081757773-a87bffbdea5e'), stock: 18 },
      { name: 'Black', hex: '#424242', image: img('1671272980311-9055ae800653'), stock: 25 },
    ],
    hasSizes: true,
    sizes: [
      { label: 'Regular', stock: 40 },
      { label: 'Oversized', stock: 20 },
    ],
  },
  {
    id: 'p6',
    slug: 'velvet-scrunchie',
    name: 'Velvet Scrunchie',
    category: 'scrunchies',
    price: 99,
    mrp: 149,
    rating: 4.6,
    reviewCount: 97,
    isBestSeller: true,
    isNew: true,
    hasColors: true,
    colors: [
      { name: 'Maroon', hex: '#AD1457', image: img('1606772016409-d4a55e32be6e'), stock: 20 },
      { name: 'Emerald', hex: '#2E7D32', image: img('1630081757603-a46d414be089'), stock: 20 },
      { name: 'Navy', hex: '#283593', image: img('1625245034782-586c5113086d'), stock: 20 },
    ],
    hasSizes: false,
    sizes: [],
  },
  {
    id: 'p7',
    slug: 'antique-gold-jhumka',
    name: 'Antique Gold Jhumka',
    category: 'jhumka',
    price: 349,
    mrp: 599,
    rating: 4.8,
    reviewCount: 143,
    isBestSeller: true,
    isNew: false,
    hasColors: true,
    colors: [
      { name: 'Pink Stone', hex: '#EC407A', image: img('1762686130435-897de4b26aac'), stock: 10 },
      { name: 'Green Stone', hex: '#43A047', image: img('1706076876830-b2d1a3d61a43'), stock: 7 },
      { name: 'Red Stone', hex: '#C62828', image: img('1706076876111-28bf14ec6169'), stock: 5 },
    ],
    hasSizes: false,
    sizes: [],
  },
  {
    id: 'p8',
    slug: 'pearl-drop-jhumka',
    name: 'Pearl Drop Jhumka',
    category: 'jhumka',
    price: 299,
    mrp: 499,
    rating: 4.7,
    reviewCount: 71,
    isBestSeller: false,
    isNew: true,
    hasColors: true,
    colors: [
      { name: 'White Pearl', hex: '#F5F5F5', image: img('1716461114307-6e6bf4e75ba5'), stock: 12 },
      { name: 'Multicolor', hex: 'multi', image: img('1645994044915-a67a383f7c6a'), stock: 9 },
    ],
    hasSizes: false,
    sizes: [],
  },
  {
    id: 'p9',
    slug: 'korean-heart-earrings',
    name: 'Korean Heart Pearl Earrings',
    category: 'korean-earrings',
    price: 249,
    mrp: 399,
    rating: 4.6,
    reviewCount: 88,
    isBestSeller: true,
    isNew: true,
    hasColors: true,
    colors: [
      { name: 'Pink', hex: '#F06292', image: img('1590166223826-12dee1677420'), stock: 16 },
      { name: 'White', hex: '#F5F5F5', image: img('1713004539634-a6694a83f3d9'), stock: 10 },
      { name: 'Lilac', hex: '#B39DDB', image: img('1535632066927-ab7c9ab60908'), stock: 6 },
    ],
    hasSizes: false,
    sizes: [],
  },
  {
    id: 'p10',
    slug: 'butterfly-pendant-necklace',
    name: 'Butterfly Pendant Necklace',
    category: 'necklace',
    price: 399,
    mrp: 699,
    rating: 4.7,
    reviewCount: 54,
    isBestSeller: false,
    isNew: true,
    hasColors: true,
    colors: [
      { name: 'Multicolor', hex: 'multi', image: img('1599643478518-a784e5dc4c8f'), stock: 8 },
      { name: 'Pink', hex: '#F48FB1', image: img('1589128777073-263566ae5e4d'), stock: 8 },
    ],
    hasSizes: true,
    sizes: [
      { label: '16"', stock: 6 },
      { label: '18"', stock: 10 },
    ],
  },
  {
    id: 'p11',
    slug: 'pearl-bead-bracelet',
    name: 'Pearl Bead Bracelet',
    category: 'bracelet',
    price: 299,
    mrp: 499,
    rating: 4.8,
    reviewCount: 102,
    isBestSeller: true,
    isNew: false,
    hasColors: true,
    colors: [
      { name: 'Pink', hex: '#F48FB1', image: img('1611591437281-460bfbe1220a'), stock: 14 },
      { name: 'White', hex: '#F5F5F5', image: img('1626784215013-13322cb0e471'), stock: 14 },
      { name: 'Multicolor', hex: 'multi', image: img('1629224316810-9d8805b95e76'), stock: 10 },
    ],
    hasSizes: true,
    sizes: [
      { label: '2.4', stock: 8 },
      { label: '2.6', stock: 12 },
      { label: '2.8', stock: 0 },
    ],
  },
  {
    id: 'p12',
    slug: 'heart-charm-bracelet',
    name: 'Heart Charm Bracelet',
    category: 'bracelet',
    price: 349,
    mrp: 549,
    rating: 4.5,
    reviewCount: 39,
    isBestSeller: false,
    isNew: true,
    hasColors: true,
    colors: [
      { name: 'Gold', hex: '#E8D3A0', image: img('1602173574767-37ac01994b2a'), stock: 9 },
      { name: 'Rose', hex: '#F8BBD0', image: img('1676291055501-286c48bb186f'), stock: 9 },
    ],
    hasSizes: false,
    sizes: [],
  },
  {
    id: 'p13',
    slug: 'pretty-pink-gift-hamper',
    name: 'Pretty in Pink Gift Hamper',
    category: 'hamper',
    price: 1299,
    mrp: 1799,
    rating: 4.9,
    reviewCount: 76,
    isBestSeller: true,
    isNew: false,
    hasColors: false,
    colors: [],
    hasSizes: false,
    sizes: [],
    image: img('1513201099705-a9746e1e201f'),
  },
  {
    id: 'p14',
    slug: 'birthday-surprise-hamper',
    name: 'Birthday Surprise Hamper',
    category: 'hamper',
    price: 1599,
    mrp: 2199,
    rating: 4.8,
    reviewCount: 41,
    isBestSeller: false,
    isNew: true,
    hasColors: false,
    colors: [],
    hasSizes: false,
    sizes: [],
    image: img('1549465220-1a8b9238cd48'),
  },
  ...MORE_PRODUCTS(),
];

/* ---------------------------------------------------------
 * Extra dummy products (Shop page ke filters test karne ke liye)
 * Short helpers: c(color, hex, photoId, stock)  s(size, stock)
 * --------------------------------------------------------- */
function MORE_PRODUCTS() {
  const c = (name, hex, id, stock = 10) => ({ name, hex, image: img(id), stock });
  const s = (label, stock = 10) => ({ label, stock });
  const base = { rating: 4.6, reviewCount: 20, isBestSeller: false, isNew: false, hasColors: false, colors: [], hasSizes: false, sizes: [] };
  const list = [
    { slug: 'rose-garden-claw-clip', name: 'Rose Garden Claw Clip', category: 'floral-claw', price: 279, mrp: 449, rating: 4.7, reviewCount: 64,
      colors: [c('Pink', '#F48FB1', '1744177762256-e2594b4894b6'), c('Red', '#E53935', '1626954079979-ec4f7b05e032', 6)] },
    { slug: 'teddy-fur-claw-clip', name: 'Teddy Fur Claw Clip', category: 'furclaw', price: 249, mrp: 399, isNew: true, reviewCount: 33,
      colors: [c('Beige', '#D7CCC8', '1613405091285-2c3ece70ff2e'), c('Grey', '#9E9E9E', '1635423759716-53ccaa71b3fa')] },
    { slug: 'pom-pom-fur-clip', name: 'Pom Pom Fur Clip', category: 'furclaw', price: 199, mrp: 299, rating: 4.4, reviewCount: 18,
      colors: [c('White', '#ECE7E4', '1581674210501-c760093514e8'), c('Pink', '#F8BBD0', '1626954079979-ec4f7b05e032'), c('Multicolor', 'multi', '1774301844178-c9ce96b76d92', 4)],
      sizes: [s('Small'), s('Medium')] },
    { slug: 'glass-tulip-claw-clip', name: 'Glass Tulip Claw Clip', category: 'transparent-flower-claw-clips', price: 229, mrp: 349, isNew: true, reviewCount: 27,
      colors: [c('Clear Lilac', '#CE93D8', '1578220154766-1c39bcecc1dc'), c('Clear Peach', '#FFAB91', '1635423759863-4ce5e848b8b5')] },
    { slug: 'frosted-lily-clip-set', name: 'Frosted Lily Clip Set (Set of 4)', category: 'transparent-flower-claw-clips', price: 349, mrp: 599, rating: 4.8, reviewCount: 52, isBestSeller: true,
      colors: [c('Multicolor', 'multi', '1744177762306-6432f05fa7b1')] },
    { slug: 'chiffon-long-tail-scrunchie', name: 'Chiffon Long-Tail Scrunchie', category: 'scrunchies', price: 149, mrp: 249, isNew: true, reviewCount: 41,
      colors: [c('Pink', '#F8BBD0', '1630081757603-a46d414be089'), c('White', '#F5F5F5', '1601684769038-83b1f767a3ea'), c('Multicolor', 'multi', '1630081757646-bf0fb3b052eb')] },
    { slug: 'pearl-scrunchie', name: 'Pearl Studded Scrunchie', category: 'scrunchies', price: 179, mrp: 299, rating: 4.7, reviewCount: 36,
      colors: [c('Ivory', '#FFF8E1', '1671272980311-9055ae800653'), c('Black', '#424242', '1671272981038-970ceaa8edb6')],
      sizes: [s('Regular'), s('Oversized', 0)] },
    { slug: 'meenakari-jhumka', name: 'Meenakari Jhumka', category: 'jhumka', price: 399, mrp: 699, rating: 4.9, reviewCount: 88, isBestSeller: true,
      colors: [c('Multicolor', 'multi', '1706076876111-28bf14ec6169'), c('Blue', '#1E88E5', '1701450723521-788008974862')] },
    { slug: 'korean-pearl-hoops', name: 'Korean Pearl Hoops', category: 'korean-earrings', price: 229, mrp: 349, reviewCount: 45,
      colors: [c('Gold', '#D4AF37', '1617038220319-276d3cfab638'), c('Silver', '#C0C0C0', '1649675094138-2436328c27f0')] },
    { slug: 'ribbon-bow-earrings', name: 'Ribbon Bow Earrings', category: 'korean-earrings', price: 199, mrp: 299, isNew: true, rating: 4.5, reviewCount: 22,
      colors: [c('Pink', '#F48FB1', '1693212793204-bcea856c75fe'), c('Black', '#424242', '1652766540048-de0a878a3266')] },
    { slug: 'star-drop-danglers', name: 'Star Drop Danglers', category: 'korean-earrings', price: 269, mrp: 399, reviewCount: 19,
      colors: [c('Gold', '#D4AF37', '1553926297-57bb350c4f08')] },
    { slug: 'pearl-choker-necklace', name: 'Pearl Choker Necklace', category: 'necklace', price: 449, mrp: 799, rating: 4.8, reviewCount: 57, isBestSeller: true,
      colors: [c('White', '#F5F5F5', '1611652022419-a9419f74343d')], sizes: [s('14"'), s('16"')] },
    { slug: 'heart-locket-necklace', name: 'Heart Locket Necklace', category: 'necklace', price: 349, mrp: 549, isNew: true, reviewCount: 31,
      colors: [c('Gold', '#D4AF37', '1610694955371-d4a3e0ce4b52'), c('Rose Gold', '#E8B4A0', '1588444837495-c6cfeb53f32d')] },
    { slug: 'evil-eye-bracelet', name: 'Evil Eye Bracelet', category: 'bracelet', price: 249, mrp: 399, rating: 4.7, reviewCount: 69,
      colors: [c('Blue', '#1E88E5', '1721206624492-3d05631471ea'), c('Pink', '#F48FB1', '1717605383946-96c6884c36b4')],
      sizes: [s('2.4'), s('2.6')] },
    { slug: 'festive-diwali-hamper', name: 'Festive Diwali Hamper', category: 'hamper', price: 1899, mrp: 2499, rating: 4.9, reviewCount: 34, isNew: true,
      image: img('1608755728617-aefab37d2edd') },
    { slug: 'mini-self-love-hamper', name: 'Mini Self-Love Hamper', category: 'hamper', price: 799, mrp: 1099, reviewCount: 25,
      image: img('1707944145479-12755f0434d8') },
  ];
  return list.map((p, i) => ({
    ...base,
    ...p,
    id: `p${15 + i}`,
    hasColors: Boolean(p.colors?.length),
    hasSizes: Boolean(p.sizes?.length),
  }));
}

export const getBestSellers = () => PRODUCTS.filter((p) => p.isBestSeller);
export const getNewArrivals = () => PRODUCTS.filter((p) => p.isNew);
export const getProductImage = (product, color) =>
  color?.image || product.image || product.colors?.[0]?.image;

export const getProductBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);

/** Same category pehle, phir baaki best sellers – max `limit` */
export const getRelatedProducts = (product, limit = 8) => {
  const same = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);
  const others = PRODUCTS.filter((p) => p.category !== product.category && p.isBestSeller);
  return [...same, ...others].slice(0, limit);
};

/** Product ki saari photos (har color ki + product.image), bina duplicate */
export const getProductGallery = (product) => {
  const list = [product.image, ...(product.colors || []).map((c) => c.image)].filter(Boolean);
  return [...new Set(list)];
};
