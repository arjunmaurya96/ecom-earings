import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, FreeMode } from 'swiper/modules';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import 'swiper/css';
import { getNewArrivals } from '@/data/products';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductCard from '@/components/ui/ProductCard';

/** New arrivals – horizontal slider */
export default function NewArrivals() {
  const swiperRef = useRef(null);
  const products = getNewArrivals();

  const nav = 'grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-primary hover:bg-primary hover:text-white';

  return (
    <section className="section-space overflow-hidden" aria-labelledby="new-heading">
      <div className="container-page">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Just dropped"
            title={<span id="new-heading">New arrivals</span>}
            subtitle="Fresh styles added this week."
            className="!mb-8 flex-1"
          />
          <div className="mb-8 hidden gap-2 md:flex">
            <button type="button" aria-label="Previous products" className={nav} onClick={() => swiperRef.current?.slidePrev()}>
              <HiArrowLeft size={18} />
            </button>
            <button type="button" aria-label="Next products" className={nav} onClick={() => swiperRef.current?.slideNext()}>
              <HiArrowRight size={18} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[A11y, FreeMode]}
          onSwiper={(s) => (swiperRef.current = s)}
          spaceBetween={14}
          slidesPerView={1.6}
          freeMode={{ enabled: true, sticky: false }}
          breakpoints={{
            640: { slidesPerView: 2.5, spaceBetween: 18 },
            1024: { slidesPerView: 4, spaceBetween: 22, freeMode: false },
          }}
          className="!overflow-visible"
        >
          {products.map((p) => (
            <SwiperSlide key={p.id} className="!h-auto">
              <ProductCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
