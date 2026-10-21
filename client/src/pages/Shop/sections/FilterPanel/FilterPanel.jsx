import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiChevronDown, HiCheck } from 'react-icons/hi2';
import { getCategory } from '@/data/categories';
import { DISCOUNT_OPTIONS } from '@/hooks/useProductFilters';
import { swatchStyle } from '@/utils/format';
import PriceRange from './PriceRange';

/** Ek filter group – click se khulta/band hota hai */
function Group({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line py-5 first:pt-0 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left text-[15px] font-semibold text-ink"
      >
        {title}
        <HiChevronDown className={`text-muted transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckRow({ checked, onChange, label, count, disabled }) {
  return (
    <label className={`flex cursor-pointer items-center gap-3 py-1.5 text-[14.5px] ${disabled ? 'opacity-40' : 'text-ink-soft hover:text-ink'}`}>
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} disabled={disabled} />
      <span
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary ${
          checked ? 'border-primary bg-primary text-white' : 'border-ink/25 bg-white'
        }`}
      >
        {checked && <HiCheck size={13} />}
      </span>
      <span className="flex-1">{label}</span>
      <span className="text-xs tabular-nums text-muted">{count}</span>
    </label>
  );
}

/**
 * Saare filters. Desktop sidebar aur mobile drawer dono mein yahi use hota hai.
 * showCategory=false → category page pe category filter nahi dikhta
 */
export default function FilterPanel({ f, showCategory = true }) {
  const { filters, options, toggle, update } = f;

  return (
    <div>
      {showCategory && options.categories.length > 1 && (
        <Group title="Category">
          {options.categories.map((o) => (
            <CheckRow
              key={o.value}
              label={getCategory(o.value)?.name || o.value}
              count={o.count}
              checked={filters.categories.includes(o.value)}
              disabled={!o.count && !filters.categories.includes(o.value)}
              onChange={() => toggle('categories', o.value)}
            />
          ))}
        </Group>
      )}

      {options.colors.length > 0 && (
        <Group title="Colour">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {options.colors.map((o) => {
              const on = filters.colors.includes(o.value);
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => toggle('colors', o.value)}
                  aria-pressed={on}
                  disabled={!o.count && !on}
                  className={`flex min-w-0 items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-left text-[13.5px] transition-colors disabled:opacity-35 ${
                    on ? 'bg-blush font-medium text-ink' : 'text-ink-soft hover:bg-blush/60'
                  }`}
                >
                  <span
                    className={`h-5 w-5 shrink-0 rounded-full ring-offset-2 ${on ? 'ring-2 ring-primary' : 'ring-1 ring-ink/15'}`}
                    style={swatchStyle(o.hex)}
                  />
                  <span className="truncate">{o.value}</span>
                  <span className="ml-auto text-[11px] text-muted">{o.count}</span>
                </button>
              );
            })}
          </div>
        </Group>
      )}

      {options.sizes.length > 0 && (
        <Group title="Size">
          <div className="flex flex-wrap gap-2">
            {options.sizes.map((o) => {
              const on = filters.sizes.includes(o.value);
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => toggle('sizes', o.value)}
                  aria-pressed={on}
                  disabled={!o.count && !on}
                  className={`min-w-12 rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:opacity-35 ${
                    on ? 'border-primary bg-primary text-white' : 'border-line bg-white text-ink-soft hover:border-primary hover:text-primary'
                  }`}
                >
                  {o.value}
                </button>
              );
            })}
          </div>
        </Group>
      )}

      <Group title="Price">
        <PriceRange
          min={options.priceMin}
          max={options.priceMax}
          valueMin={filters.min}
          valueMax={filters.max}
          onChange={(min, max) => update({ min, max })}
        />
      </Group>

      <Group title="Discount">
        <div className="flex flex-wrap gap-2">
          {DISCOUNT_OPTIONS.map((d) => {
            const on = filters.discount === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => update({ discount: on ? null : d })}
                aria-pressed={on}
                className={`rounded-pill border px-4 py-2 text-sm font-medium transition-colors ${
                  on ? 'border-primary bg-primary text-white' : 'border-line bg-white text-ink-soft hover:border-primary hover:text-primary'
                }`}
              >
                {d}% or more
              </button>
            );
          })}
        </div>
      </Group>

      <Group title="Availability">
        <label className="flex cursor-pointer items-center justify-between gap-3 text-[14.5px] text-ink-soft">
          In stock only
          <input
            id="filter-in-stock"
            type="checkbox"
            className="peer sr-only"
            checked={filters.inStock}
            onChange={(e) => update({ inStock: e.target.checked })}
          />
          <span className="relative h-6 w-11 rounded-full bg-ink/15 transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:bg-primary peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-primary" />
        </label>
      </Group>
    </div>
  );
}
