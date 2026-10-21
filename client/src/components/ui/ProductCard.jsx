import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineHeart, HiHeart, HiOutlineShoppingBag } from 'react-icons/hi2';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice, discountPercent } from '@/utils/format';
import { getProductImage } from '@/data/products';
import { resizeUrl, srcSetFor } from '@/utils/image';
import ColorSwatches from './ColorSwatches';
import RatingStars from './RatingStars';

/**
 * Product card – Home, Shop, Related products sab jagah yahi.
 * - Color swatch click → image badalti hai
 * - Agar product mein size hai → "Choose options" (product page pe size choose hoga)
 */
export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const firstInStock = product.colors?.find((c) => c.stock > 0) || product.colors?.[0] || null;
  const [color, setColor] = useState(firstInStock);
  const off = discountPercent(product.price, product.mrp);
  const saved = isWishlisted(product.id);
  const url = `/product/${product.slug}`;
  const needsOptions = product.hasSizes;
  const colorOut = color && color.stock === 0;

  const handleAdd = () => {
    if (needsOptions) return navigate(url);
    addToCart(product, { color: color?.name, image: getProductImage(product, color) });
  };

  return (
    <article className="group relative flex h-full flex-col">
      {/* Image */}
      <div className="relative overflow-hidden rounded-card bg-blush">
        <Link to={url} aria-label={product.name} className="block aspect-[4/5]">
          <img
            src={resizeUrl(getProductImage(product, color), 600, 750)}
            srcSet={srcSetFor(getProductImage(product, color), [360, 600, 900], 1.25)}
            sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw"
            alt={`${product.name}${color ? ` – ${color.name}` : ''}`}
            loading="lazy"
            decoding="async"
            width="800"
            height="1000"
            className="h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.05]"
          />
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {off > 0 && (
            <span className="rounded-pill bg-primary px-2.5 py-1 text-[11px] font-semibold text-white">-{off}%</span>
          )}
          {product.isNew && (
            <span className="rounded-pill bg-white px-2.5 py-1 text-[11px] font-semibold text-ink shadow-card">New</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={saved}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-card backdrop-blur transition-all duration-300 hover:scale-110 ${saved ? 'text-primary' : 'text-ink'}`}
        >
          {saved ? <HiHeart size={18} /> : <HiOutlineHeart size={18} />}
        </button>

        {/* Add to cart – desktop pe hover se upar aata hai, mobile pe hamesha dikhta hai */}
        <div className="absolute inset-x-3 bottom-3 lg:translate-y-[130%] lg:opacity-0 lg:transition-all lg:duration-500 lg:ease-soft lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
          <button
            type="button"
            onClick={handleAdd}
            disabled={colorOut}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-pill bg-ink/90 text-[13px] font-medium text-white backdrop-blur transition-colors hover:bg-primary disabled:bg-ink/50"
          >
            <HiOutlineShoppingBag size={16} />
            {colorOut ? 'Out of stock' : needsOptions ? 'Choose options' : 'Add to cart'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 px-1 pt-3.5">
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <RatingStars rating={product.rating} size={13} />
          <span>({product.reviewCount})</span>
        </div>
        <h3 className="text-[15px] font-medium leading-snug text-ink">
          <Link to={url} className="hover:text-primary">{product.name}</Link>
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold text-primary">{formatPrice(product.price)}</span>
          {off > 0 && <span className="text-sm text-muted line-through">{formatPrice(product.mrp)}</span>}
        </div>
        {product.hasColors && product.colors.length > 1 && (
          <div className="mt-auto pt-1">
            <ColorSwatches colors={product.colors} selected={color?.name} onSelect={setColor} />
          </div>
        )}
      </div>
    </article>
  );
}
