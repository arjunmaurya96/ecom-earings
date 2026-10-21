import { OCCASIONS } from '@/data/hamper';

const MAX = 200;
const SUGGESTIONS = {
  Birthday: 'Happy birthday! Wishing you a year as pretty as you are 💗',
  Anniversary: 'Happy anniversary! Here’s to many more years of love.',
  Festive: 'Wishing you and your family a festive season full of joy and light.',
  'Thank you': 'Thank you for always being there. This is a little something for you.',
  'Bride to be': 'To the most beautiful bride – congratulations and lots of love!',
  'Just because': 'Just because you deserve something pretty today.',
};

const inputCls =
  'h-12 w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted focus:border-primary';

/** Step 3 – occasion, naam, card message */
export default function StepPersonalise({ state, actions }) {
  return (
    <div>
      <h2 className="text-2xl">Make it personal</h2>
      <p className="mt-1 text-muted">We will write your message by hand on a pretty card.</p>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-ink">Occasion</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {OCCASIONS.map((o) => (
            <button
              key={o}
              type="button"
              aria-pressed={state.occasion === o}
              onClick={() => actions.set('occasion', o)}
              className={`rounded-pill border px-4 py-2 text-sm font-medium transition-colors ${
                state.occasion === o ? 'border-primary bg-primary text-white' : 'border-line bg-white text-ink-soft hover:border-primary/40'
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="hamper-to" className="text-sm font-medium text-ink">To</label>
          <input id="hamper-to" value={state.to} onChange={(e) => actions.set('to', e.target.value.slice(0, 40))} placeholder="Her name, e.g. Riya" className={`mt-1.5 ${inputCls}`} />
        </div>
        <div>
          <label htmlFor="hamper-from" className="text-sm font-medium text-ink">From</label>
          <input id="hamper-from" value={state.from} onChange={(e) => actions.set('from', e.target.value.slice(0, 40))} placeholder="Your name" className={`mt-1.5 ${inputCls}`} />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <label htmlFor="hamper-message" className="text-sm font-medium text-ink">Card message</label>
          <button type="button" onClick={() => actions.set('message', SUGGESTIONS[state.occasion])} className="text-sm font-medium text-primary hover:underline">
            Use a suggestion
          </button>
        </div>
        <textarea
          id="hamper-message"
          rows={4}
          value={state.message}
          onChange={(e) => actions.set('message', e.target.value.slice(0, MAX))}
          placeholder="Write something from the heart…"
          className="mt-1.5 w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none placeholder:text-muted focus:border-primary"
        />
        <p className="text-right text-xs text-muted">{state.message.length}/{MAX}</p>
      </div>

      <label className="mt-2 flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-cream p-4">
        <span>
          <span className="block text-[15px] font-medium text-ink">Hide prices inside the hamper</span>
          <span className="block text-sm text-muted">Recommended when sending as a gift</span>
        </span>
        <input id="hide-prices" type="checkbox" className="peer sr-only" checked={state.hidePrices} onChange={(e) => actions.set('hidePrices', e.target.checked)} />
        <span className="relative h-6 w-11 shrink-0 rounded-full bg-ink/15 transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:bg-primary peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-primary" />
      </label>

      {/* Card preview */}
      <div className="mt-6 rounded-2xl border border-gold/40 bg-[linear-gradient(135deg,#FFFAF8,#FDEEF1)] p-6 text-center shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">{state.occasion}</p>
        <p className="mt-3 text-[15px] text-ink">{state.to ? `Dear ${state.to},` : 'Dear …,'}</p>
        <p className="mx-auto mt-2 max-w-sm whitespace-pre-line text-[15px] italic leading-relaxed text-ink-soft">
          {state.message || 'Your message will appear here.'}
        </p>
        <p className="mt-3 text-[15px] text-ink">{state.from ? `With love, ${state.from}` : 'With love, …'}</p>
      </div>
    </div>
  );
}
