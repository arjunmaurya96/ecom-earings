import { HiMinus, HiPlus } from 'react-icons/hi2';

/** Quantity – / + (cart drawer aur cart page dono mein) */
export default function QtyStepper({ value, onChange, max = 10, size = 'md' }) {
  const h = size === 'sm' ? 'h-9' : 'h-10';
  return (
    <div className={`inline-flex ${h} items-center rounded-pill border border-line bg-white`}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
        className="grid h-full w-9 place-items-center text-ink disabled:opacity-30"
      >
        <HiMinus size={14} />
      </button>
      <span className="w-7 text-center text-sm font-semibold tabular-nums text-ink" aria-live="polite">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="grid h-full w-9 place-items-center text-ink disabled:opacity-30"
      >
        <HiPlus size={14} />
      </button>
    </div>
  );
}
