// =========================================================
// HERO BANNER – 4 slides (left: rang ka panel + text, right: photo)
// ---------------------------------------------------------
// Har slide mein:
//   image   – photo (abhi Unsplash demo; client ki photo: '/images/hero/slide-1.webp', 1600×1000+)
//   focus   – photo ka kaunsa hissa dikhe, jaise 'center', '60% 30%'
//   panel   – left panel ka rang: 'ink' (espresso brown) · 'wine' (deep rose) · 'rose' (brand pink)
//   kicker  – chhota italic shabd (jaise "Introducing")
//   title   – bada naam (CAPITAL mein dikhega)
//   sub     – title ke neeche chhoti line
//   text    – ek line description
// Photo ke upar koi overlay/opacity nahi.
// =========================================================
import { unsplash } from '@/utils/image';

export const HERO_SLIDES = [
  {
    id: 1,
    image: unsplash('1756483560049-e7b2208f99a0', 2000, 1250, 90),
    focus: '60% 30%',
    panel: 'ink',
    kicker: 'Introducing',
    title: 'Jhumka Edit',
    sub: 'Festive collection 2026',
    text: 'Antique gold, pearl and meenakari jhumkas – light on the ears, big on charm.',
    cta: { label: 'Shop now', to: '/category/jhumka' },
    secondary: { label: 'All earrings', to: '/category/korean-earrings' },
  },
  {
    id: 2,
    image: unsplash('1549465220-1a8b9238cd48', 2000, 1250, 90),
    focus: 'center',
    panel: 'wine',
    kicker: 'Made with love',
    title: 'Gift Hampers',
    sub: 'Ready to gift',
    text: 'Hand-packed hampers for birthdays, festivals and every “just because”.',
    cta: { label: 'Shop hampers', to: '/category/hamper' },
    secondary: { label: 'Build your own', to: '/build-hamper' },
  },
  {
    id: 3,
    image: unsplash('1781263538938-561a5e1acc51', 2000, 1250, 90),
    focus: 'center',
    panel: 'ink',
    kicker: 'Build your own',
    title: 'Custom Hamper',
    sub: 'Pick • Pack • Gift',
    text: 'Choose a box, fill it with her favourites and add a handwritten note.',
    cta: { label: 'Start building', to: '/build-hamper' },
    secondary: { label: 'See ready hampers', to: '/category/hamper' },
  },
  {
    id: 4,
    image: unsplash('1475179593777-bd12fd56b85d', 2000, 1250, 90),
    focus: '55% 35%',
    panel: 'wine',
    kicker: 'New in',
    title: 'Korean Earrings',
    sub: 'Dainty • Everyday',
    text: 'Pearls, hearts and bows that go from college to office to dinner.',
    cta: { label: 'Shop now', to: '/category/korean-earrings' },
    secondary: { label: 'New arrivals', to: '/shop?sort=newest' },
  },
];

// Panel ke rang (theme.css ke colors)
export const PANEL_COLORS = {
  ink: 'bg-ink',
  wine: 'bg-wine',
  rose: 'bg-primary-dark',
};

// TODO: client ke real numbers
export const HERO_BADGE = { title: '4.8 / 5', text: 'from 1,200+ happy customers' };
