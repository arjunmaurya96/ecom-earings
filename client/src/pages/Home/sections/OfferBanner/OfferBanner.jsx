import { useState } from 'react';
import { HiOutlineClipboardDocument, HiCheck } from 'react-icons/hi2';
import { OFFER } from '@/data/home/homeContent';
import useCountdown from '@/hooks/useCountdown';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

const pad = (n) => String(n).padStart(2, '0');

/** Sale banner + countdown + coupon copy (offer: data/home/homeContent.js) */
export default function OfferBanner() {
  const time = useCountdown(OFFER.endsAt);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(OFFER.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked – code text is selectable */
    }
  };

  return (
    <section className="container-page pb-14 md:pb-20" aria-labelledby="offer-heading">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-10 text-white sm:px-10 md:py-14 lg:px-16">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border-[28px] border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-gold/30 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">{OFFER.eyebrow}</p>
            <h2 id="offer-heading" className="mt-3 text-[1.9rem] leading-tight text-white md:text-[2.6rem]">{OFFER.title}</h2>
            <p className="mt-3 max-w-lg text-[15px] text-white/85">{OFFER.text}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-pill border border-dashed border-white/60 bg-white/10 py-1.5 pl-5 pr-1.5">
                <span className="select-all text-[15px] font-semibold tracking-[0.18em]">{OFFER.code}</span>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex h-9 items-center gap-1.5 rounded-pill bg-white px-4 text-sm font-medium text-primary"
                >
                  {copied ? <HiCheck /> : <HiOutlineClipboardDocument />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <Button to={OFFER.cta.to} variant="light" size="lg">{OFFER.cta.label}</Button>
            </div>
          </div>

          {!time.ended && (
            <div>
              <p className="mb-3 text-sm font-medium text-white/80 lg:text-right">Offer ends in</p>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {[
                  ['Days', time.days],
                  ['Hours', time.hours],
                  ['Mins', time.minutes],
                  ['Secs', time.seconds],
                ].map(([label, val]) => (
                  <div key={label} className="rounded-2xl bg-white/10 py-4 text-center backdrop-blur">
                    <span className="block text-2xl font-semibold tabular-nums md:text-4xl">{pad(val)}</span>
                    <span className="mt-1 block text-[11px] uppercase tracking-wider text-white/75">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
