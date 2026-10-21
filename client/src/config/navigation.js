// =========================================================
// NAVIGATION – header menu aur footer links
// Menu mein kuch add/remove karna ho to yahan badlo.
// =========================================================

// Categories ko groups mein dikhate hain (Shop dropdown + mobile menu + footer)
export const CATEGORY_GROUPS = [
  {
    title: 'Hair Accessories',
    items: [
      { label: 'Floral Claw', to: '/category/floral-claw' },
      { label: 'Furclaw', to: '/category/furclaw' },
      { label: 'Transparent Flower Claw Clips', to: '/category/transparent-flower-claw-clips' },
      { label: 'Scrunchies', to: '/category/scrunchies' },
    ],
  },
  {
    title: 'Earrings',
    items: [
      { label: 'Jhumka', to: '/category/jhumka' },
      { label: 'Korean Earrings', to: '/category/korean-earrings' },
    ],
  },
  {
    title: 'Jewellery',
    items: [
      { label: 'Necklace', to: '/category/necklace' },
      { label: 'Bracelet', to: '/category/bracelet' },
    ],
  },
  {
    title: 'Gifts',
    items: [
      { label: 'Gift Hampers', to: '/category/hamper' },
      { label: 'Build Your Own Hamper', to: '/build-hamper' },
    ],
  },
];

export const MAIN_NAV = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop', mega: true },
  { label: 'Build Hamper', to: '/build-hamper' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const FOOTER_LINKS = {
  help: [
    { label: 'Contact Us', to: '/contact' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Track Order', to: '/account/orders' },
    { label: 'Shipping Policy', to: '/shipping-policy' },
    { label: 'Return & Refund', to: '/return-policy' },
  ],
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Build Your Hamper', to: '/build-hamper' },
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms & Conditions', to: '/terms' },
  ],
};
