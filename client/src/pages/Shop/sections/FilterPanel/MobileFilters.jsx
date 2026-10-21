import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineAdjustmentsHorizontal, HiXMark, HiCheck } from 'react-icons/hi2';
import { SORT_OPTIONS } from '@/hooks/useProductFilters';
import Portal from '@/components/ui/Portal';
import useOverlay from '@/hooks/useOverlay';
import FilterPanel from './FilterPanel';

/** Bottom sheet (mobile) */
function Sheet({ open, onClose, title, children, footer }) {
  useOverlay(open, onClose);
  return (
    <Portal>
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[150] bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-label={title}
            className="fixed inset-x-0 bottom-0 z-[151] flex max-h-[88vh] flex-col rounded-t-3xl bg-white shadow-lift"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto mt-2.5 h-1.5 w-12 rounded-full bg-line" />
            <div className="flex items-center justify-between px-5 py-3">
              <h2 className="text-lg">{title}</h2>
              <button type="button" onClick={onClose} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full hover:bg-blush">
                <HiXMark size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-4" data-lenis-prevent>
              {children}
            </div>
            {footer && <div className="border-t border-line p-4">{footer}</div>}
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </Portal>
  );
}

/** Mobile: neeche chipki hui "Filter | Sort" bar + sheets */
export default function MobileFilters({ f, showCategory, resultCount }) {
  const [sheet, setSheet] = useState(null);

  return (
    <>
      <div className="sticky top-[84px] z-30 -mx-4 mb-5 flex gap-2 bg-white/90 px-4 py-2.5 backdrop-blur-md lg:hidden">
        <button
          type="button"
          onClick={() => setSheet('filter')}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-pill border border-line bg-white text-sm font-medium text-ink"
        >
          <HiOutlineAdjustmentsHorizontal size={18} />
          Filter
          {f.activeCount > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] text-white">{f.activeCount}</span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setSheet('sort')}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-pill border border-line bg-white text-sm font-medium text-ink"
        >
          Sort
          <span className="max-w-[90px] truncate font-normal text-muted">
            · {SORT_OPTIONS.find((o) => o.value === f.filters.sort)?.label}
          </span>
        </button>
      </div>

      <Sheet
        open={sheet === 'filter'}
        onClose={() => setSheet(null)}
        title="Filters"
        footer={
          <div className="flex gap-3">
            <button type="button" onClick={f.clearAll} className="h-12 flex-1 rounded-pill border border-line text-sm font-medium text-ink">
              Clear all
            </button>
            <button type="button" onClick={() => setSheet(null)} className="h-12 flex-[2] rounded-pill bg-primary text-sm font-medium text-white">
              Show {resultCount} {resultCount === 1 ? 'product' : 'products'}
            </button>
          </div>
        }
      >
        <FilterPanel f={f} showCategory={showCategory} />
      </Sheet>

      <Sheet open={sheet === 'sort'} onClose={() => setSheet(null)} title="Sort by">
        <ul className="pb-2">
          {SORT_OPTIONS.map((o) => {
            const on = f.filters.sort === o.value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  onClick={() => {
                    f.update({ sort: o.value === 'popular' ? null : o.value });
                    setSheet(null);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[15px] ${on ? 'bg-blush font-medium text-primary' : 'text-ink'}`}
                >
                  {o.label}
                  {on && <HiCheck />}
                </button>
              </li>
            );
          })}
        </ul>
      </Sheet>
    </>
  );
}
