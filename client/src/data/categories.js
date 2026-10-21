import { unsplash } from '@/utils/image';

// Dummy categories – Step 7 mein ye MongoDB se aayengi (same shape).
export const CATEGORIES = [
  { slug: 'floral-claw', name: 'Floral Claw', group: 'Hair Accessories', image: unsplash('1744177762258-c98418b7a4eb', 600, 600) },
  { slug: 'furclaw', name: 'Furclaw', group: 'Hair Accessories', image: unsplash('1613405091285-2c3ece70ff2e', 600, 600) },
  {
    slug: 'transparent-flower-claw-clips',
    name: 'Transparent Flower Claw Clips',
    shortName: 'Flower Claw Clips',
    group: 'Hair Accessories',
    image: unsplash('1578220154766-1c39bcecc1dc', 600, 600),
  },
  { slug: 'scrunchies', name: 'Scrunchies', group: 'Hair Accessories', image: unsplash('1671272981038-970ceaa8edb6', 600, 600) },
  { slug: 'jhumka', name: 'Jhumka', group: 'Earrings', image: unsplash('1762686130435-897de4b26aac', 600, 600) },
  { slug: 'korean-earrings', name: 'Korean Earrings', group: 'Earrings', image: unsplash('1590166223826-12dee1677420', 600, 600) },
  { slug: 'necklace', name: 'Necklace', group: 'Jewellery', image: unsplash('1599643478518-a784e5dc4c8f', 600, 600) },
  { slug: 'bracelet', name: 'Bracelet', group: 'Jewellery', image: unsplash('1611591437281-460bfbe1220a', 600, 600) },
  { slug: 'hamper', name: 'Hamper', group: 'Gifts', image: unsplash('1521478706270-f2e33c203d95', 900, 1200) },
];

// Shop page banner ka chhota description (har category ke liye)
export const CATEGORY_DESCRIPTIONS = {
  'floral-claw': 'Pastel flower claw clips that hold all day and look pretty in every photo.',
  furclaw: 'Soft, fluffy claw clips for a cosy, cute look.',
  'transparent-flower-claw-clips': 'Crystal-clear flower clips in dreamy shades.',
  scrunchies: 'Satin, velvet and chiffon scrunchies that are gentle on your hair.',
  jhumka: 'Festive jhumkas with stone, pearl and meenakari work.',
  'korean-earrings': 'Dainty Korean-style earrings for college, office and everyday.',
  necklace: 'Pendants, lockets and pearl chokers to finish any outfit.',
  bracelet: 'Bead, charm and evil-eye bracelets in every colour.',
  hamper: 'Ready gift hampers for birthdays, festivals and every “just because”.',
};

export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);
