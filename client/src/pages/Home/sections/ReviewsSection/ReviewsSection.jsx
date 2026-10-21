import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y } from 'swiper/modules';
import { AnimatePresence, motion } from 'framer-motion';
import { HiCheckBadge, HiXMark, HiOutlineCamera } from 'react-icons/hi2';
import 'swiper/css';
import 'swiper/css/pagination';
import { REVIEWS } from '@/data/home/homeContent';
import SectionHeading from '@/components/ui/SectionHeading';
import RatingStars from '@/components/ui/RatingStars';
import Button from '@/components/ui/Button';
import Portal from '@/components/ui/Portal';
import useOverlay from '@/hooks/useOverlay';

/** Customer reviews with photos – photo pe click karne se badi dikhti hai */
export default function ReviewsSection() {
  const [photo, setPhoto] = useState(null);
  useOverlay(!!photo, () => setPhoto(null));
  const avg = (REVIEWS.reduce((n, r) => n + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <section className="bg-blush/60 section-space overflow-hidden" aria-labelledby="reviews-heading">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-12">
          {/* Summary */}
          <div>
            <SectionHeading
              eyebrow="Real customers, real photos"
              title={<span id="reviews-heading">Loved by our customers</span>}
              className="!mb-6"
            />
            <div className="rounded-card bg-white p-6 shadow-card">
              <div className="flex items-end gap-3">
                <span className="text-5xl font-semibold leading-none text-ink">{avg}</span>
                <span className="pb-1 text-sm text-muted">out of 5</span>
              </div>
              <RatingStars rating={Number(avg)} size={20} className="mt-3" />
              <p className="mt-2 text-sm text-muted">Based on {REVIEWS.length} recent photo reviews</p>
              <Button to="/reviews/new" variant="outline" className="mt-5 w-full">
                <HiOutlineCamera size={18} /> Write a review
              </Button>
            </div>
          </div>

          {/* Slider */}
          <div className="min-w-0">
            <Swiper
              modules={[Autoplay, Pagination, A11y]}
              spaceBetween={16}
              slidesPerView={1.12}
              autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 20 }, 1280: { slidesPerView: 2.4, spaceBetween: 22 } }}
              className="!pb-12"
            >
              {REVIEWS.map((r) => (
                <SwiperSlide key={r.id} className="!h-auto">
                  <article className="flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card">
                    <button
                      type="button"
                      onClick={() => setPhoto(r)}
                      className="group relative block overflow-hidden"
                      aria-label={`Customer photo from ${r.name}`}
                    >
                      <img src={r.photo} alt={`Photo by ${r.name}`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-pill bg-white/90 px-2.5 py-1 text-[11px] font-medium text-ink">
                        <HiOutlineCamera /> Customer photo
                      </span>
                    </button>
                    <div className="flex flex-1 flex-col p-5">
                      <RatingStars rating={r.rating} size={16} />
                      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">“{r.text}”</p>
                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                        <div className="flex items-center gap-3">
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                            {r.name.charAt(0)}
                          </span>
                          <div className="leading-tight">
                            <p className="flex items-center gap-1 text-sm font-semibold text-ink">
                              {r.name} <HiCheckBadge className="text-success" title="Verified buyer" />
                            </p>
                            <p className="text-xs text-muted">{r.city}</p>
                          </div>
                        </div>
                        <p className="max-w-[45%] text-right text-xs text-muted">{r.product}</p>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Photo lightbox */}
      <Portal>
      <AnimatePresence>
        {photo && (
          <motion.div
            className="fixed inset-0 z-[200] grid place-items-center bg-ink/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPhoto(null)}
            role="dialog"
            aria-label={`Photo by ${photo.name}`}
          >
            <motion.figure
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-card bg-white"
            >
              <img src={photo.photo} alt={`Photo by ${photo.name}`} className="w-full" />
              <figcaption className="p-4 text-sm text-ink-soft">
                <span className="font-semibold text-ink">{photo.name}</span> on {photo.product}
              </figcaption>
              <button
                type="button"
                onClick={() => setPhoto(null)}
                aria-label="Close photo"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink"
              >
                <HiXMark size={20} />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
      </Portal>
    </section>
  );
}
