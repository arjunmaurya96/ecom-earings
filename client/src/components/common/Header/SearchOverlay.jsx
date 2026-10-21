import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { PRODUCTS, getProductImage } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { formatPrice } from '@/utils/format';
import Portal from '@/components/ui/Portal';
import useOverlay from '@/hooks/useOverlay';

/** Search popup – type karte hi products suggest hote hain */
export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useOverlay(open, onClose);
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return PRODUCTS.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(term)).slice(0, 5);
  }, [q]);

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(q.trim())}`);
    onClose();
  };

  return (
    <Portal>
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] bg-ink/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-lenis-prevent
        >
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white shadow-lift"
          >
            <div className="container-page py-6">
              <form onSubmit={submit} className="flex items-center gap-3 rounded-pill border border-line bg-cream px-5">
                <HiMagnifyingGlass size={20} className="text-muted" />
                <input
                  id="site-search"
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search claw clips, jhumka, hampers…"
                  className="h-14 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted"
                  aria-label="Search products"
                />
                <button type="button" onClick={onClose} aria-label="Close search" className="grid h-9 w-9 place-items-center rounded-full hover:bg-blush">
                  <HiXMark size={20} />
                </button>
              </form>

              {results.length > 0 ? (
                <ul className="mt-4 divide-y divide-line">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link to={`/product/${p.slug}`} onClick={onClose} className="flex items-center gap-4 py-3 hover:text-primary">
                        <img src={getProductImage(p)} alt="" className="h-14 w-12 rounded-lg object-cover" />
                        <span className="flex-1 text-[15px] font-medium text-ink">{p.name}</span>
                        <span className="text-sm font-semibold text-primary">{formatPrice(p.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {q ? 'No products found. Try a category:' : 'Popular categories'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((c) => (
                      <Link
                        key={c.slug}
                        to={`/category/${c.slug}`}
                        onClick={onClose}
                        className="rounded-pill border border-line px-4 py-2 text-sm text-ink-soft hover:border-primary hover:text-primary"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </Portal>
  );
}
