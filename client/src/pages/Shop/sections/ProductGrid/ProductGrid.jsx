import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineFaceFrown } from 'react-icons/hi2';
import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';

const COLS = {
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
};

/** Products grid + "Load more" + empty state */
export default function ProductGrid({ products, visible, onLoadMore, cols = 3, onClear }) {
  if (!products.length) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-dashed border-line bg-cream px-6 py-16 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-primary shadow-card">
          <HiOutlineFaceFrown size={26} />
        </span>
        <h2 className="mt-5 text-xl">No products match these filters</h2>
        <p className="mt-2 max-w-sm text-[15px] text-muted">Try removing a filter or widening the price range.</p>
        <Button onClick={onClear} className="mt-6">Clear filters</Button>
      </div>
    );
  }

  const shown = products.slice(0, visible);
  const left = products.length - shown.length;

  return (
    <div>
      <motion.ul layout className={`grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 ${COLS[cols]}`}>
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <ProductCard product={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {left > 0 && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-sm text-muted">
            You have seen {shown.length} of {products.length} products
          </p>
          <div className="h-1 w-48 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${(shown.length / products.length) * 100}%` }} />
          </div>
          <Button variant="outline" onClick={onLoadMore} className="mt-2">
            Load more ({left})
          </Button>
        </div>
      )}
    </div>
  );
}
