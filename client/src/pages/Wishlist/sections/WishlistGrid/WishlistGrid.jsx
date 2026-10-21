import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HiXMark, HiOutlineShoppingBag } from 'react-icons/hi2';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { getProductImage } from '@/data/products';
import { formatPrice, discountPercent } from '@/utils/format';
import RatingStars from '@/components/ui/RatingStars';

/** Wishlist card: Move to cart (size wale product pe → product page), remove */
function WishlistCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const url = `/product/${product.slug}`;
  const color = product.colors?.find((c) => c.stock > 0) || product.colors?.[0];
  const off = discountPercent(product.price, product.mrp);

  const moveToCart = () => {
    if (product.hasSizes) return navigate(url);
    addToCart(product, { color: color?.name, image: getProductImage(product, color) });
    toggleWishlist(product);
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white">
      <Link to={url} className="relative block overflow-hidden bg-blush">
        <img
          src={getProductImage(product, color)}
          alt={product.name}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {off > 0 && <span className="absolute left-3 top-3 rounded-pill bg-primary px-2.5 py-1 text-[11px] font-semibold text-white">-{off}%</span>}
      </Link>
      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        aria-label={`Remove ${product.name} from wishlist`}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-card hover:text-primary"
      >
        <HiXMark size={18} />
      </button>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <RatingStars rating={product.rating} size={13} />
        <h3 className="text-[15px] font-medium leading-snug text-ink">
          <Link to={url} className="hover:text-primary">{product.name}</Link>
        </h3>
        <p className="flex items-baseline gap-2">
          <span className="font-semibold text-primary">{formatPrice(product.price)}</span>
          {off > 0 && <span className="text-sm text-muted line-through">{formatPrice(product.mrp)}</span>}
        </p>
        <button
          type="button"
          onClick={moveToCart}
          className="mt-auto flex h-10 items-center justify-center gap-2 rounded-pill bg-ink text-[13px] font-medium text-white transition-colors hover:bg-primary"
        >
          <HiOutlineShoppingBag size={16} />
          {product.hasSizes ? 'Choose size' : 'Move to cart'}
        </button>
      </div>
    </article>
  );
}

export default function WishlistGrid({ products }) {
  return (
    <motion.ul layout className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      <AnimatePresence mode="popLayout">
        {products.map((p) => (
          <motion.li
            key={p.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <WishlistCard product={p} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
