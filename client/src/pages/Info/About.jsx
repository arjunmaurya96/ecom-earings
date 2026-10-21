import { Helmet } from 'react-helmet-async';
import { HiOutlineSparkles, HiOutlineGift, HiOutlineCurrencyRupee, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { ABOUT } from '@/data/infoPages';
import { SITE } from '@/config/site.config';
import { unsplash } from '@/utils/image';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';

const ICONS = [HiOutlineSparkles, HiOutlineGift, HiOutlineCurrencyRupee, HiOutlineChatBubbleLeftRight];

/** /about – text: data/infoPages.js */
export default function About() {
  return (
    <>
      <Helmet>
        <title>{`About us | ${SITE.name}`}</title>
        <meta name="description" content={ABOUT.intro} />
      </Helmet>

      {/* Intro */}
      <section className="px-3 md:px-5">
        <div className="mx-auto grid max-w-[1600px] overflow-hidden rounded-3xl bg-blush md:grid-cols-2">
          <Reveal className="p-7 sm:p-10 lg:p-16">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{ABOUT.eyebrow}</p>
            <h1 className="mt-3 text-[2rem] leading-tight md:text-5xl">{ABOUT.title}</h1>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft md:text-base">{ABOUT.intro}</p>
          </Reveal>
          <div className="relative min-h-[280px]">
            <img src={unsplash('1561828995-aa79a2db86dd', 1000, 800)} alt="Pretty Aura accessories" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container-page section-space">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal className="relative overflow-hidden rounded-3xl">
            <img src={unsplash('1625552187571-7ee60ac43d2b', 900, 700)} alt="Gift hamper being packed" loading="lazy" className="aspect-[9/7] w-full object-cover" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[1.75rem] md:text-[2.25rem]">Chosen with care, packed with love</h2>
            {ABOUT.story.map((p) => (
              <p key={p.slice(0, 20)} className="mt-4 text-[15px] leading-relaxed text-ink-soft md:text-base">{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream section-space">
        <div className="container-page">
          <h2 className="text-center text-[1.75rem] md:text-[2.25rem]">What we promise</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT.values.map((v, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Reveal key={v.title} delay={i * 0.06} className="rounded-3xl bg-white p-6 shadow-card">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blush text-primary"><Icon size={24} /></span>
                  <h3 className="mt-4 text-lg">{v.title}</h3>
                  <p className="mt-2 text-[15px] text-muted">{v.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page section-space text-center">
        <h2 className="text-[1.75rem] md:text-[2.25rem]">Find something pretty today</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button to="/shop" size="lg">Shop now</Button>
          <Button to="/build-hamper" variant="outline" size="lg">Build a hamper</Button>
        </div>
      </section>
    </>
  );
}
