import { Helmet } from 'react-helmet-async';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { useCart } from '@/context/CartContext';
import { getBestSellers } from '@/data/products';
import { SITE } from '@/config/site.config';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/ui/ProductCard';
import SectionHeading from '@/components/ui/SectionHeading';
import CartItems from './sections/CartItems/CartItems';
import OrderSummary from './sections/OrderSummary/OrderSummary';

/** Cart ke saath dikhne wale suggestions (jo cart mein nahi hain) */
function Suggestions({ exclude = [] }) {
  const list = getBestSellers().filter((p) => !exclude.includes(p.id)).slice(0, 4);
  return (
    <section className="container-page section-space" aria-labelledby="cart-suggest">
      <SectionHeading eyebrow="Add a little extra" title={<span id="cart-suggest">Customers also bought</span>} />
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

/**
 * CART PAGE  →  /cart
 * Sections: Items | Summary (coupon, gift wrap, price breakup) → Suggestions
 */
export default function Cart() {
  const { items, count } = useCart();

  return (
    <>
      <Helmet>
        <title>{`Your cart (${count}) | ${SITE.name}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h1 className="text-[2rem] md:text-[2.5rem]">Shopping cart</h1>
          {count > 0 && <p className="pb-1.5 text-muted">{count} {count === 1 ? 'item' : 'items'}</p>}
        </div>

        {items.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-3xl bg-cream px-6 py-16 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-white text-primary shadow-card">
              <HiOutlineShoppingBag size={34} />
            </span>
            <h2 className="mt-6 text-2xl">Your cart is empty</h2>
            <p className="mt-2 max-w-sm text-muted">Looks like you have not added anything yet. Explore our latest collection.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button to="/shop">Start shopping</Button>
              <Button to="/wishlist" variant="outline">View wishlist</Button>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12">
            <div className="min-w-0">
              <CartItems />
            </div>
            <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start" aria-label="Order summary">
              <OrderSummary />
            </aside>
          </div>
        )}
      </section>

      <Suggestions exclude={items.map((i) => i.id)} />
    </>
  );
}
