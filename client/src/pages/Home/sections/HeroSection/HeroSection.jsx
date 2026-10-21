import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, A11y } from 'swiper/modules';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiArrowRight, HiStar } from 'react-icons/hi2';
import 'swiper/css';
import { HERO_SLIDES, HERO_BADGE, PANEL_COLORS } from '@/data/home/heroSlides';
import { resizeUrl, srcSetFor } from '@/utils/image';

/**
 * HERO BANNER (split design)
 * ----------------------------------------------------------
 *  Desktop:  [ rang ka panel + text | badi photo ]
 *  Mobile:   photo upar, panel + text neeche
 * - Photo pe koi overlay/opacity nahi
 * - Har 3 second mein poora banner smooth slide hota hai
 * Text/photos/rang: src/data/home/heroSlides.js
 */
const AUTOPLAY_DELAY = 3000; // ms – kitni der baad slide badle
const SLIDE_SPEED = 1100; // ms – slide hone ki speed
const EASE = [0.22, 1, 0.36, 1];
// Panel ki chaudai (desktop) – slides aur controls dono yahi use karte hain
const PANEL_W = 'md:w-[38%] lg:w-[33%]';
const GRID = 'md:grid-cols-[38%_1fr] lg:grid-cols-[33%_1fr]';

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

function Panel({ slide, active }) {
  return (
    <div className={`relative flex h-full flex-col justify-center px-6 pb-24 pt-8 text-white sm:px-10 md:pb-28 md:pt-10 lg:px-14 ${PANEL_COLORS[slide.panel] || 'bg-ink'}`}>
      {/* halka gold ring – sirf decoration */}
      <span className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full border border-gold/25" />
      <motion.div
        key={active ? `on-${slide.id}` : `off-${slide.id}`}
        initial="hidden"
        animate={active ? 'show' : 'hidden'}
        variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
        className="relative"
      >
        <motion.p variants={item} className="text-xl font-light italic text-gold-light md:text-2xl">
          {slide.kicker}
        </motion.p>
        <motion.h2 variants={item} className="mt-1 text-[2.25rem] font-semibold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-[4rem]">
          {slide.title}
        </motion.h2>
        <motion.p variants={item} className="mt-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75 md:text-xs">
          {slide.sub}
        </motion.p>
        <motion.p variants={item} className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/90">
          {slide.text}
        </motion.p>
        <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            to={slide.cta.to}
            className="group inline-flex h-12 items-center gap-2 rounded-pill bg-blush px-8 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-white"
          >
            {slide.cta.label}
            <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          {slide.secondary && (
            <Link to={slide.secondary.to} className="text-sm font-medium text-white underline decoration-white/40 underline-offset-[6px] transition-colors hover:decoration-white">
              {slide.secondary.label}
            </Link>
          )}
        </motion.div>
        <motion.p variants={item} className="mt-7 hidden items-center gap-2 text-[13px] text-white/80 md:flex">
          <span className="flex text-gold">
            {[0, 1, 2, 3, 4].map((n) => (
              <HiStar key={n} size={14} />
            ))}
          </span>
          <span className="font-semibold text-white">{HERO_BADGE.title}</span> {HERO_BADGE.text}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);
  const total = HERO_SLIDES.length;

  return (
    <section className="px-3 pt-[112px] md:px-5 md:pt-[128px]" aria-label="Featured collections">
      <h1 className="sr-only">Pretty Aura – hair accessories, earrings, jewellery and gift hampers</h1>
      <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[1.75rem] bg-ink shadow-lift">
        <Swiper
          modules={[Autoplay, Keyboard, A11y]}
          speed={SLIDE_SPEED}
          loop
          grabCursor
          autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false, pauseOnMouseEnter: false }}
          keyboard={{ enabled: true }}
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setActive(s.realIndex)}
          className="hero-swiper"
        >
          {HERO_SLIDES.map((s, i) => (
            <SwiperSlide key={s.id} className="!h-auto">
              <div className={`grid h-full grid-cols-1 grid-rows-[auto_1fr] md:h-[clamp(480px,66vh,640px)] md:grid-rows-1 ${GRID}`}>
                {/* Photo (mobile pe upar) */}
                <div className="relative order-1 h-[46vh] min-h-[280px] overflow-hidden md:order-2 md:h-full">
                  <picture>
                    <source media="(max-width: 767px)" srcSet={`${resizeUrl(s.image, 800, 640)} 800w, ${resizeUrl(s.image, 1200, 960)} 1200w`} sizes="100vw" />
                    <img
                      src={resizeUrl(s.image, 1400, 900)}
                      srcSet={srcSetFor(s.image, [1000, 1400, 2000], 0.64)}
                      sizes="(min-width: 1024px) 67vw, (min-width: 768px) 62vw, 100vw"
                      alt={`${s.title} – ${s.sub}`}
                      width="2000"
                      height="1250"
                      fetchPriority={i === 0 ? 'high' : 'low'}
                      loading="eager"
                      decoding="async"
                      className="hero-img absolute inset-0 h-full w-full object-cover"
                      style={{ objectPosition: s.focus || 'center' }}
                    />
                  </picture>
                </div>
                {/* Rang ka panel + text */}
                <div className="order-2 h-full md:order-1">
                  <Panel slide={s} active={i === active} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Controls – panel ke neeche (desktop pe left panel ke andar) */}
        <div className={`pointer-events-none absolute bottom-0 left-0 z-10 w-full px-6 pb-6 sm:px-10 lg:px-14 ${PANEL_W}`}>
          <div className="pointer-events-auto flex items-center gap-4 text-white">
            <span className="text-sm font-semibold tabular-nums">
              {String(active + 1).padStart(2, '0')}
              <span className="font-normal text-white/60"> / {String(total).padStart(2, '0')}</span>
            </span>
            <div className="flex flex-1 gap-1.5">
              {HERO_SLIDES.map((s, i) => (
                <button key={s.id} type="button" aria-label={`Go to slide ${i + 1}`} onClick={() => swiperRef.current?.slideToLoop(i)} className="relative h-6 flex-1">
                  <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25">
                    {i === active && (
                      <motion.span
                        key={`p-${active}`}
                        className="absolute inset-y-0 left-0 rounded-full bg-gold-light"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: (AUTOPLAY_DELAY + SLIDE_SPEED) / 1000, ease: 'linear' }}
                      />
                    )}
                    {i < active && <span className="absolute inset-0 rounded-full bg-gold-light/70" />}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {[
                ['Previous slide', HiArrowLeft, () => swiperRef.current?.slidePrev()],
                ['Next slide', HiArrowRight, () => swiperRef.current?.slideNext()],
              ].map(([label, Icon, fn]) => (
                <button
                  key={label}
                  type="button"
                  onClick={fn}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/40 text-white transition-colors duration-300 hover:border-blush hover:bg-blush hover:text-ink"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
