import { Link } from 'react-router-dom';
import { HiOutlineTrash, HiOutlineHeart } from 'react-icons/hi2';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/utils/format';
import QtyStepper from './QtyStepper';

/** Cart ki ek line (photo, naam, color/size, qty, price, remove) */
export default function CartLine({ item, compact = false, onNavigate }) {
  const { updateQty, removeFromCart, maxQty } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const url = item.url || `/product/${item.slug}`;
  const hamper = item.meta?.type === 'hamper' ? item.meta : null;
  const product = PRODUCTS.find((p) => p.id === item.id);

  const saveForLater = () => {
    if (product && !isWishlisted(product.id)) toggleWishlist(product);
    removeFromCart(item.key, { silent: true });
  };

  return (
    <div className={`flex gap-3.5 ${compact ? '' : 'sm:gap-5'}`}>
      <Link to={url} onClick={onNavigate} className="shrink-0 overflow-hidden rounded-2xl bg-blush">
        <img
          src={item.image?.replace(/w=\d+&h=\d+/, 'w=200&h=250')}
          alt={item.name}
          loading="lazy"
          className={`${compact ? 'h-[88px] w-[70px]' : 'h-[120px] w-24 sm:h-[150px] sm:w-[120px]'} object-cover`}
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={url} onClick={onNavigate} className={`line-clamp-2 font-medium text-ink hover:text-primary ${compact ? 'text-sm' : 'text-[15px]'}`}>
              {item.name}
            </Link>
            {hamper && (
              <details className="mt-1 text-xs text-muted">
                <summary className="cursor-pointer select-none">
                  {hamper.boxName} · {hamper.items.reduce((n, i) => n + i.qty, 0)} items · {hamper.ribbon} ribbon
                </summary>
                <ul className="mt-1.5 space-y-0.5 text-ink-soft">
                  {hamper.items.map((i) => (
                    <li key={i.key}>
                      {i.qty} × {i.name}
                      {i.color ? ` (${i.color}${i.size ? `, ${i.size}` : ''})` : i.size ? ` (${i.size})` : ''}
                    </li>
                  ))}
                  {hamper.message && <li className="italic">Card: “{hamper.message}”</li>}
                </ul>
              </details>
            )}
            {(item.color || item.size) && (
              <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted">
                {item.color && <span>Colour: <span className="text-ink-soft">{item.color}</span></span>}
                {item.size && <span>Size: <span className="text-ink-soft">{item.size}</span></span>}
              </p>
            )}
          </div>
          {!compact && (
            <div className="hidden shrink-0 text-right sm:block">
              <p className="font-semibold text-ink">{formatPrice(item.price * item.qty)}</p>
              {item.mrp > item.price && <p className="text-xs text-muted line-through">{formatPrice(item.mrp * item.qty)}</p>}
            </div>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2.5">
          <QtyStepper value={item.qty} onChange={(q) => updateQty(item.key, q)} max={maxQty} size={compact ? 'sm' : 'md'} />
          <div className="flex items-center gap-1">
            {compact ? (
              <span className="mr-1 text-sm font-semibold text-ink">{formatPrice(item.price * item.qty)}</span>
            ) : (
              <>
                <span className="mr-1 text-sm font-semibold text-ink sm:hidden">{formatPrice(item.price * item.qty)}</span>
                <button
                  type="button"
                  onClick={saveForLater}
                  hidden={!product}
                  className="hidden items-center gap-1.5 rounded-pill px-3 py-2 text-[13px] text-ink-soft hover:bg-blush hover:text-primary sm:inline-flex"
                >
                  <HiOutlineHeart size={16} /> Save for later
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => removeFromCart(item.key)}
              aria-label={`Remove ${item.name}`}
              className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-blush hover:text-primary"
            >
              <HiOutlineTrash size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
