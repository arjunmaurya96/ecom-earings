// =========================================================
// COUPONS (dummy) – Step 12 mein admin panel se banenge
//   type: 'percent' | 'flat' | 'freeship'
//   categories: sirf in categories ke items pe discount (khaali = sab pe)
//   minOrder: kam se kam itne ka order
// TODO: client se confirm karna
// =========================================================
export const COUPONS = [
  {
    code: 'AURA20',
    type: 'percent',
    value: 20,
    categories: ['hamper'],
    minOrder: 0,
    label: '20% off on gift hampers',
  },
  {
    code: 'WELCOME10',
    type: 'percent',
    value: 10,
    categories: [],
    minOrder: 499,
    maxDiscount: 150,
    label: '10% off on orders above ₹499 (up to ₹150)',
  },
  {
    code: 'PRETTY50',
    type: 'flat',
    value: 50,
    categories: [],
    minOrder: 799,
    label: '₹50 off on orders above ₹799',
  },
  {
    code: 'FREESHIP',
    type: 'freeship',
    value: 0,
    categories: [],
    minOrder: 0,
    label: 'Free shipping on any order',
  },
];

export const findCoupon = (code) => COUPONS.find((c) => c.code === String(code).trim().toUpperCase());
