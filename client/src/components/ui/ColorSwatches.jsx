import { swatchStyle } from '@/utils/format';

/**
 * Color swatches (Multicolor ke liye rainbow circle).
 * Product card aur product page dono pe use hoga.
 */
export default function ColorSwatches({ colors = [], selected, onSelect, size = 'sm', max = 5 }) {
  const dim = size === 'sm' ? 'h-5 w-5' : 'h-8 w-8';
  const shown = colors.slice(0, max);
  const extra = colors.length - shown.length;

  return (
    <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Choose colour">
      {shown.map((c) => {
        const active = selected === c.name;
        const out = c.stock === 0;
        return (
          <button
            key={c.name}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${c.name}${out ? ' (out of stock)' : ''}`}
            title={`${c.name}${out ? ' – out of stock' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect?.(c);
            }}
            className={`relative ${dim} rounded-full ring-offset-2 transition-all duration-200
              ${active ? 'ring-2 ring-primary' : 'ring-1 ring-ink/15 hover:ring-ink/40'}`}
          >
            <span className="absolute inset-0 rounded-full" style={swatchStyle(c.hex)} />
            {out && (
              <span className="absolute left-1/2 top-1/2 h-[1.5px] w-[120%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-ink/50" />
            )}
          </button>
        );
      })}
      {extra > 0 && <span className="text-xs text-muted">+{extra}</span>}
    </div>
  );
}
