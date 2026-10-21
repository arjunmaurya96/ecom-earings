import { HiCheck } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';
import { HAMPER_BANNER } from '@/data/home/homeContent';
import { whatsappLink } from '@/utils/whatsapp';
import { formatPrice } from '@/utils/format';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { resizeUrl, srcSetFor } from '@/utils/image';

/** "Build Your Own Hamper" promo – Step 6 ke Hamper Builder page pe le jaata hai */
export default function HamperBanner() {
  const b = HAMPER_BANNER;
  return (
    <section className="container-page section-space" aria-labelledby="hamper-heading">
      <div className="relative grid overflow-hidden rounded-[2rem] bg-gradient-to-br from-blush via-white to-gold-light/60 lg:grid-cols-2">
        {/* decorative rings */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full border border-gold/30" />
        <div className="pointer-events-none absolute -bottom-24 right-1/3 h-64 w-64 rounded-full bg-primary/10 blur-2xl" />

        <Reveal className="relative p-7 sm:p-10 lg:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{b.eyebrow}</p>
          <h2 id="hamper-heading" className="mt-3 text-[1.9rem] leading-tight md:text-[2.6rem]">{b.title}</h2>
          <p className="mt-4 max-w-md text-[15px] text-ink-soft md:text-base">{b.text}</p>

          <ol className="mt-7 grid gap-3">
            {b.steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-sm font-semibold text-primary shadow-card">
                  {i + 1}
                </span>
                <span className="text-[15px] font-medium text-ink">{s}</span>
                <HiCheck className="text-success" />
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to={b.cta.to} size="lg">{b.cta.label}</Button>
            <Button href={whatsappLink('Hi! I want to order a custom gift hamper.')} variant="outline" size="lg">
              <FaWhatsapp className="text-whatsapp" size={18} /> Ask on WhatsApp
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative min-h-[300px] lg:min-h-full">
          <img
            src={resizeUrl(b.image, 800, 800)}
            srcSet={srcSetFor(b.image, [500, 800, 1100], 1)}
            sizes="(min-width: 1024px) 45vw, 100vw"
            alt="Gift hamper with ribbon"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-4 py-3 shadow-card backdrop-blur">
            <p className="text-xs text-muted">Hampers starting at</p>
            <p className="text-lg font-semibold text-primary">{formatPrice(b.startingPrice)}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
