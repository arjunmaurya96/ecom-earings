// =========================================================
// CUSTOM HAMPER BUILDER – data
// Step 12 (Admin panel) mein client yahi cheezein khud manage karega.
// TODO: client se box ke price/size, treats aur prices confirm karna
// =========================================================
import { unsplash } from '@/utils/image';
import { PRODUCTS } from './products';

export const HAMPER_BOXES = [
  {
    id: 'mini',
    name: 'Mini Box',
    capacity: 3,
    price: 149,
    size: '15 × 15 cm',
    text: 'Perfect for a sweet little surprise.',
    image: unsplash('1549465220-1a8b9238cd48', 600, 600),
  },
  {
    id: 'classic',
    name: 'Classic Box',
    capacity: 5,
    price: 249,
    size: '22 × 22 cm',
    text: 'Our most loved size for birthdays.',
    image: unsplash('1513201099705-a9746e1e201f', 600, 600),
    popular: true,
  },
  {
    id: 'grand',
    name: 'Grand Box',
    capacity: 8,
    price: 399,
    size: '30 × 25 cm',
    text: 'Go all out for weddings and big days.',
    image: unsplash('1608755728617-aefab37d2edd', 600, 600),
  },
];

export const RIBBONS = [
  { name: 'Rose Pink', hex: '#D6246E' },
  { name: 'Gold', hex: '#C9A24A' },
  { name: 'Ruby Red', hex: '#C62828' },
  { name: 'Lilac', hex: '#B39DDB' },
];

export const OCCASIONS = ['Birthday', 'Anniversary', 'Festive', 'Thank you', 'Bride to be', 'Just because'];

// Treats (sirf hamper mein milte hain) – `icon` react-icons/gi ka naam
export const HAMPER_TREATS = [
  { id: 't-choco', name: 'Belgian Chocolates', price: 149, icon: 'GiChocolateBar', tint: '#8D6E63' },
  { id: 't-candle', name: 'Scented Candle', price: 199, icon: 'GiCandleLight', tint: '#F4A7BB' },
  { id: 't-rose', name: 'Dried Rose Bunch', price: 249, icon: 'GiRose', tint: '#C62828' },
  { id: 't-perfume', name: 'Mini Perfume', price: 299, icon: 'GiPerfumeBottle', tint: '#B39DDB' },
  { id: 't-cupcake', name: 'Cupcake Jar', price: 179, icon: 'GiCupcake', tint: '#FFB74D' },
  { id: 't-lipbalm', name: 'Tinted Lip Balm', price: 129, icon: 'GiLipstick', tint: '#E91E63' },
];

// Hamper ke item groups (tabs)
export const ITEM_GROUPS = [
  { id: 'all', label: 'All' },
  { id: 'hair', label: 'Hair', categories: ['floral-claw', 'furclaw', 'transparent-flower-claw-clips', 'scrunchies'] },
  { id: 'earrings', label: 'Earrings', categories: ['jhumka', 'korean-earrings'] },
  { id: 'jewellery', label: 'Jewellery', categories: ['necklace', 'bracelet'] },
  { id: 'treats', label: 'Treats' },
];

/** Hamper mein daal sakte hain: hamper ke alawa saare products */
export const HAMPER_PRODUCTS = PRODUCTS.filter((p) => p.category !== 'hamper');
