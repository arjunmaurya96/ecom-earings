import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  HiOutlineHeart,
  HiHeart,
  HiOutlineShoppingBag,
  HiMinus,
  HiPlus,
  HiOutlineShare,
  HiOutlineGift,
  HiOutlineTruck,
  HiOutlineArrowPath,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';
import { getCategory } from '@/data/categories';
import { formatPrice, discountPercent, swatchStyle } from '@/utils/format';
import RatingStars from '@/components/ui/RatingStars';
import { useSmoothScroll } from '@/context/SmoothScrollContext';
import SizeGuide from './SizeGuide';
import PincodeCheck from './PincodeCheck';

/**
 * PRODUCT INFO – naam, price, color, size, quantity, buttons, delivery
 * State (color/size/qty) Product.jsx mein hai, taaki gallery aur mobile bar bhi use kar sakein.
 */
export default function ProductInfo({ product, state, actions, sizeGuide, addRef }) {
  const { color, size, qty, error, maxQty, available, wishlisted } = state;
  const { setColor, setSize, setQty, addToCart, buyNow, orderOnWhatsApp, toggleWishlist } = actions;
  const [guideOpen, setGuideOpen] = useState(false);
  const lenis = useSmoothScroll();
  const goToReviews = (e) => {
    e.preventDefault();
    const el = document.getElementById('reviews');
    if (lenis) lenis.scrollTo(el, { offset: -100 });
    else el?.scrollIntoView({ behavior: 'smooth' });
  };
  const off = discountPercent(product.price, product.mrp);
  const category = getCategory(product.category);

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied');
    } catch {
      toast('Copy the link from the address bar');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title + rating */}
      <div>
        <Link to={`/category/${product.category}`} className="text-xs font-semibold uppercase tracking-[0.18em] text-primary hover:underline">
          {category?.name}
        </Link>
        <h1 className="mt-2 text-[1.75rem] leading-tight md:text-[2.25rem]">{product.name}</h1>
        <a href="#reviews" onClick={goToReviews} className="mt-3 inline-flex items-center gap-2 text-sm text-muted hover:text-primary">
          <RatingStars rating={product.rating} size={16} />
          <span className="font-medium text-ink">{product.rating}</span>
          <span>({product.reviewCount} reviews)</span>
        </a>
      </div>

      {/* Price */}
      <div className="rounded-2xl bg-cream p-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-3xl font-semibold text-primary">{formatPrice(product.price)}</span>
          {off > 0 && (
            <>
              <span className="text-lg text-muted line-through">{formatPrice(product.mrp)}</span>
              <span className="rounded-pill bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary">{off}% OFF</span>
            </>
          )}
        </div>
        <p className="mt-1 text-sm text-muted">
          Inclusive of all taxes
          {off > 0 && (
            <>
              {' · '}
              <span className="font-medium text-success">You save {formatPrice(product.mrp - product.price)}</span>
            </>
          )}
        </p>
      </div>

      {/* Colour */}
      {product.hasColors && (
        <div>
          <p className="mb-3 text-sm text-ink-soft">
            Colour: <span className="font-semibold text-ink">{color?.name || 'Select a colour'}</span>
          </p>
          <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Colour">
            {product.colors.map((c) => {
              const on = color?.name === c.name;
              const out = c.stock === 0;
              return (
                <button
                  key={c.name}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  aria-label={`${c.name}${out ? ' (out of stock)' : ''}`}
                  title={c.name}
                  onClick={() => setColor(c)}
                  className={`group flex flex-col items-center gap-1.5 ${out ? 'opacity-50' : ''}`}
                >
                  <span className={`relative h-14 w-14 overflow-hidden rounded-2xl ring-offset-2 transition-all ${on ? 'ring-2 ring-primary' : 'ring-1 ring-line group-hover:ring-ink/30'}`}>
                    <img src={c.image.replace(/w=\d+&h=\d+/, 'w=120&h=120')} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full ring-2 ring-white" style={swatchStyle(c.hex)} />
                    {out && <span className="absolute left-1/2 top-1/2 h-[2px] w-[140%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-ink/50" />}
                  </span>
                  <span className={`max-w-16 truncate text-[11px] ${on ? 'font-semibold text-ink' : 'text-muted'}`}>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size */}
      {product.hasSizes && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-ink-soft">
              Size: <span className="font-semibold text-ink">{size?.label || 'Select a size'}</span>
            </p>
            {sizeGuide && (
              <button type="button" onClick={() => setGuideOpen(true)} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
                Size guide
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Size">
            {product.sizes.map((s) => {
              const on = size?.label === s.label;
              const out = s.stock === 0;
              return (
                <button
                  key={s.label}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  disabled={out}
                  onClick={() => setSize(s)}
                  className={`relative min-w-14 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:text-muted disabled:line-through ${
                    on ? 'border-primary bg-primary text-white' : 'border-line bg-white text-ink hover:border-primary'
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
          <SizeGuide guide={sizeGuide} open={guideOpen} onClose={() => setGuideOpen(false)} />
        </div>
      )}

      {/* Stock + error */}
      <div className="-my-2 min-h-5 text-sm">
        {error ? (
          <motion.p key={error} initial={{ x: -6 }} animate={{ x: [6, -4, 0] }} className="font-medium text-primary-dark" role="alert">
            {error}
          </motion.p>
        ) : !available ? (
          <p className="font-medium text-primary-dark">This option is out of stock. Please choose another.</p>
        ) : maxQty <= 5 ? (
          <p className="font-medium text-gold-dark">Hurry, only {maxQty} left!</p>
        ) : (
          <p className="font-medium text-success">In stock, ready to ship</p>
        )}
      </div>

      {/* Qty + buttons */}
      <div ref={addRef} className="flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="flex h-13 items-center rounded-pill border border-line">
            <button
              type="button"
              onClick={() => setQty(Math.max(1, qty - 1))}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
              className="grid h-full w-12 place-items-center text-ink disabled:opacity-30"
            >
              <HiMinus />
            </button>
            <span className="w-8 text-center font-semibold tabular-nums text-ink" aria-live="polite">{qty}</span>
            <button
              type="button"
              onClick={() => setQty(Math.min(maxQty, qty + 1))}
              disabled={qty >= maxQty}
              aria-label="Increase quantity"
              className="grid h-full w-12 place-items-center text-ink disabled:opacity-30"
            >
              <HiPlus />
            </button>
          </div>
          <button
            type="button"
            onClick={addToCart}
            disabled={!available}
            className="flex h-13 flex-1 items-center justify-center gap-2 rounded-pill bg-primary px-6 text-[15px] font-medium text-white shadow-soft transition-colors hover:bg-primary-dark disabled:bg-ink/30 disabled:shadow-none"
          >
            <HiOutlineShoppingBag size={19} /> Add to cart
          </button>
          <button
            type="button"
            onClick={toggleWishlist}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wishlisted}
            className={`grid h-13 w-13 shrink-0 place-items-center rounded-full border transition-colors ${
              wishlisted ? 'border-primary bg-blush text-primary' : 'border-line text-ink hover:border-primary hover:text-primary'
            }`}
          >
            {wishlisted ? <HiHeart size={22} /> : <HiOutlineHeart size={22} />}
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={buyNow}
            disabled={!available}
            className="h-13 rounded-pill bg-ink text-[15px] font-medium text-white transition-colors hover:bg-ink/90 disabled:bg-ink/30"
          >
            Buy now
          </button>
          <button
            type="button"
            onClick={orderOnWhatsApp}
            className="flex h-13 items-center justify-center gap-2 rounded-pill bg-whatsapp text-[15px] font-medium text-white transition-all hover:brightness-95"
          >
            <FaWhatsapp size={20} /> Order on WhatsApp
          </button>
        </div>
      </div>

      <PincodeCheck />

      {/* Trust */}
      <ul className="grid grid-cols-2 gap-3 text-[13px] text-ink-soft">
        {[
          [HiOutlineTruck, 'Free shipping above ₹499'],
          [HiOutlineArrowPath, 'Easy 7-day returns'],
          [HiOutlineGift, 'Gift wrap available'],
          [HiOutlineShieldCheck, 'Secure payments'],
        ].map(([Icon, t]) => (
          <li key={t} className="flex items-center gap-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blush text-primary">
              <Icon size={16} />
            </span>
            {t}
          </li>
        ))}
      </ul>

      <button type="button" onClick={share} className="inline-flex w-fit items-center gap-2 text-sm font-medium text-ink-soft hover:text-primary">
        <HiOutlineShare size={17} /> Share this product
      </button>
    </div>
  );
}
