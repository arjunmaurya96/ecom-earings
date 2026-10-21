# Pretty Aura – E-commerce Website

**Steps 1–6 + Info pages poore · Login, Checkout, My Account ka design ready (dummy data)**

## Chalane ka tareeka

Node.js 18 ya usse upar chahiye.

```bash
# Frontend
cd client
npm install
npm run dev        # http://localhost:5173

# Backend (naya terminal)
cd server
npm install
cp .env.example .env     # MONGO_URI mein MongoDB Atlas ka link daalo
npm run dev        # http://localhost:5000/api/health
```

Intro door animation ek session mein ek baar dikhta hai. Dobara dekhna ho to naya tab/incognito kholo.

## Kya badalna hai → kahan badlo

| Change | File |
|---|---|
| Colors, font, shadows | `client/src/styles/theme.css` |
| WhatsApp no., phone, email, social links, top messages | `client/src/config/site.config.js` |
| Menu aur category groups | `client/src/config/navigation.js` |
| Hero ki 4 images + text | `client/src/data/home/heroSlides.js` + `client/public/images/hero/` |
| Trust bar, hamper banner, offer, reviews, Instagram | `client/src/data/home/homeContent.js` |
| Products (dummy) | `client/src/data/products.js` |
| Categories | `client/src/data/categories.js` |
| Home sections ka order / hatana | `client/src/pages/Home/Home.jsx` |
| Ek section ka design | `client/src/pages/Home/sections/<SectionName>/` |
| Header / Footer | `client/src/components/common/Header/` , `Footer/` |

## Shop page (Step 3)

- `/shop`, `/category/<slug>` (9 categories), search: `/shop?q=jhumka`
- Filters URL mein save hote hain: `/category/bracelet?color=Pink&size=2.6&sort=price-asc`
- Filter/sort logic: `client/src/hooks/useProductFilters.js` (Step 7 mein yahi params API ko jaayenge)
- Sections: `client/src/pages/Shop/sections/` → ShopBanner, CategoryChips, FilterPanel (+ PriceRange, MobileFilters), ShopToolbar, ProductGrid
- Ek baar mein 12 products, phir "Load more" (`PAGE_SIZE` in `Shop.jsx`)

## Product page (Step 4)

- `/product/<slug>` – jaise `/product/pearl-bead-bracelet`
- Sections: `client/src/pages/Product/sections/` → ProductGallery (zoom + fullscreen), ProductInfo (colour, size, qty, cart, buy now, WhatsApp, pincode, size guide), ProductTabs, ProductReviews, RelatedProducts
- Description, care, size guide, dummy reviews: `client/src/data/productDetails.js`
- Size select kiye bina "Add to cart" → "Please select a size" message
- Mobile pe neeche sticky "Add" bar, Google ke liye Product schema (price, rating)

## Cart + Wishlist (Step 5)

- Mini cart: header ka bag icon ya "Add to cart" → right side se khulta hai (`components/cart/CartDrawer.jsx`)
- `/cart` – items, quantity, remove (Undo ke saath), save for later, coupon, gift wrap + message, order summary, WhatsApp pe poora cart
- `/wishlist` – saved items, Move to cart, Move all to cart
- Coupons: `client/src/data/coupons.js` (AURA20, WELCOME10, PRETTY50, FREESHIP – dummy, client se confirm karna)
- Hisaab (subtotal, coupon, shipping ₹59, gift wrap ₹49, total): `client/src/utils/cartTotals.js` – Checkout bhi yahi use karega

## Custom Hamper Builder (Step 6)

- `/build-hamper` – 1 Box (Mini 3 / Classic 5 / Grand 8 items + ribbon colour) → 2 Items (products + treats, colour/size ke saath) → 3 Personalise (occasion, To/From, card message, hide prices) → 4 Review
- Live preview: box ki drawing mein items dikhte hain, price breakup ke saath
- "Add hamper to cart" → cart mein ek item (andar ki list ke saath), AURA20 coupon bhi lagta hai
- "Order on WhatsApp" → poori hamper detail message mein
- Progress save rehti hai (refresh pe nahi jaati)
- Boxes, ribbons, treats, occasions: `client/src/data/hamper.js` · Logic: `client/src/hooks/useHamperBuilder.js`

## Login, Checkout, My Account, Info pages (design ready – DEMO)

⚠️ Ye abhi **browser mein hi chalte hain** (localStorage). Backend (Step 7–9, 11) aane pe sirf
`context/AuthContext.jsx` aur `context/OrderContext.jsx` ke andar ka code API se badlega – pages waise hi rahenge.

| Page | URL |
|---|---|
| Login / Register / Forgot password | `/login`, `/register`, `/forgot-password` |
| Checkout (contact, address, payment) | `/checkout` |
| Order success | `/order-success/<orderId>` |
| My Account (login zaroori) | `/account`, `/account/orders`, `/account/addresses`, `/account/profile` |
| About, Contact, FAQ | `/about`, `/contact`, `/faq` |
| Policies | `/privacy-policy`, `/return-policy`, `/shipping-policy`, `/terms` |

- Demo mein password ka sirf hash save hota hai (plain text nahi)
- Order status demo mein samay ke hisaab se badalta hai (Placed → Packed → Shipped → Delivered); Step 12 mein admin badlega
- About, FAQ aur Policies ka text: `client/src/data/infoPages.js` (**DRAFT – client approve kare**, legal advice nahi)
- COD charge: `utils/cartTotals.js` → `COD_FEE` (abhi 0)
- Common form fields: `components/form/Field.jsx`, `components/form/AddressFields.jsx`

## Popups / drawers

Saare popups (photo fullscreen, review photo, size guide, cart drawer, mobile menu, search, filter sheet) `components/ui/Portal.jsx` se seedha page ke upar render hote hain, aur `hooks/useOverlay.js` se:
- khulne pe page scroll band, band hone pe wapas chalu
- ✕ button, bahar click/tap, ya Escape – teeno se band
Naya popup banao to yahi dono use karna.

## Speed (Lighthouse, production build)

| Page | Desktop | Mobile (slow 4G simulation) |
|---|---|---|
| Home | 99 | 85 |
| Shop | 99 | 88 |
| Product | 99 | 87 |
| Hamper Builder | 100 | 91 |

Accessibility 96–100 · SEO 100 · Layout shift (CLS) ~0

Speed ke liye kya kiya hai:
- Har page alag file mein (lazy), aur website khulne ke baad baaki pages background mein pehle se load (`routes/lazyPages.js`) – page change turant
- Loading sirf page ke hisse mein (Header/Footer/Cart drawer kabhi gayab nahi hote)
- Images screen size ke hisaab se (`srcSet`): mobile hero pe portrait chhoti photo, cards pe 360–900px
- Chhupi (desktop-only) images mobile pe download nahi hoti
- `index.html` mein turant dikhne wali halki loading screen
- `robots.txt` + `sitemap.xml`

**Speed hamesha production build pe check karo** – `npm run dev` jaan-boojh ke slow hota hai:
```bash
npm run build
npm run preview      # http://localhost:4173  → Chrome DevTools → Lighthouse
```

## Images

Abhi saari photos **Unsplash ki free demo photos** hain (internet se load hoti hain, `src/utils/image.js` → `unsplash()`).
Koi photo load na ho to apne aap `public/images/placeholder.svg` dikhta hai.

Client ki asli photos aane pe:
1. Photo `client/public/images/...` mein daalo (WebP best)
2. Data file mein `unsplash('...')` ki jagah path likho, jaise `image: '/images/products/floral-claw-pink.webp'`

Sizes: Hero 1920×800+, Product 800×1000 (4:5), Category / Instagram square.

## Hero banner (split design)

Desktop: **left mein rang ka panel + text, right mein badi photo** (photo pe koi overlay nahi).
Mobile: photo upar, panel neeche. Har 3 second mein poora banner smooth slide hota hai.
Har slide `client/src/data/home/heroSlides.js` mein:

| Field | Kya karta hai |
|---|---|
| `image` | Photo (client ki photo: `'/images/hero/slide-1.webp'`, 1600×1000 ya badi) |
| `focus` | Photo ka kaunsa hissa dikhe, jaise `'center'`, `'60% 30%'` |
| `panel` | Panel ka rang: `'ink'` (espresso) · `'wine'` (deep rose) · `'rose'` (brand pink) |
| `kicker` | Chhota italic shabd, jaise "Introducing" |
| `title` | Bada naam (CAPITAL mein dikhta hai) |
| `sub`, `text` | Neeche ki chhoti lines |
| `cta`, `secondary` | Buttons |

Panel ki chaudai: `HeroSection.jsx` → `PANEL_W` / `GRID`. Timing: `AUTOPLAY_DELAY` (3000 ms).

## Folder structure

```
client/src/
  styles/        theme.css (design tokens), global.css
  config/        site.config.js, navigation.js
  data/          categories.js, products.js, home/
  components/
    common/      Header/, Footer/   (sirf yahi common)
    ui/          Button, ProductCard, ColorSwatches, SectionHeading, Logo, Reveal, RatingStars
    widgets/     IntroDoor, WhatsAppFloat, BackToTop
  layouts/       MainLayout.jsx
  pages/         Home/ (Home.jsx + sections/), ComingSoon/
  context/       CartContext, WishlistContext, SmoothScrollContext, AppProviders
  hooks/         useCountdown, useScrolled
  services/      api.js (Step 7 se)
  utils/         format.js, whatsapp.js, storage.js
  routes/        AppRoutes.jsx
server/
  config/db.js  routes/  controllers/  models/  middleware/  server.js
```

## Client se confirm karna (TODO)
- WhatsApp number, phone, email, address (`site.config.js`)
- Free shipping amount, return days
- Hero rating card ke numbers (`heroSlides.js`), hamper starting price, offer code/date (`homeContent.js`)
