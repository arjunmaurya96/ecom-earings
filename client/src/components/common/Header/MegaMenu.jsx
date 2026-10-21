import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CATEGORY_GROUPS } from '@/config/navigation';
import { CATEGORIES } from '@/data/categories';

/** Desktop "Shop" dropdown – category groups + 2 featured tiles */
export default function MegaMenu({ open, onClose }) {
  const featured = CATEGORIES.filter((c) => ['hamper', 'floral-claw'].includes(c.slug));
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-full z-50 pt-3"
        >
          <div className="container-page">
            <div className="grid grid-cols-[1fr_auto] gap-10 rounded-card border border-line bg-white p-8 shadow-lift">
              <div className="grid grid-cols-4 gap-8">
                {CATEGORY_GROUPS.map((g) => (
                  <div key={g.title}>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">{g.title}</p>
                    <ul className="space-y-2.5">
                      {g.items.map((it) => (
                        <li key={it.to}>
                          <Link to={it.to} onClick={onClose} className="text-[14.5px] text-ink-soft transition-colors hover:text-primary">
                            {it.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                {featured.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/category/${c.slug}`}
                    onClick={onClose}
                    className="group relative block w-40 overflow-hidden rounded-2xl"
                  >
                    <img src={c.image} alt={c.name} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute inset-x-2 bottom-2 rounded-pill bg-white/90 py-1.5 text-center text-xs font-medium text-ink backdrop-blur">
                      {c.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
