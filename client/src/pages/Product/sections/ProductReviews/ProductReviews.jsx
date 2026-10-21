import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiCheckBadge, HiOutlineCamera, HiXMark, HiStar } from 'react-icons/hi2';
import { getProductReviews, getRatingBreakdown } from '@/data/productDetails';
import RatingStars from '@/components/ui/RatingStars';
import Button from '@/components/ui/Button';
import Portal from '@/components/ui/Portal';
import useOverlay from '@/hooks/useOverlay';

/** Reviews: rating summary + breakdown bars + photo reviews (Step 10 mein likhne wala form) */
export default function ProductReviews({ product }) {
  const reviews = getProductReviews(product);
  const breakdown = getRatingBreakdown(product.rating, product.reviewCount);
  const photos = reviews.flatMap((r) => r.photos);
  const [filter, setFilter] = useState('all');
  const [photo, setPhoto] = useState(null);
  useOverlay(!!photo, () => setPhoto(null));
  const shown = filter === 'photos' ? reviews.filter((r) => r.photos.length) : reviews;

  return (
    <section id="reviews" className="container-page section-space scroll-mt-28" aria-labelledby="reviews-title">
      <div className="grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">
        {/* Summary */}
        <div>
          <h2 id="reviews-title" className="text-[1.75rem] md:text-[2rem]">Customer reviews</h2>
          <div className="mt-6 rounded-3xl bg-cream p-6">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-semibold leading-none text-ink">{product.rating}</span>
              <span className="pb-1 text-sm text-muted">out of 5</span>
            </div>
            <RatingStars rating={product.rating} size={20} className="mt-3" />
            <p className="mt-1 text-sm text-muted">{product.reviewCount} verified reviews</p>

            <ul className="mt-5 space-y-2">
              {breakdown.map((n, i) => {
                const star = 5 - i;
                const pct = product.reviewCount ? (n / product.reviewCount) * 100 : 0;
                return (
                  <li key={star} className="flex items-center gap-3 text-sm">
                    <span className="flex w-8 items-center gap-0.5 text-ink">
                      {star} <HiStar className="text-gold" size={13} />
                    </span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                      <motion.span
                        className="block h-full rounded-full bg-gold"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: i * 0.08 }}
                      />
                    </span>
                    <span className="w-8 text-right tabular-nums text-muted">{n}</span>
                  </li>
                );
              })}
            </ul>

            <Button to="/reviews/new" variant="outline" className="mt-6 w-full">
              <HiOutlineCamera size={18} /> Write a review
            </Button>
          </div>

          {photos.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-ink">Customer photos</p>
              <div className="grid grid-cols-4 gap-2">
                {photos.map((src) => (
                  <button key={src} type="button" onClick={() => setPhoto(src)} className="overflow-hidden rounded-xl" aria-label="View customer photo">
                    <img src={src} alt="Customer photo" loading="lazy" className="aspect-square w-full object-cover transition-transform hover:scale-105" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* List */}
        <div className="min-w-0">
          <div className="mb-6 flex gap-2" role="tablist">
            {[
              ['all', `All (${reviews.length})`],
              ['photos', `With photos (${reviews.filter((r) => r.photos.length).length})`],
            ].map(([k, label]) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={filter === k}
                onClick={() => setFilter(k)}
                className={`rounded-pill px-4 py-2 text-sm font-medium transition-colors ${filter === k ? 'bg-ink text-white' : 'border border-line text-ink-soft hover:text-ink'}`}
              >
                {label}
              </button>
            ))}
          </div>

          <ul className="divide-y divide-line">
            {shown.map((r) => (
              <li key={r.id} className="py-6 first:pt-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 font-semibold text-primary">{r.name.charAt(0)}</span>
                    <div className="leading-tight">
                      <p className="flex items-center gap-1.5 text-[15px] font-semibold text-ink">
                        {r.name}
                        {r.verified && (
                          <span className="inline-flex items-center gap-0.5 text-xs font-medium text-success">
                            <HiCheckBadge size={15} /> Verified buyer
                          </span>
                        )}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {r.city} · {r.date}
                        {r.variant && <> · Colour: {r.variant}</>}
                      </p>
                    </div>
                  </div>
                  <RatingStars rating={r.rating} size={15} />
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{r.text}</p>
                {r.photos.length > 0 && (
                  <div className="mt-3 flex gap-2">
                    {r.photos.map((src) => (
                      <button key={src} type="button" onClick={() => setPhoto(src)} className="overflow-hidden rounded-xl" aria-label="View photo">
                        <img src={src} alt="Review photo" loading="lazy" className="h-24 w-24 object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Portal>
      <AnimatePresence>
        {photo && (
          <motion.div
            className="fixed inset-0 z-[200] grid place-items-center bg-ink/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPhoto(null)}
          >
            <motion.img
              src={photo.replace(/w=\d+&h=\d+/, 'w=1000&h=1000')}
              alt="Customer photo"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="max-h-[85vh] max-w-full rounded-2xl"
            />
            <button type="button" onClick={(e) => { e.stopPropagation(); setPhoto(null); }} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-lift md:right-6 md:top-6">
              <HiXMark size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </Portal>
    </section>
  );
}
