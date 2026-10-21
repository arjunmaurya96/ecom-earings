import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { HiOutlineHeart, HiOutlineShoppingBag } from 'react-icons/hi2';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { PRODUCTS, getProductImage, getBestSellers } from '@/data/products';
import { SITE } from '@/config/site.config';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/ui/ProductCard';
import SectionHeading from '@/components/ui/SectionHeading';
import WishlistGrid from './sections/WishlistGrid/WishlistGrid';

/**
 * WISHLIST PAGE  →  /wishlist
 * Saved products, "Move all to cart", empty state + suggestions
 */
export default function Wishlist() {
  const { ids, clearWishlist } = useWishlist();
  const { addToCart, openDrawer } = useCart();
  const [confirm, setConfirm] = useState(false);
  const products = ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  const moveAll = () => {
    const simple = products.filter((p) => !p.hasSizes);
    const needSize = products.length - simple.length;
    simple.forEach((p) => {
      const color = p.colors?.find((c) => c.stock > 0) || p.colors?.[0];
      addToCart(p, { color: color?.name, image: getProductImage(p, color), openDrawer: false });
    });
    if (simple.length) openDrawer();
    if (needSize) toast(`${needSize} item${needSize > 1 ? 's need' : ' needs'} a size – choose it on the product page`, { icon: '📏' });
  };

  return (
    <>
      <Helmet>
        <title>{`Wishlist | ${SITE.name}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="container-page pb-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[2rem] md:text-[2.5rem]">My wishlist</h1>
            <p className="mt-1 text-muted">{products.length ? `${products.length} saved ${products.length === 1 ? 'item' : 'items'}` : 'Save your favourites here'}</p>
          </div>
          {products.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              {confirm ? (
                <span className="flex items-center gap-3 text-sm">
                  <span className="text-ink-soft">Remove all?</span>
                  <button type="button" onClick={() => { clearWishlist(); setConfirm(false); }} className="font-semibold text-primary hover:underline">Yes</button>
                  <button type="button" onClick={() => setConfirm(false)} className="text-muted">No</button>
                </span>
              ) : (
                <button type="button" onClick={() => setConfirm(true)} className="text-sm text-muted hover:text-primary">Clear all</button>
              )}
              <Button onClick={moveAll}>
                <HiOutlineShoppingBag size={18} /> Move all to cart
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8">
          {products.length ? (
            <WishlistGrid products={products} />
          ) : (
            <div className="flex flex-col items-center rounded-3xl bg-cream px-6 py-16 text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-white text-primary shadow-card">
                <HiOutlineHeart size={34} />
              </span>
              <h2 className="mt-6 text-2xl">Your wishlist is empty</h2>
              <p className="mt-2 max-w-sm text-muted">Tap the ♥ on any product to save it here for later.</p>
              <Button to="/shop" className="mt-7">Explore products</Button>
            </div>
          )}
        </div>
      </section>

      {!products.length && (
        <section className="container-page section-space" aria-labelledby="wish-suggest">
          <SectionHeading eyebrow="Customer favourites" title={<span id="wish-suggest">You might love these</span>} />
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">
            {getBestSellers().slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
