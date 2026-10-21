import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getBestSellers } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductCard from '@/components/ui/ProductCard';

const TABS = ['All', 'Hair Accessories', 'Earrings', 'Jewellery', 'Gifts'];

/** Best sellers – tabs se group filter */
export default function BestSellers() {
  const [tab, setTab] = useState('All');
  const products = useMemo(() => {
    const all = getBestSellers();
    if (tab === 'All') return all.slice(0, 8);
    const slugs = CATEGORIES.filter((c) => c.group === tab).map((c) => c.slug);
    return all.filter((p) => slugs.includes(p.category));
  }, [tab]);

  return (
    <section className="bg-cream section-space" aria-labelledby="best-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="Customer favourites"
          title={<span id="best-heading">Best sellers</span>}
          subtitle="The pieces our customers keep coming back for."
          link={{ label: 'Shop all', to: '/shop?sort=popular' }}
        />

        <div className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4" role="tablist" aria-label="Filter best sellers">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`relative shrink-0 rounded-pill px-5 py-2.5 text-sm font-medium transition-colors ${
                tab === t ? 'text-white' : 'border border-line bg-white text-ink-soft hover:text-primary'
              }`}
            >
              {tab === t && (
                <motion.span layoutId="best-tab" className="absolute inset-0 rounded-pill bg-primary" transition={{ type: 'spring', duration: 0.5 }} />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {products.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
