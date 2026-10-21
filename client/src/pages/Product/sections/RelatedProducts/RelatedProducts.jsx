import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import 'swiper/css';
import { getRelatedProducts } from '@/data/products';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductCard from '@/components/ui/ProductCard';

/** "You may also like" – same category ke products */
export default function RelatedProducts({ product }) {
  const swiperRef = useRef(null);
  const items = getRelatedProducts(product);
  if (!items.length) return null;
  const nav = 'grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-primary hover:bg-primary hover:text-white';

  return (
    <section className="overflow-hidden bg-cream section-space" aria-labelledby="related-title">
      <div className="container-page">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Complete the look" title={<span id="related-title">You may also like</span>} className="!mb-8 flex-1" />
          <div className="mb-8 hidden gap-2 md:flex">
            <button type="button" aria-label="Previous" className={nav} onClick={() => swiperRef.current?.slidePrev()}>
              <HiArrowLeft size={18} />
            </button>
            <button type="button" aria-label="Next" className={nav} onClick={() => swiperRef.current?.slideNext()}>
              <HiArrowRight size={18} />
            </button>
          </div>
        </div>
        <Swiper
          modules={[A11y]}
          onSwiper={(s) => (swiperRef.current = s)}
          spaceBetween={14}
          slidesPerView={1.6}
          breakpoints={{ 640: { slidesPerView: 2.5, spaceBetween: 18 }, 1024: { slidesPerView: 4, spaceBetween: 22 } }}
          className="!overflow-visible"
        >
          {items.map((p) => (
            <SwiperSlide key={p.id} className="!h-auto">
              <ProductCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
