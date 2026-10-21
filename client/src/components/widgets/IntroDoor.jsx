import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SITE } from '@/config/site.config';
import { useSmoothScroll } from '@/context/SmoothScrollContext';

/**
 * WELCOME DOOR ANIMATION (5 second)
 * ----------------------------------------------------------
 * 0.0s – 3.3s : rose-gold darwaze, logo medallion, "Welcome to Pretty Aura", sparkles, gold shimmer
 * 3.3s – 4.7s : darwaze khulte hain + andar se roshni
 * 4.7s – 5.0s : fade out, website dikhti hai
 * Ek session mein sirf ek baar. "Skip" button bhi hai.
 * Timing badalni ho to neeche ke 3 numbers badlo.
 */
const SEEN_KEY = 'pa_intro_seen';
const OPEN_AT = 3300; // ms – darwaze kab khulenge
const FADE_AT = 4650; // ms – overlay kab fade hoga
const TOTAL = 5000; // ms – poora animation

const EASE = [0.22, 1, 0.36, 1];

const alreadySeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};

// Sparkles ki fixed positions (har baar same, random flicker nahi)
const SPARKLES = Array.from({ length: 12 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: 20 + ((i * 53) % 70),
  size: 6 + (i % 4) * 3,
  delay: 0.3 + (i % 6) * 0.35,
  dur: 2.4 + (i % 3) * 0.6,
}));

function Sparkle({ s }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      width={s.size}
      height={s.size}
      className="absolute text-gold"
      style={{ left: `${s.left}%`, top: `${s.top}%` }}
      initial={{ opacity: 0, y: 0, scale: 0.4 }}
      animate={{ opacity: [0, 1, 0], y: -60, scale: [0.4, 1, 0.6], rotate: 90 }}
      transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeOut' }}
      aria-hidden="true"
    >
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="currentColor" />
    </motion.svg>
  );
}

function Door({ side, open }) {
  const left = side === 'left';
  return (
    <motion.div
      className="absolute top-0 h-full w-1/2 overflow-hidden"
      style={{
        [left ? 'left' : 'right']: 0,
        transformOrigin: left ? 'left center' : 'right center',
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
      }}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: open ? (left ? -100 : 100) : 0 }}
      transition={{ duration: 1.4, ease: [0.7, 0, 0.3, 1] }}
    >
      {/* Rose-gold body */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#FCE7EE_0%,#F7C6D5_45%,#EDA3BB_100%)]" />
      {/* Lattice texture */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #C9A24A 0 1px, transparent 1px 28px), repeating-linear-gradient(-45deg, #C9A24A 0 1px, transparent 1px 28px)',
        }}
      />
      {/* Arch frames */}
      <div className="absolute inset-x-[7%] bottom-[5%] top-[5%] rounded-t-[999px] border-[3px] border-gold/80 shadow-[inset_0_0_40px_rgba(255,255,255,.35)]" />
      <div className="absolute inset-x-[11%] bottom-[8%] top-[8%] rounded-t-[999px] border border-gold/50 bg-white/15" />
      <div className="absolute inset-x-[18%] bottom-[11%] h-[16%] rounded-2xl border border-gold/60 bg-white/10" />
      {/* Corner studs */}
      {['top-[4%]', 'bottom-[3%]'].map((p) => (
        <span key={p} className={`absolute ${p} ${left ? 'left-[4%]' : 'right-[4%]'} h-3 w-3 rounded-full bg-gold shadow`} />
      ))}
      {/* Ring knocker handle */}
      <div className={`absolute top-[70%] ${left ? 'right-[9%]' : 'left-[9%]'} flex flex-col items-center`}>
        <span className="h-4 w-6 rounded-md bg-gradient-to-b from-gold-light to-gold-dark shadow" />
        <span className="-mt-1 h-10 w-10 rounded-full border-[5px] border-gold shadow-[0_4px_10px_rgba(0,0,0,.2)]" />
      </div>
      {/* Gold seam where doors meet */}
      <div className={`absolute top-0 h-full w-[3px] ${left ? 'right-0' : 'left-0'} bg-gradient-to-b from-gold-light via-gold to-gold-dark`} />
      <div className={`absolute top-0 h-full w-16 ${left ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} from-ink/15 to-transparent`} />
      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        initial={{ x: '-150%' }}
        animate={{ x: '400%' }}
        transition={{ duration: 1.6, delay: left ? 1.3 : 1.45, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

export default function IntroDoor() {
  const [show, setShow] = useState(() => !alreadySeen());
  const [open, setOpen] = useState(false);
  const [fading, setFading] = useState(false);
  const lenis = useSmoothScroll();

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* ignore */
    }
    document.documentElement.style.overflow = '';
    lenis?.start();
    setShow(false);
  }, [lenis]);

  useEffect(() => {
    if (!show) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.style.overflow = 'hidden';
    lenis?.stop();
    const timers = [
      setTimeout(() => setOpen(true), reduced ? 300 : OPEN_AT),
      setTimeout(() => setFading(true), reduced ? 600 : FADE_AT),
      setTimeout(finish, reduced ? 900 : TOTAL),
    ];
    return () => timers.forEach(clearTimeout);
  }, [show, lenis, finish]);

  const letters = 'WELCOME TO'.split('');

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{ perspective: 2000 }}
          animate={{ opacity: fading ? 0 : 1 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-label={`Welcome to ${SITE.name}`}
        >
          {/* Light behind the doors */}
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#FFF6F0_35%,#FDEEF1_70%)]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: open ? 1 : 0, scale: open ? 1.2 : 0.6 }}
            transition={{ duration: 1.2, ease: EASE }}
          />

          <Door side="left" open={open} />
          <Door side="right" open={open} />

          {/* Sparkles */}
          <motion.div className="pointer-events-none absolute inset-0" animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.4 }}>
            {SPARKLES.map((s, i) => (
              <Sparkle key={i} s={s} />
            ))}
          </motion.div>

          {/* Welcome content */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 pb-[12vh] text-center"
            animate={open ? { opacity: 0, scale: 1.15, filter: 'blur(6px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* soft glow for readability */}
            <div className="absolute h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.85)_0%,rgba(255,255,255,0)_70%)]" />

            {/* Logo medallion */}
            <motion.div
              className="relative grid place-items-center"
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: EASE }}
            >
              <motion.span
                className="absolute h-[148px] w-[148px] rounded-full border-2 border-dashed border-gold/70 md:h-[184px] md:w-[184px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              />
              <span className="absolute h-[132px] w-[132px] rounded-full bg-gold/20 blur-xl md:h-[166px] md:w-[166px]" />
              <img
                src={SITE.logo}
                alt=""
                width="160"
                height="160"
                className="relative h-28 w-28 rounded-full shadow-lift ring-4 ring-white md:h-36 md:w-36"
              />
            </motion.div>

            <p className="relative mt-8 flex text-[12px] font-semibold tracking-[0.45em] text-gold-dark md:text-sm" aria-hidden="true">
              {letters.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.05 }}
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              ))}
            </p>

            <div className="relative mt-2 overflow-hidden">
              <motion.h1
                className="text-[2.75rem] font-semibold leading-tight text-ink md:text-7xl"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
              >
                Pretty <span className="text-primary">Aura</span>
              </motion.h1>
            </div>

            <div className="relative mt-4 flex items-center gap-3">
              <motion.span className="h-px w-16 origin-right bg-gold md:w-24" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 1.9 }} />
              <motion.span className="text-primary" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 2.2 }}>
                ♥
              </motion.span>
              <motion.span className="h-px w-16 origin-left bg-gold md:w-24" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 1.9 }} />
            </div>

            <motion.p
              className="relative mt-4 text-sm font-medium tracking-wide text-ink-soft md:text-base"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.2 }}
            >
              {SITE.tagline}
            </motion.p>
          </motion.div>

          {/* Progress line */}
          <div className="absolute inset-x-0 bottom-10 flex justify-center">
            <div className="h-[3px] w-40 overflow-hidden rounded-full bg-white/50">
              <motion.div
                className="h-full bg-gradient-to-r from-gold to-primary"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: OPEN_AT / 1000, ease: 'linear' }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={finish}
            className="absolute bottom-6 right-6 rounded-pill bg-white/85 px-5 py-2 text-sm font-medium text-ink shadow-card backdrop-blur hover:bg-white"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
