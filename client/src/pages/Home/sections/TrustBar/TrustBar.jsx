import { HiOutlineTruck, HiOutlineBanknotes, HiOutlineGift, HiOutlineArrowPath } from 'react-icons/hi2';
import { TRUST_POINTS } from '@/data/home/homeContent';
import Reveal from '@/components/ui/Reveal';

const ICONS = { truck: HiOutlineTruck, cash: HiOutlineBanknotes, gift: HiOutlineGift, return: HiOutlineArrowPath };

/** Free shipping, COD, gift wrap, returns – chhoti patti */
export default function TrustBar() {
  return (
    <section className="container-page pt-8 md:pt-10" aria-label="Why shop with us">
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {TRUST_POINTS.map((t, i) => {
          const Icon = ICONS[t.icon];
          return (
            <Reveal
              key={t.title}
              delay={i * 0.06}
              className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-cream p-4 sm:flex-row sm:items-center md:gap-4 md:p-5"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-primary shadow-card md:h-12 md:w-12">
                <Icon size={22} />
              </span>
              <span className="min-w-0">
                <span className="block text-[14px] font-semibold text-ink md:text-[15px]">{t.title}</span>
                <span className="block text-[12.5px] text-muted md:text-[13.5px]">{t.text}</span>
              </span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
