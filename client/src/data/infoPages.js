// =========================================================
// INFO PAGES – About, FAQ, Policies ka text
// ⚠️ DRAFT: client ko padhke approve karna hai (khaas kar policies –
// ye legal advice nahi hai). Text badalne ke liye sirf ye file edit karo.
// =========================================================
import { SITE } from '@/config/site.config';

export const ABOUT = {
  eyebrow: 'Our story',
  title: 'Little things that make every day feel pretty',
  intro:
    'Pretty Aura started with a simple idea: everyday accessories should feel special without costing a fortune. Today we curate claw clips, scrunchies, earrings, jewellery and gift hampers for women who love a little sparkle in their routine.',
  story: [
    'Every piece is hand-picked for quality, comfort and colour. We test clips for grip, check earrings for weight, and make sure scrunchies are gentle on hair.',
    'Our gift hampers are packed by hand with ribbons, tissue and a handwritten card, so every order feels like a present – whether it is for someone you love or for yourself.',
  ],
  values: [
    { title: 'Hand-picked quality', text: 'Every product is checked before it reaches you.' },
    { title: 'Packed with love', text: 'Neat, pretty packing on every order, not just hampers.' },
    { title: 'Fair prices', text: 'Trendy styles that do not break the bank.' },
    { title: 'Real support', text: 'Talk to a real person on WhatsApp, not a bot.' },
  ],
};

export const FAQ = [
  {
    group: 'Orders & delivery',
    items: [
      ['How long does delivery take?', 'Orders are dispatched within 24–48 hours. Delivery usually takes 2–4 working days in metro cities and 4–7 working days elsewhere in India.'],
      ['Do you offer free shipping?', `Yes, shipping is free on orders above ₹${SITE.freeShippingAbove}. A small shipping fee applies to smaller orders.`],
      ['How can I track my order?', 'Log in and open My Account → My orders to see the status. You will also get updates on email and WhatsApp.'],
      ['Can I change or cancel my order?', 'You can cancel an order from My orders until it is packed. For changes, message us on WhatsApp as soon as possible.'],
    ],
  },
  {
    group: 'Payments',
    items: [
      ['Which payment methods do you accept?', 'UPI (Google Pay, PhonePe, Paytm), debit and credit cards, net banking and Cash on Delivery.'],
      ['Is Cash on Delivery available?', 'Yes, Cash on Delivery is available on most pincodes across India.'],
      ['Is online payment safe?', 'Yes. Payments are processed by Razorpay, a secure and RBI-compliant payment gateway. We never see or store your card details.'],
    ],
  },
  {
    group: 'Returns & exchange',
    items: [
      ['What is your return policy?', `You can return or exchange most items within ${SITE.returnDays} days of delivery if they are unused and in original packing. Earrings cannot be returned for hygiene reasons.`],
      ['What if my item arrives damaged?', 'Please record an unboxing video and message us within 48 hours of delivery. We will send a replacement or refund.'],
      ['When will I get my refund?', 'Refunds are processed within 5–7 working days after we receive the returned item.'],
    ],
  },
  {
    group: 'Gift hampers',
    items: [
      ['Can I build my own hamper?', 'Yes! Use the Build Your Hamper page to pick a box, choose items and add a message card.'],
      ['Can you hide prices inside the hamper?', 'Yes. Prices are hidden by default when you send a hamper as a gift.'],
      ['Can I send a hamper directly to someone else?', 'Of course. Just enter their name and address at checkout and add your message.'],
    ],
  },
];

const today = 'October 2026';

export const POLICIES = {
  'privacy-policy': {
    title: 'Privacy Policy',
    updated: today,
    sections: [
      ['What we collect', 'When you place an order or create an account, we collect your name, email, phone number and delivery address. We also collect basic information about how you use our website to improve it.'],
      ['How we use it', 'We use your information to process orders, deliver products, send order updates, answer your questions and, only if you agree, send offers and new arrivals.'],
      ['Payments', 'Online payments are handled by Razorpay. We do not see or store your card, UPI or bank details.'],
      ['Sharing', 'We share your delivery details only with our courier partners to deliver your order. We never sell your personal information.'],
      ['Cookies', 'We use small files (cookies and local storage) to remember your cart, wishlist and login.'],
      ['Your choices', `You can update your details in My Account, unsubscribe from emails at any time, or ask us to delete your account by writing to ${SITE.email}.`],
    ],
  },
  'return-policy': {
    title: 'Return & Refund Policy',
    updated: today,
    sections: [
      ['Return window', `You can request a return or exchange within ${SITE.returnDays} days of delivery.`],
      ['Eligible items', 'Items must be unused, unwashed and in their original packing with tags. Earrings, custom hampers and sale items cannot be returned for hygiene and personalisation reasons.'],
      ['Damaged or wrong items', 'If you receive a damaged or wrong item, message us within 48 hours with an unboxing video and photos. We will replace it or refund you in full.'],
      ['How to return', 'Message us on WhatsApp or email with your order number. We will arrange a pickup where available or share the return address.'],
      ['Refunds', 'Once we receive and check the item, refunds are processed within 5–7 working days to the original payment method. For Cash on Delivery orders, we refund by UPI or bank transfer.'],
    ],
  },
  'shipping-policy': {
    title: 'Shipping Policy',
    updated: today,
    sections: [
      ['Dispatch', 'Orders are packed and dispatched within 24–48 hours (excluding Sundays and public holidays).'],
      ['Delivery time', 'Metro cities: 2–4 working days. Rest of India: 4–7 working days. Remote areas may take longer.'],
      ['Shipping charges', `Free shipping on orders above ₹${SITE.freeShippingAbove}. A flat fee applies to smaller orders and is shown at checkout.`],
      ['Tracking', 'You will receive a tracking link on email and WhatsApp once your order is shipped.'],
      ['Address issues', 'Please check your address and phone number carefully. If a parcel is returned because of a wrong address, re-shipping charges may apply.'],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    updated: today,
    sections: [
      ['About these terms', `By using ${SITE.url.replace('https://', '')} and placing an order, you agree to these terms.`],
      ['Products and prices', 'We try to show colours and details accurately, but slight differences can occur due to screen settings and handmade finishing. Prices may change without notice.'],
      ['Orders', 'An order is confirmed once payment is received or a Cash on Delivery order is verified. We may cancel an order if a product is out of stock or details cannot be verified, with a full refund.'],
      ['Accounts', 'You are responsible for keeping your login details safe. Let us know immediately if you notice any unusual activity.'],
      ['Intellectual property', 'All photos, text and designs on this website belong to Pretty Aura and may not be used without permission.'],
      ['Contact', `Questions about these terms? Write to ${SITE.email}.`],
    ],
  },
};
