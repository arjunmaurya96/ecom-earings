import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard } from 'swiper/modules';
import { AnimatePresence, motion } from 'framer-motion';
import { HiArrowLeft, HiArrowRight, HiXMark, HiMagnifyingGlassPlus } from 'react-icons/hi2';
import 'swiper/css';
import Portal from '@/components/ui/Portal';
import useOverlay from '@/hooks/useOverlay';

/** Desktop pe mouse ke saath zoom (2x) */
function ZoomImage({ src, alt, eager }) {
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onMouseEnter={() => canHover && setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={(e) => {
        if (!canHover) return;
        const r = e.currentTarget.getBoundingClientRect();
        setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
      }}
    >
      <img
        src={src}
        alt={alt}
        width="800"
        height="1000"
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        draggable="false"
        className="h-full w-full object-cover transition-transform duration-300 ease-out"
        style={{ transform: zoom ? 'scale(2)' : 'scale(1)', transformOrigin: origin }}
      />
    </div>
  );
}

/**
 * PRODUCT GALLERY
 * - Badi photo (swipe, desktop pe hover zoom, click pe fullscreen)
 * - Thumbnails (desktop pe left, mobile pe neeche)
 * - Color badalne pe `active` badalta hai aur us color ki photo aa jaati hai
 */
export default function ProductGallery({ images, active, onChange, name, badges }) {
  const swiperRef = useRef(null);
  const [lightbox, setLightbox] = useState(false);
  useOverlay(lightbox, () => setLightbox(false));

  useEffect(() => {
    const s = swiperRef.current;
    if (s && s.activeIndex !== active) s.slideTo(active);
  }, [active]);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') onChange((active + 1) % images.length);
      if (e.key === 'ArrowLeft') onChange((active - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, active, images.length, onChange]);

  const thumbs = images.length > 1 && (
    <div className="no-scrollbar flex gap-2.5 overflow-x-auto md:max-h-[640px] md:flex-col md:overflow-y-auto" data-lenis-prevent>
      {images.map((src, i) => (
        <button
          key={src}
          type="button"
          onClick={() => onChange(i)}
          aria-label={`Show photo ${i + 1}`}
          aria-current={i === active}
          className={`relative w-[72px] shrink-0 overflow-hidden rounded-xl transition-all duration-300 md:w-20 ${
            i === active ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <img src={src.replace(/w=\d+&h=\d+/, 'w=160&h=200')} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row md:gap-4">
      {thumbs && <div className="md:w-20 md:shrink-0">{thumbs}</div>}

      <div className="relative min-w-0 flex-1 overflow-hidden rounded-3xl bg-blush">
        <Swiper
          modules={[A11y, Keyboard]}
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => onChange(s.activeIndex)}
          keyboard={{ enabled: true }}
          speed={500}
          className="aspect-[4/5] w-full"
        >
          {images.map((src, i) => (
            <SwiperSlide key={src}>
              <button type="button" onClick={() => setLightbox(true)} className="block h-full w-full cursor-zoom-in" aria-label="Open full screen photo">
                <ZoomImage src={src} alt={`${name} – photo ${i + 1}`} eager={i === 0} />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Badges */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 flex flex-col items-start gap-1.5">{badges}</div>

        <span className="pointer-events-none absolute bottom-4 right-4 z-10 hidden items-center gap-1.5 rounded-pill bg-white/90 px-3 py-1.5 text-xs font-medium text-ink shadow-card backdrop-blur md:inline-flex">
          <HiMagnifyingGlassPlus size={14} /> Hover to zoom
        </span>

        {/* Mobile dots */}
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-1.5 md:hidden">
            {images.map((src, i) => (
              <span key={src} className={`h-1.5 rounded-full transition-all ${i === active ? 'w-6 bg-primary' : 'w-1.5 bg-ink/25'}`} />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen (Portal: header ke upar dikhe) */}
      <Portal>
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            role="dialog"
            aria-label={`${name} photos`}
          >
            <motion.img
              key={images[active]}
              src={images[active].replace(/w=\d+&h=\d+/, 'w=1400&h=1750')}
              alt={name}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-h-[88vh] max-w-full rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button type="button" onClick={(e) => { e.stopPropagation(); setLightbox(false); }} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-lift transition-transform hover:scale-105 md:right-6 md:top-6">
              <HiXMark size={22} />
            </button>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange((active - 1 + images.length) % images.length);
                  }}
                  className="absolute left-4 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-ink"
                >
                  <HiArrowLeft size={20} />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange((active + 1) % images.length);
                  }}
                  className="absolute right-4 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-ink"
                >
                  <HiArrowRight size={20} />
                </button>
                <p className="absolute bottom-5 text-sm text-white/80">
                  {active + 1} / {images.length}
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      </Portal>
    </div>
  );
}
