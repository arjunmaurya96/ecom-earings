import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiChevronDown, HiCheck, HiXMark, HiOutlineSquares2X2, HiOutlineViewColumns } from 'react-icons/hi2';
import { SORT_OPTIONS } from '@/hooks/useProductFilters';
import { getCategory } from '@/data/categories';
import { formatPrice, swatchStyle } from '@/utils/format';

/** Sort dropdown (custom, brand style) */
export function SortMenu({ value, onChange, align = 'right' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = SORT_OPTIONS.find((o) => o.value === value) || SORT_OPTIONS[0];

  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-11 items-center gap-2 rounded-pill border border-line bg-white px-4 text-sm text-ink-soft transition-colors hover:border-primary/40"
      >
        Sort: <span className="font-medium text-ink">{current.label}</span>
        <HiChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            role="listbox"
            className={`absolute top-full z-30 mt-2 w-60 overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-lift ${align === 'right' ? 'right-0' : 'left-0'}`}
          >
            {SORT_OPTIONS.map((o) => (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={o.value === value}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm ${
                    o.value === value ? 'bg-blush font-medium text-primary' : 'text-ink-soft hover:bg-cream'
                  }`}
                >
                  {o.label}
                  {o.value === value && <HiCheck />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Lage hue filters chips mein – ✕ se hatao */
export function ActiveFilters({ f, lockedCategory }) {
  const { filters, toggle, update, clearAll, activeCount, options } = f;
  if (!activeCount) return null;

  const chip = (key, label, onRemove, swatch) => (
    <button
      key={key}
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 rounded-pill bg-blush py-1.5 pl-3 pr-2 text-[13px] font-medium text-ink transition-colors hover:bg-blush-deep"
    >
      {swatch && <span className="h-3.5 w-3.5 rounded-full ring-1 ring-ink/10" style={swatchStyle(swatch)} />}
      {label}
      <HiXMark size={14} className="text-muted" />
    </button>
  );

  const price =
    filters.min !== null || filters.max !== null
      ? `${formatPrice(filters.min ?? options.priceMin)} – ${formatPrice(filters.max ?? options.priceMax)}`
      : null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {!lockedCategory && filters.categories.map((c) => chip(`c-${c}`, getCategory(c)?.name || c, () => toggle('categories', c)))}
      {filters.colors.map((c) =>
        chip(`col-${c}`, c, () => toggle('colors', c), options.colors.find((o) => o.value === c)?.hex),
      )}
      {filters.sizes.map((s) => chip(`s-${s}`, `Size ${s}`, () => toggle('sizes', s)))}
      {price && chip('price', price, () => update({ min: null, max: null }))}
      {filters.discount && chip('disc', `${filters.discount}%+ off`, () => update({ discount: null }))}
      {filters.inStock && chip('stock', 'In stock', () => update({ inStock: false }))}
      <button type="button" onClick={clearAll} className="ml-1 text-[13px] font-medium text-primary underline-offset-4 hover:underline">
        Clear all
      </button>
    </div>
  );
}

/** Count + sort + grid size (desktop) */
export default function ShopToolbar({ shown, total, sort, onSort, cols, onCols }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted">
        Showing <span className="font-semibold text-ink">{shown}</span> of{' '}
        <span className="font-semibold text-ink">{total}</span> products
      </p>
      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-1 rounded-pill border border-line bg-white p-1 xl:flex" role="group" aria-label="Grid size">
          {[
            { n: 3, icon: HiOutlineViewColumns },
            { n: 4, icon: HiOutlineSquares2X2 },
          ].map(({ n, icon: Icon }) => (
            <button
              key={n}
              type="button"
              onClick={() => onCols(n)}
              aria-pressed={cols === n}
              aria-label={`${n} per row`}
              className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${cols === n ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}
            >
              <Icon size={17} />
            </button>
          ))}
        </div>
        <div className="hidden lg:block">
          <SortMenu value={sort} onChange={onSort} />
        </div>
      </div>
    </div>
  );
}
