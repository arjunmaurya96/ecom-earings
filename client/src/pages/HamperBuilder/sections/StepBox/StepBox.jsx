import { HiCheckCircle } from 'react-icons/hi2';
import { HAMPER_BOXES, RIBBONS } from '@/data/hamper';
import { formatPrice } from '@/utils/format';

/** Step 1 – box size + ribbon colour */
export default function StepBox({ state, actions, totals }) {
  return (
    <div>
      <h2 className="text-2xl">Choose your box</h2>
      <p className="mt-1 text-muted">The box decides how many items fit inside.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3" role="radiogroup" aria-label="Box size">
        {HAMPER_BOXES.map((b) => {
          const on = state.boxId === b.id;
          const tooSmall = totals.count > b.capacity;
          return (
            <button
              key={b.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => actions.setBox(b.id)}
              className={`group relative overflow-hidden rounded-3xl border-2 bg-white text-left transition-all duration-300 ${
                on ? 'border-primary shadow-soft' : 'border-line hover:border-primary/40'
              }`}
            >
              <div className="relative overflow-hidden bg-blush">
                <img src={b.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {b.popular && (
                  <span className="absolute left-3 top-3 rounded-pill bg-ink px-2.5 py-1 text-[11px] font-semibold text-gold-light">Most popular</span>
                )}
                {on && <HiCheckCircle className="absolute right-3 top-3 rounded-full bg-white text-primary" size={28} />}
              </div>
              <div className="p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-lg">{b.name}</h3>
                  <span className="font-semibold text-primary">{formatPrice(b.price)}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-ink">Up to {b.capacity} items · {b.size}</p>
                <p className="mt-1 text-sm text-muted">{b.text}</p>
                {tooSmall && <p className="mt-2 text-xs font-medium text-primary-dark">You have {totals.count} items – too many for this box</p>}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <p className="text-sm text-ink-soft">
          Ribbon colour: <span className="font-semibold text-ink">{state.ribbon}</span>
        </p>
        <div className="mt-3 flex flex-wrap gap-3" role="radiogroup" aria-label="Ribbon colour">
          {RIBBONS.map((r) => {
            const on = state.ribbon === r.name;
            return (
              <button
                key={r.name}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => actions.set('ribbon', r.name)}
                className={`flex items-center gap-2.5 rounded-pill border py-1.5 pl-1.5 pr-4 text-sm transition-colors ${
                  on ? 'border-primary bg-blush font-medium text-ink' : 'border-line text-ink-soft hover:border-primary/40'
                }`}
              >
                <span className="h-7 w-7 rounded-full ring-2 ring-white" style={{ background: r.hex }} />
                {r.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
