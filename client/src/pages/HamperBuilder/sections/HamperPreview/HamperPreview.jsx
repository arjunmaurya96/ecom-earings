import { AnimatePresence, motion } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2';
import { formatPrice } from '@/utils/format';
import TreatIcon from '../TreatIcon';

/** Ek slot – item ki photo/icon ya khaali dashed jagah */
function Slot({ item, onRemove }) {
  if (!item) return <span className="aspect-square rounded-2xl border-2 border-dashed border-white/70 bg-white/30" />;
  return (
    <motion.div
      layout
      initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0.4, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className="group relative aspect-square overflow-hidden rounded-2xl bg-white shadow-card"
      title={item.name}
    >
      {item.kind === 'treat' ? (
        <TreatIcon name={item.icon} tint={item.tint} size={26} className="h-full w-full" />
      ) : (
        <img src={item.image?.replace(/w=\d+&h=\d+/, 'w=200&h=200')} alt={item.name} className="h-full w-full object-cover" />
      )}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${item.name}`}
          className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow transition-opacity group-hover:opacity-100 focus:opacity-100"
        >
          <HiXMark size={13} />
        </button>
      )}
    </motion.div>
  );
}

/**
 * LIVE PREVIEW – box ka drawing, ribbon colour, andar ke items, price
 * Items qty ke hisaab se slots mein dikhte hain
 */
export default function HamperPreview({ state, box, ribbon, totals, actions, compact = false }) {
  const units = state.items.flatMap((i) => Array.from({ length: i.qty }, (_, n) => ({ ...i, unitKey: `${i.key}-${n}` })));
  const slots = Array.from({ length: Math.max(box.capacity, units.length) }, (_, i) => units[i] || null);
  const cols = box.capacity <= 3 ? 'grid-cols-3' : box.capacity <= 5 ? 'grid-cols-3' : 'grid-cols-4';

  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-lg">Your hamper</h2>
        <span className={`rounded-pill px-3 py-1 text-xs font-semibold ${totals.over ? 'bg-primary/10 text-primary-dark' : 'bg-blush text-ink'}`}>
          {totals.count}/{box.capacity} items
        </span>
      </div>

      {/* Box drawing */}
      <div className="relative mt-5">
        {/* Bow */}
        <div className="absolute -top-4 left-1/2 z-10 flex -translate-x-1/2 items-center">
          <span className="h-7 w-10 -rotate-12 rounded-[60%_40%_50%_50%] border-4" style={{ borderColor: ribbon.hex, background: `${ribbon.hex}33` }} />
          <span className="z-10 -mx-1.5 h-4 w-4 rounded-full" style={{ background: ribbon.hex }} />
          <span className="h-7 w-10 rotate-12 rounded-[40%_60%_50%_50%] border-4" style={{ borderColor: ribbon.hex, background: `${ribbon.hex}33` }} />
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blush to-blush-deep p-4 pt-6 shadow-inner">
          {/* Ribbon bands */}
          <span className="pointer-events-none absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 opacity-80" style={{ background: ribbon.hex }} />
          <span className="pointer-events-none absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 opacity-80" style={{ background: ribbon.hex }} />
          <div className={`relative grid ${cols} gap-2.5`}>
            <AnimatePresence mode="popLayout">
              {slots.map((u, i) => (
                <Slot key={u ? u.unitKey : `empty-${i}`} item={u} onRemove={u && !compact ? () => actions.dec(u.key) : null} />
              ))}
            </AnimatePresence>
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-muted">
          {box.name} · {ribbon.name} ribbon{state.occasion ? ` · ${state.occasion}` : ''}
        </p>
      </div>

      {!compact && (
        <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm text-ink-soft">
          <div className="flex justify-between">
            <dt>{box.name}</dt>
            <dd className="tabular-nums">{formatPrice(totals.boxPrice)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Items ({totals.count})</dt>
            <dd className="tabular-nums">{formatPrice(totals.itemsTotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Card + wrapping</dt>
            <dd className="font-medium text-success">Free</dd>
          </div>
          <div className="flex items-baseline justify-between border-t border-dashed border-ink/15 pt-3">
            <dt className="text-base font-semibold text-ink">Hamper total</dt>
            <dd className="text-xl font-semibold tabular-nums text-ink">{formatPrice(totals.total)}</dd>
          </div>
          {totals.mrp > totals.total && <p className="text-right text-xs font-medium text-success">You save {formatPrice(totals.mrp - totals.total)}</p>}
        </dl>
      )}
    </div>
  );
}
