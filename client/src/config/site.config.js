// =========================================================
// SITE CONFIG – brand details ek hi jagah
// TODO (client se confirm karna): WhatsApp number, phone, email, address, social links,
// free shipping amount, return days.
// =========================================================

export const SITE = {
  name: 'Pretty Aura',
  tagline: 'Style • Accessories • Gifts • More',
  description:
    'Pretty Aura brings you floral claw clips, scrunchies, jhumkas, Korean earrings, necklaces, bracelets and handmade gift hampers.',
  url: 'https://prettyaura.in',
  logo: '/images/logo.webp',

  // Contact
  whatsappNumber: '919999999999', // country code ke saath, bina + ke (TODO)
  phone: '+91 99999 99999', // TODO
  email: 'hello@prettyaura.in', // TODO
  address: 'India', // TODO

  // Social
  social: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    youtube: 'https://www.youtube.com/',
  },
  instagramHandle: '@prettyaura',

  // Store rules (TODO: confirm)
  currency: 'INR',
  freeShippingAbove: 499,
  returnDays: 7,

  // Header ke upar chalne wale messages
  announcements: [
    'Free shipping on orders above ₹499',
    'Cash on Delivery available',
    'Build your own gift hamper 🎁',
  ],
};
