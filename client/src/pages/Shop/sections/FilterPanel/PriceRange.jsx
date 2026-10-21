import { useEffect, useState } from 'react';
import { formatPrice } from '@/utils/format';

/** Do handle wala price slider. Chhodne pe (300ms baad) filter lagta hai. */
export default function PriceRange({ min, max, valueMin, valueMax, onChange }) {
  const [lo, setLo] = useState(valueMin ?? min);
  const [hi, setHi] = useState(valueMax ?? max);

  useEffect(() => {
    setLo(valueMin ?? min);
    setHi(valueMax ?? max);
  }, [valueMin, valueMax, min, max]);

  useEffect(() => {
    const t = setTimeout(() => {
      const nextMin = lo <= min ? null : lo;
      const nextMax = hi >= max ? null : hi;
      if (nextMin !== (valueMin ?? null) || nextMax !== (valueMax ?? null)) onChange(nextMin, nextMax);
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lo, hi]);

  if (max <= min) return null;
  const pct = (v) => ((v - min) / (max - min)) * 100;
  const thumb =
    'pointer-events-none absolute inset-0 h-1.5 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-primary';

  return (
    <div>
      <div className="relative mx-1 mt-2 h-1.5 rounded-full bg-line">
        <div className="absolute h-full rounded-full bg-primary" style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }} />
        <input
          id="price-min"
          type="range"
          min={min}
          max={max}
          step={50}
          value={lo}
          onChange={(e) => setLo(Math.min(Number(e.target.value), hi - 50))}
          aria-label="Minimum price"
          className={thumb}
        />
        <input
          id="price-max"
          type="range"
          min={min}
          max={max}
          step={50}
          value={hi}
          onChange={(e) => setHi(Math.max(Number(e.target.value), lo + 50))}
          aria-label="Maximum price"
          className={thumb}
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <span className="rounded-lg border border-line bg-white px-3 py-1.5 font-medium tabular-nums text-ink">{formatPrice(lo)}</span>
        <span className="h-px flex-1 bg-line" />
        <span className="rounded-lg border border-line bg-white px-3 py-1.5 font-medium tabular-nums text-ink">{formatPrice(hi)}</span>
      </div>
    </div>
  );
}
