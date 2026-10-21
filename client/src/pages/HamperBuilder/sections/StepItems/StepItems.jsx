import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiMinus, HiMagnifyingGlass } from 'react-icons/hi2';
import { HAMPER_PRODUCTS, HAMPER_TREATS, ITEM_GROUPS } from '@/data/hamper';
import { getProductImage } from '@/data/products';
import { formatPrice } from '@/utils/format';
import ColorSwatches from '@/components/ui/ColorSwatches';
import TreatIcon from '../TreatIcon';

/** + / – ya "Add" button */
function AddControl({ qty, onAdd, onDec, disabled, name }) {
  if (!qty) {
    return (
      <button
        type="button"
        onClick={onAdd}
        disabled={disabled}
        className="flex h-9 w-full items-center justify-center gap-1.5 rounded-pill bg-ink text-[13px] font-medium text-white transition-colors hover:bg-primary disabled:bg-ink/25"
        aria-label={`Add ${name} to hamper`}
      >
        <HiPlus size={14} /> {disabled ? 'Box is full' : 'Add'}
      </button>
    );
  }
  return (
    <div className="flex h-9 items-center justify-between rounded-pill bg-primary text-white">
      <button type="button" onClick={onDec} aria-label={`Remove one ${name}`} className="grid h-full w-10 place-items-center">
        <HiMinus size={14} />
      </button>
      <span className="text-sm font-semibold tabular-nums">{qty} in box</span>
      <button type="button" onClick={onAdd} disabled={disabled} aria-label={`Add one more ${name}`} className="grid h-full w-10 place-items-center disabled:opacity-40">
        <HiPlus size={14} />
      </button>
    </div>
  );
}

function ProductItem({ product, items, actions, full }) {
  const firstColor = product.colors.find((c) => c.stock > 0) || product.colors[0] || null;
  const firstSize = product.sizes.find((s) => s.stock > 0) || null;
  const [color, setColor] = useState(firstColor);
  const [size, setSize] = useState(firstSize);
  const key = `${product.id}|${color?.name || '-'}|${size?.label || '-'}`;
  const inBox = items.find((i) => i.key === key)?.qty || 0;
  const out = (color && color.stock === 0) || (size && size.stock === 0);

  const add = () =>
    actions.add({
      key,
      id: product.id,
      kind: 'product',
      name: product.name,
      image: getProductImage(product, color),
      price: product.price,
      mrp: product.mrp,
      color: color?.name || null,
      size: size?.label || null,
    });

  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-colors ${inBox ? 'border-primary' : 'border-line'}`}>
      <div className="relative bg-blush">
        <img src={getProductImage(product, color)?.replace(/w=\d+&h=\d+/, 'w=400&h=400')} alt={product.name} loading="lazy" className="aspect-square w-full object-cover" />
        {inBox > 0 && (
          <span className="absolute right-2 top-2 grid h-7 min-w-7 place-items-center rounded-full bg-primary px-1.5 text-xs font-semibold text-white">{inBox}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-2 text-[13.5px] font-medium leading-snug text-ink">{product.name}</h3>
        <p className="text-sm font-semibold text-primary">{formatPrice(product.price)}</p>
        {product.hasColors && product.colors.length > 1 && (
          <ColorSwatches colors={product.colors} selected={color?.name} onSelect={setColor} max={4} />
        )}
        {product.hasSizes && (
          <select
            value={size?.label || ''}
            onChange={(e) => setSize(product.sizes.find((s) => s.label === e.target.value))}
            aria-label={`Size for ${product.name}`}
            className="h-8 rounded-lg border border-line bg-white px-2 text-xs text-ink"
          >
            {product.sizes.map((s) => (
              <option key={s.label} value={s.label} disabled={s.stock === 0}>
                Size {s.label}{s.stock === 0 ? ' – sold out' : ''}
              </option>
            ))}
          </select>
        )}
        <div className="mt-auto pt-1">
          {out ? (
            <p className="py-2 text-center text-xs font-medium text-muted">Out of stock</p>
          ) : (
            <AddControl qty={inBox} onAdd={add} onDec={() => actions.dec(key)} disabled={full} name={product.name} />
          )}
        </div>
      </div>
    </article>
  );
}

function TreatItem({ treat, items, actions, full }) {
  const inBox = items.find((i) => i.key === treat.id)?.qty || 0;
  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-white ${inBox ? 'border-primary' : 'border-line'}`}>
      <div className="relative">
        <TreatIcon name={treat.icon} tint={treat.tint} size={56} className="aspect-square w-full" />
        {inBox > 0 && (
          <span className="absolute right-2 top-2 grid h-7 min-w-7 place-items-center rounded-full bg-primary px-1.5 text-xs font-semibold text-white">{inBox}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="text-[13.5px] font-medium leading-snug text-ink">{treat.name}</h3>
        <p className="text-sm font-semibold text-primary">{formatPrice(treat.price)}</p>
        <div className="mt-auto pt-1">
          <AddControl
            qty={inBox}
            onAdd={() => actions.add({ key: treat.id, id: treat.id, kind: 'treat', name: treat.name, icon: treat.icon, tint: treat.tint, price: treat.price, mrp: treat.price })}
            onDec={() => actions.dec(treat.id)}
            disabled={full}
            name={treat.name}
          />
        </div>
      </div>
    </article>
  );
}

/** Step 2 – items chuno (tabs + search) */
export default function StepItems({ state, actions, totals, box }) {
  const [tab, setTab] = useState('all');
  const [q, setQ] = useState('');

  const group = ITEM_GROUPS.find((g) => g.id === tab);
  const products = useMemo(() => {
    if (tab === 'treats') return [];
    const term = q.trim().toLowerCase();
    return HAMPER_PRODUCTS.filter((p) => (!group?.categories || group.categories.includes(p.category)) && (!term || p.name.toLowerCase().includes(term)));
  }, [tab, q, group]);
  const treats = tab === 'all' || tab === 'treats' ? HAMPER_TREATS.filter((t) => !q || t.name.toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl">Fill your {box.name}</h2>
          <p className="mt-1 text-muted">
            {totals.full ? 'Your box is full. Remove something or choose a bigger box.' : `You can add ${totals.left} more ${totals.left === 1 ? 'item' : 'items'}.`}
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <div className="flex items-center gap-2 text-sm font-medium text-ink">
            <span className="tabular-nums">{totals.count}/{box.capacity}</span>
            <div className="h-2 w-40 overflow-hidden rounded-full bg-line">
              <motion.div className={`h-full rounded-full ${totals.over ? 'bg-primary-dark' : 'bg-primary'}`} animate={{ width: `${Math.min(100, (totals.count / box.capacity) * 100)}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0" role="tablist">
          {ITEM_GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={tab === g.id}
              onClick={() => setTab(g.id)}
              className={`shrink-0 rounded-pill px-4 py-2 text-sm font-medium transition-colors ${tab === g.id ? 'bg-primary text-white' : 'border border-line bg-white text-ink-soft hover:text-primary'}`}
            >
              {g.label}
            </button>
          ))}
        </div>
        <label className="flex h-10 items-center gap-2 rounded-pill border border-line bg-white px-4 md:w-60">
          <HiMagnifyingGlass className="text-muted" />
          <span className="sr-only">Search items</span>
          <input id="hamper-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search items" className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted" />
        </label>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {treats.map((t) => (
          <TreatItem key={t.id} treat={t} items={state.items} actions={actions} full={totals.full} />
        ))}
        {products.map((p) => (
          <ProductItem key={p.id} product={p} items={state.items} actions={actions} full={totals.full} />
        ))}
      </div>
      {!products.length && !treats.length && <p className="mt-8 text-center text-muted">No items match “{q}”.</p>}
    </div>
  );
}
