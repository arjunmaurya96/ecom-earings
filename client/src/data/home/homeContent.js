import { unsplash } from '@/utils/image';

// =========================================================
// HOME PAGE CONTENT – trust bar, hamper banner, offer, reviews, instagram
// Sirf text/images badalne ke liye ye file edit karo.
// =========================================================

export const TRUST_POINTS = [
  { icon: 'truck', title: 'Free Shipping', text: 'On orders above ₹499' },
  { icon: 'cash', title: 'Cash on Delivery', text: 'Pay when it arrives' },
  { icon: 'gift', title: 'Gift Wrapping', text: 'Add a personal message' },
  { icon: 'return', title: 'Easy Returns', text: '7-day return policy' },
];

export const HAMPER_BANNER = {
  eyebrow: 'Custom Hamper Builder',
  title: 'Make a hamper that feels like her',
  text: 'Pick a box, choose her favourite clips, earrings and bracelets, add a note, and we will wrap it beautifully.',
  steps: ['Choose a box', 'Pick the items', 'Add a gift message'],
  cta: { label: 'Start Building', to: '/build-hamper' },
  startingPrice: 799, // TODO: client se confirm
  image: unsplash('1707944145479-12755f0434d8', 1000, 1000),
};

export const OFFER = {
  eyebrow: 'Festive Sale',
  title: 'Flat 20% off on all gift hampers',
  text: 'Use the code at checkout. Valid on ready hampers and custom hampers.',
  code: 'AURA20',
  endsAt: '2026-11-15T23:59:59+05:30',
  cta: { label: 'Shop Hampers', to: '/category/hamper' },
};

// Reviews with photos – Step 10 mein database se aayenge
export const REVIEWS = [
  {
    id: 1,
    name: 'Ananya S.',
    city: 'Jaipur',
    rating: 5,
    product: 'Pretty in Pink Gift Hamper',
    text: 'Ordered this for my sister’s birthday. The packing was so neat and everything inside looked even better than the photos.',
    photo: unsplash('1625552187571-7ee60ac43d2b', 700, 525),
  },
  {
    id: 2,
    name: 'Riya M.',
    city: 'Pune',
    rating: 5,
    product: 'Pastel Floral Claw Clip',
    text: 'Holds my thick hair the whole day. Bought the multicolour one and now I want every colour.',
    photo: unsplash('1744177762306-6432f05fa7b1', 700, 525),
  },
  {
    id: 3,
    name: 'Sneha K.',
    city: 'Indore',
    rating: 4,
    product: 'Antique Gold Jhumka',
    text: 'Lightweight and looks premium. Wore them to a wedding and got so many compliments.',
    photo: unsplash('1706076876830-b2d1a3d61a43', 700, 525),
  },
  {
    id: 4,
    name: 'Priya D.',
    city: 'Delhi',
    rating: 5,
    product: 'Pearl Bead Bracelet',
    text: 'The size chart was spot on. Cute bracelet for daily wear, and delivery was quick.',
    photo: unsplash('1626784215013-13322cb0e471', 700, 525),
  },
  {
    id: 5,
    name: 'Kavya R.',
    city: 'Bengaluru',
    rating: 5,
    product: 'Korean Heart Pearl Earrings',
    text: 'So dainty and pretty. Perfect for college and office both.',
    photo: unsplash('1713004539634-a6694a83f3d9', 700, 525),
  },
  {
    id: 6,
    name: 'Meera J.',
    city: 'Ahmedabad',
    rating: 5,
    product: 'Satin Scrunchies (Set of 3)',
    text: 'Soft on hair, no breakage. The set of 3 is great value.',
    photo: unsplash('1630081757773-a87bffbdea5e', 700, 525),
  },
];

export const INSTAGRAM_POSTS = [
  { id: 1, image: unsplash('1561828995-aa79a2db86dd', 500, 500), alt: 'Gold jewellery flat lay' },
  { id: 2, image: unsplash('1608755728617-aefab37d2edd', 500, 500), alt: 'Gift box with gold ribbon' },
  { id: 3, image: unsplash('1701450723521-788008974862', 500, 500), alt: 'Peacock feather earrings' },
  { id: 4, image: unsplash('1680775334280-adbda8e82fcd', 500, 500), alt: 'Bracelets on a wooden tray' },
  { id: 5, image: unsplash('1685970731571-72ede0cb26ea', 500, 500), alt: 'Floral necklace on gold chain' },
  { id: 6, image: unsplash('1630081757646-bf0fb3b052eb', 500, 500), alt: 'Soft scrunchie styling' },
];
