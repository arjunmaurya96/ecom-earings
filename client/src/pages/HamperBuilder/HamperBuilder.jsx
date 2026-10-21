import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import useHamperBuilder, { STEPS } from '@/hooks/useHamperBuilder';
import { useCart } from '@/context/CartContext';
import { useSmoothScroll } from '@/context/SmoothScrollContext';
import { SITE } from '@/config/site.config';
import { formatPrice } from '@/utils/format';
import { whatsappLink, hamperOrderMessage } from '@/utils/whatsapp';

import BuilderHero from './sections/BuilderHero/BuilderHero';
import BuilderStepper from './sections/BuilderStepper/BuilderStepper';
import StepBox from './sections/StepBox/StepBox';
import StepItems from './sections/StepItems/StepItems';
import StepPersonalise from './sections/StepPersonalise/StepPersonalise';
import StepReview from './sections/StepReview/StepReview';
import HamperPreview from './sections/HamperPreview/HamperPreview';

/**
 * CUSTOM HAMPER BUILDER  →  /build-hamper
 * 1 Box → 2 Items → 3 Personalise → 4 Review → Cart / WhatsApp
 * Logic: hooks/useHamperBuilder.js   Data: data/hamper.js
 */
export default function HamperBuilder() {
  const { state, box, ribbon, totals, actions, blocker } = useHamperBuilder();
  const { addToCart } = useCart();
  const lenis = useSmoothScroll();
  const topRef = useRef(null);
  const first = useRef(true);

  // Step badalne pe builder ke top pe scroll
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (topRef.current) lenis ? lenis.scrollTo(topRef.current, { offset: -100 }) : topRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [state.step, lenis]);

  const isLast = state.step === STEPS.length - 1;
  const canGo = (i) => {
    if (i <= 1) return true;
    return totals.count > 0 && !totals.over;
  };

  const next = () => {
    if (blocker) return toast.error(blocker);
    actions.next();
  };

  const hamperMeta = {
    type: 'hamper',
    boxId: box.id,
    boxName: box.name,
    ribbon: ribbon.name,
    items: state.items.map(({ key, name, color, size, qty, price }) => ({ key, name, color, size, qty, price })),
    occasion: state.occasion,
    to: state.to,
    from: state.from,
    message: state.message,
    hidePrices: state.hidePrices,
  };

  const addHamperToCart = () => {
    if (blocker || !totals.count) return toast.error(blocker || 'Add at least one item');
    const firstImg = state.items.find((i) => i.image)?.image || box.image;
    addToCart(
      {
        id: 'custom-hamper',
        slug: 'custom-hamper',
        name: `Custom ${box.name} Hamper${state.to ? ` for ${state.to}` : ''}`,
        category: 'hamper',
        price: totals.total,
        mrp: totals.mrp,
      },
      { key: `hamper-${Date.now()}`, url: '/build-hamper', image: firstImg, meta: hamperMeta },
    );
    actions.reset();
  };

  const orderOnWhatsApp = () => {
    if (blocker || !totals.count) return toast.error(blocker || 'Add at least one item');
    window.open(whatsappLink(hamperOrderMessage(hamperMeta, totals.total)), '_blank', 'noopener');
  };

  const stepProps = { state, box, ribbon, totals, actions };

  return (
    <>
      <Helmet>
        <title>{`Build Your Own Gift Hamper | ${SITE.name}`}</title>
        <meta name="description" content="Create a custom gift hamper: choose a box, add claw clips, earrings, jewellery and treats, and add a handwritten message." />
        <link rel="canonical" href={`${SITE.url}/build-hamper`} />
      </Helmet>

      <BuilderHero />

      <section ref={topRef} className="container-page pb-28 pt-8 md:pt-10 lg:pb-20">
        <BuilderStepper step={state.step} onGo={actions.goTo} canGo={canGo} />

        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {state.step === 0 && <StepBox {...stepProps} />}
                {state.step === 1 && <StepItems {...stepProps} />}
                {state.step === 2 && <StepPersonalise {...stepProps} />}
                {state.step === 3 && (
                  <>
                    <div className="mb-6 lg:hidden">
                      <HamperPreview {...stepProps} compact />
                    </div>
                    <StepReview {...stepProps} onAddToCart={addHamperToCart} onWhatsApp={orderOnWhatsApp} error={blocker} />
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Desktop nav buttons */}
            {!isLast && (
              <div className="mt-10 hidden items-center justify-between border-t border-line pt-6 lg:flex">
                <button
                  type="button"
                  onClick={actions.back}
                  disabled={state.step === 0}
                  className="inline-flex h-12 items-center gap-2 rounded-pill border border-line px-6 text-[15px] font-medium text-ink hover:border-primary disabled:opacity-30"
                >
                  <HiArrowLeft /> Back
                </button>
                <button type="button" onClick={next} className="inline-flex h-12 items-center gap-2 rounded-pill bg-primary px-7 text-[15px] font-medium text-white shadow-soft hover:bg-primary-dark">
                  Next: {STEPS[state.step + 1]} <HiArrowRight />
                </button>
              </div>
            )}
          </div>

          <aside className="hidden lg:block" aria-label="Hamper preview">
            <div className="sticky top-24">
              <HamperPreview {...stepProps} />
            </div>
          </aside>
        </div>
      </section>

      {/* Mobile bottom bar */}
      {!isLast && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 shadow-lift backdrop-blur-md lg:hidden">
          <div className="flex items-center gap-3 pr-16">
            {state.step > 0 && (
              <button type="button" onClick={actions.back} aria-label="Back" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-ink">
                <HiArrowLeft />
              </button>
            )}
            <div className="min-w-0 flex-1 leading-tight">
              <p className="text-xs text-muted">
                {box.name} · {totals.count}/{box.capacity} items
              </p>
              <p className="font-semibold text-ink">{formatPrice(totals.total)}</p>
            </div>
            <button type="button" onClick={next} className="flex h-11 shrink-0 items-center gap-1.5 rounded-pill bg-primary px-5 text-sm font-medium text-white">
              Next <HiArrowRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
