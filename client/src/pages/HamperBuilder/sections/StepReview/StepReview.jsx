import { HiOutlinePencilSquare, HiOutlineTrash, HiOutlineShoppingBag } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';
import { formatPrice } from '@/utils/format';
import TreatIcon from '../TreatIcon';

function Block({ title, onEdit, children }) {
  return (
    <div className="rounded-2xl border border-line p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base">{title}</h3>
        <button type="button" onClick={onEdit} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
          <HiOutlinePencilSquare size={16} /> Edit
        </button>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/** Step 4 – sab check karo, phir cart ya WhatsApp */
export default function StepReview({ state, box, ribbon, totals, actions, onAddToCart, onWhatsApp, error }) {
  return (
    <div>
      <h2 className="text-2xl">Review your hamper</h2>
      <p className="mt-1 text-muted">Check everything once. You can edit any part.</p>

      <div className="mt-6 space-y-4">
        <Block title="Box" onEdit={() => actions.goTo(0)}>
          <div className="flex items-center gap-4">
            <img src={box.image.replace(/w=\d+&h=\d+/, 'w=160&h=160')} alt="" className="h-16 w-16 rounded-xl object-cover" />
            <div className="text-sm">
              <p className="font-medium text-ink">{box.name} · up to {box.capacity} items</p>
              <p className="mt-0.5 flex items-center gap-2 text-muted">
                <span className="h-3.5 w-3.5 rounded-full" style={{ background: ribbon.hex }} /> {ribbon.name} ribbon · {formatPrice(box.price)}
              </p>
            </div>
          </div>
        </Block>

        <Block title={`Items (${totals.count})`} onEdit={() => actions.goTo(1)}>
          <ul className="divide-y divide-line">
            {state.items.map((i) => (
              <li key={i.key} className="flex items-center gap-3 py-2.5">
                {i.kind === 'treat' ? (
                  <TreatIcon name={i.icon} tint={i.tint} size={22} className="h-12 w-12 shrink-0 rounded-xl" />
                ) : (
                  <img src={i.image?.replace(/w=\d+&h=\d+/, 'w=120&h=120')} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" />
                )}
                <div className="min-w-0 flex-1 text-sm">
                  <p className="truncate font-medium text-ink">{i.name}</p>
                  <p className="text-xs text-muted">
                    {[i.color, i.size && `Size ${i.size}`].filter(Boolean).join(' · ') || (i.kind === 'treat' ? 'Treat' : '')}
                  </p>
                </div>
                <span className="text-sm tabular-nums text-ink-soft">{i.qty} × {formatPrice(i.price)}</span>
                <button type="button" onClick={() => actions.remove(i.key)} aria-label={`Remove ${i.name}`} className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-blush hover:text-primary">
                  <HiOutlineTrash size={16} />
                </button>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Card" onEdit={() => actions.goTo(2)}>
          <div className="text-sm text-ink-soft">
            <p><span className="text-muted">Occasion:</span> {state.occasion}</p>
            {(state.to || state.from) && (
              <p className="mt-1"><span className="text-muted">To / From:</span> {state.to || '—'} / {state.from || '—'}</p>
            )}
            <p className="mt-1 italic">{state.message ? `“${state.message}”` : 'No message'}</p>
            <p className="mt-1 text-muted">{state.hidePrices ? 'Prices hidden inside the hamper' : 'Prices shown'}</p>
          </div>
        </Block>
      </div>

      {error && <p className="mt-4 text-sm font-medium text-primary-dark" role="alert">{error}</p>}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onAddToCart}
          disabled={!!error}
          className="flex h-13 items-center justify-center gap-2 rounded-pill bg-primary text-[15px] font-medium text-white shadow-soft transition-colors hover:bg-primary-dark disabled:bg-ink/30 disabled:shadow-none"
        >
          <HiOutlineShoppingBag size={19} /> Add hamper to cart · {formatPrice(totals.total)}
        </button>
        <button
          type="button"
          onClick={onWhatsApp}
          disabled={!!error}
          className="flex h-13 items-center justify-center gap-2 rounded-pill bg-whatsapp text-[15px] font-medium text-white hover:brightness-95 disabled:opacity-40"
        >
          <FaWhatsapp size={20} /> Order on WhatsApp
        </button>
      </div>
      <button type="button" onClick={actions.reset} className="mt-4 text-sm text-muted hover:text-primary">
        Start over
      </button>
    </div>
  );
}
