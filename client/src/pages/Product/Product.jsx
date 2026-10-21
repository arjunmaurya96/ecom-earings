import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { HiChevronRight, HiOutlineShoppingBag } from 'react-icons/hi2';
import { getProductBySlug, getProductGallery } from '@/data/products';
import { getCategory } from '@/data/categories';
import { getProductDetails, getSizeGuide } from '@/data/productDetails';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { SITE } from '@/config/site.config';
import { formatPrice, discountPercent } from '@/utils/format';
import { whatsappLink, productOrderMessage } from '@/utils/whatsapp';
import Button from '@/components/ui/Button';

import ProductGallery from './sections/ProductGallery/ProductGallery';
import ProductInfo from './sections/ProductInfo/ProductInfo';
import ProductTabs from './sections/ProductTabs/ProductTabs';
import ProductReviews from './sections/ProductReviews/ProductReviews';
import RelatedProducts from './sections/RelatedProducts/RelatedProducts';

/**
 * PRODUCT DETAIL PAGE  →  /product/:slug
 * Sections: Breadcrumb → [Gallery | Info] → Tabs → Reviews → Related
 * Mobile pe neeche sticky "Add to cart" bar (jab main button scroll ho jaaye)
 */
export default function Product() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <section className="container-page grid min-h-[50vh] place-items-center py-16 text-center">
        <div>
          <h1 className="text-3xl">This product is not available</h1>
          <p className="mt-3 text-muted">It may have been removed or the link is wrong.</p>
          <Button to="/shop" className="mt-6">Browse all products</Button>
        </div>
      </section>
    );
  }
  // key → naya product khulne pe saari state reset
  return <ProductView key={product.id} product={product} />;
}

function ProductView({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const category = getCategory(product.category);
  const details = getProductDetails(product);
  const sizeGuide = getSizeGuide(product);
  const gallery = useMemo(() => getProductGallery(product), [product]);

  const firstColor = product.colors.find((c) => c.stock > 0) || product.colors[0] || null;
  const [color, setColorState] = useState(firstColor);
  const [size, setSizeState] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState('');
  const [activeImg, setActiveImg] = useState(Math.max(0, gallery.indexOf(firstColor?.image)));
  const addRef = useRef(null);
  const [showBar, setShowBar] = useState(false);

  // Stock: color aur size dono ka dhyan
  const colorStock = product.hasColors ? color?.stock ?? 0 : 99;
  const sizeStock = product.hasSizes ? (size ? size.stock : 99) : 99;
  const maxQty = Math.max(1, Math.min(10, colorStock, sizeStock));
  const available = colorStock > 0 && sizeStock > 0;

  const setColor = (c) => {
    setColorState(c);
    setError('');
    const i = gallery.indexOf(c.image);
    if (i >= 0) setActiveImg(i);
  };
  const setSize = (s) => {
    setSizeState(s);
    setError('');
  };

  // Galat quantity theek karo jab stock kam ho
  useEffect(() => {
    if (qty > maxQty) setQty(maxQty);
  }, [maxQty, qty]);

  // Mobile sticky bar: main buttons dikhna band ho to bar dikhao
  useEffect(() => {
    const el = addRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const validate = () => {
    if (product.hasColors && !color) return 'Please select a colour';
    if (product.hasSizes && !size) return 'Please select a size';
    if (!available) return 'This option is out of stock';
    return '';
  };

  const doAdd = () => {
    const msg = validate();
    if (msg) {
      setError(msg);
      addRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    addToCart(product, { color: color?.name, size: size?.label, qty, image: color?.image || product.image });
    return true;
  };

  const actions = {
    setColor,
    setSize,
    setQty,
    addToCart: doAdd,
    buyNow: () => doAdd() && navigate('/checkout'),
    toggleWishlist: () => toggleWishlist(product),
    orderOnWhatsApp: () => {
      const msg = productOrderMessage(product, { color: color?.name, size: size?.label, qty });
      window.open(whatsappLink(msg), '_blank', 'noopener');
    },
  };

  const off = discountPercent(product.price, product.mrp);
  const badges = (
    <>
      {off > 0 && <span className="rounded-pill bg-primary px-3 py-1 text-xs font-semibold text-white">-{off}%</span>}
      {product.isBestSeller && <span className="rounded-pill bg-ink px-3 py-1 text-xs font-semibold text-gold-light">Best seller</span>}
      {product.isNew && <span className="rounded-pill bg-white px-3 py-1 text-xs font-semibold text-ink shadow-card">New</span>}
    </>
  );

  // Google ke liye product info (rich results: price, rating)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: gallery,
    description: details.about,
    sku: `PA-${product.id.toUpperCase()}`,
    brand: { '@type': 'Brand', name: SITE.name },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviewCount },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      availability: available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${SITE.url}/product/${product.slug}`,
    },
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name} | ${SITE.name}`}</title>
        <meta name="description" content={`${product.name} at ${formatPrice(product.price)}. ${details.about}`} />
        <meta property="og:title" content={product.name} />
        <meta property="og:image" content={gallery[0]} />
        <link rel="canonical" href={`${SITE.url}/product/${product.slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <nav className="container-page" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
          <li><Link to="/" className="hover:text-primary">Home</Link></li>
          <li className="flex items-center gap-1.5"><HiChevronRight size={12} /><Link to="/shop" className="hover:text-primary">Shop</Link></li>
          <li className="flex items-center gap-1.5">
            <HiChevronRight size={12} />
            <Link to={`/category/${product.category}`} className="hover:text-primary">{category?.name}</Link>
          </li>
          <li className="flex min-w-0 items-center gap-1.5">
            <HiChevronRight size={12} />
            <span className="truncate font-medium text-ink" aria-current="page">{product.name}</span>
          </li>
        </ol>
      </nav>

      {/* Gallery + Info */}
      <section className="container-page mt-5 md:mt-8">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <ProductGallery images={gallery} active={activeImg} onChange={setActiveImg} name={product.name} badges={badges} />
          </div>
          <div className="min-w-0">
          <ProductInfo
            product={product}
            sizeGuide={sizeGuide}
            addRef={addRef}
            state={{ color, size, qty, error, maxQty, available, wishlisted: isWishlisted(product.id) }}
            actions={actions}
          />
          </div>
        </div>
      </section>

      <ProductTabs product={product} details={details} />
      <ProductReviews product={product} />
      <RelatedProducts product={product} />

      {/* Mobile sticky add-to-cart bar */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 shadow-lift backdrop-blur-md lg:hidden"
          >
            <div className="flex items-center gap-3 pr-16">
              <img src={gallery[activeImg]?.replace(/w=\d+&h=\d+/, 'w=100&h=125')} alt="" className="h-12 w-10 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-sm font-medium text-ink">{product.name}</p>
                <p className="text-sm font-semibold text-primary">
                  {formatPrice(product.price)}
                  {color && <span className="font-normal text-muted"> · {color.name}</span>}
                  {size && <span className="font-normal text-muted"> · {size.label}</span>}
                </p>
              </div>
              <button
                type="button"
                onClick={actions.addToCart}
                disabled={!available}
                className="flex h-11 shrink-0 items-center gap-1.5 rounded-pill bg-primary px-4 text-sm font-medium text-white disabled:bg-ink/30"
              >
                <HiOutlineShoppingBag size={17} /> Add
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
