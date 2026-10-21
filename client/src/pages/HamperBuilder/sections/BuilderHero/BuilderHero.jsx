import { HiOutlineGift, HiOutlinePencilSquare, HiOutlineSparkles } from 'react-icons/hi2';
import { unsplash } from '@/utils/image';

const POINTS = [
  [HiOutlineGift, 'Pick a box & ribbon'],
  [HiOutlineSparkles, 'Fill it with her favourites'],
  [HiOutlinePencilSquare, 'Add a handwritten note'],
];

/** Builder page ka chhota banner */
export default function BuilderHero() {
  return (
    <section className="px-3 md:px-5" aria-label="Build your own hamper">
      <div className="relative mx-auto grid max-w-[1600px] overflow-hidden rounded-3xl bg-gradient-to-br from-blush via-white to-gold-light/50 md:grid-cols-[1.2fr_1fr]">
        <div className="relative z-10 p-6 sm:p-10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Custom Hamper Builder</p>
          <h1 className="mt-3 text-[2rem] leading-tight md:text-5xl">Build a hamper she will never forget</h1>
          <p className="mt-3 max-w-lg text-[15px] text-ink-soft md:text-base">
            Choose a box, fill it with clips, earrings, jewellery and treats, and we will pack it beautifully with your message.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {POINTS.map(([Icon, t]) => (
              <li key={t} className="flex items-center gap-2 rounded-pill bg-white/80 px-3.5 py-2 text-sm text-ink shadow-card">
                <Icon className="text-primary" size={17} /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative hidden min-h-[240px] md:block">
          <img src={unsplash('1625552187571-7ee60ac43d2b', 1000, 700)} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
