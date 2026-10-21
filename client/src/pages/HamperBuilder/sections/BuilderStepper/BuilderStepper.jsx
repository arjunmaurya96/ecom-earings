import { HiCheck } from 'react-icons/hi2';
import { STEPS } from '@/hooks/useHamperBuilder';

/** 1 Box → 2 Items → 3 Personalise → 4 Review (pichhle steps pe click karke wapas ja sakte ho) */
export default function BuilderStepper({ step, onGo, canGo }) {
  return (
    <ol className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar" aria-label="Hamper steps">
      {STEPS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        const clickable = i < step || canGo(i);
        return (
          <li key={label} className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => clickable && onGo(i)}
              disabled={!clickable}
              aria-current={active ? 'step' : undefined}
              className={`flex items-center gap-2.5 rounded-pill py-1.5 pl-1.5 pr-4 text-sm font-medium transition-colors ${
                active ? 'bg-ink text-white' : done ? 'bg-blush text-ink hover:bg-blush-deep' : 'text-muted'
              }`}
            >
              <span
                className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${
                  active ? 'bg-primary text-white' : done ? 'bg-success text-white' : 'border border-line bg-white'
                }`}
              >
                {done ? <HiCheck size={14} /> : i + 1}
              </span>
              {label}
            </button>
            {i < STEPS.length - 1 && <span className={`h-px w-6 shrink-0 md:w-10 ${i < step ? 'bg-success' : 'bg-line'}`} />}
          </li>
        );
      })}
    </ol>
  );
}
