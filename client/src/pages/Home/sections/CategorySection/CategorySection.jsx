import { Link } from 'react-router-dom';
import { HiArrowUpRight } from 'react-icons/hi2';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { resizeUrl, srcSetFor } from '@/utils/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

/**
 * 9 categories – mobile pe 2 column, tablet 3, desktop pe bento grid
 * (Hamper bada tile, baaki chhote)
 */
export default function CategorySection() {
  const countFor = (slug) => PRODUCTS.filter((p) => p.category === slug).length;
  const hamper = CATEGORIES.find((c) => c.slug === 'hamper');
  const rest = CATEGORIES.filter((c) => c.slug !== 'hamper');

  return (
    <section className="container-page section-space" aria-labelledby="cat-heading">
      <SectionHeading
        eyebrow="Shop by category"
        title={<span id="cat-heading">Find your pretty little thing</span>}
        subtitle="Hair accessories, earrings, jewellery and gift hampers – all in one place."
        link={{ label: 'View all products', to: '/shop' }}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-5 lg:grid-cols-5 lg:grid-rows-2">
        {/* Featured: Hamper */}
        <Reveal className="col-span-2 sm:col-span-4 lg:col-span-1 lg:row-span-2">
          <Link
            to={`/category/${hamper.slug}`}
            className="group relative block h-full min-h-[280px] overflow-hidden rounded-card bg-blush"
          >
            <img
              src={hamper.image}
              alt={hamper.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[center_35%] transition-transform duration-700 ease-soft group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <span className="rounded-pill bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink">Most gifted</span>
              <h3 className="mt-3 text-2xl font-semibold text-white">Gift Hampers</h3>
              <p className="mt-1 text-sm text-white/80">Ready-made or build your own</p>
            </div>
          </Link>
        </Reveal>

        {rest.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 4) * 0.05}>
            <Link to={`/category/${c.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-card bg-blush">
                <img
                  src={resizeUrl(c.image, 400, 400)}
                  srcSet={srcSetFor(c.image, [300, 400, 600], 1)}
                  sizes="(min-width: 1024px) 220px, (min-width: 640px) 25vw, 50vw"
                  alt={c.name}
                  loading="lazy"
                  width="600"
                  height="600"
                  className="aspect-square w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow-card transition-all duration-300 group-hover:opacity-100">
                  <HiArrowUpRight size={15} />
                </span>
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-2 px-1">
                <h3 className="text-[14.5px] font-medium text-ink transition-colors group-hover:text-primary md:text-[15px]">
                  {c.shortName || c.name}
                </h3>
                <span className="shrink-0 text-xs text-muted">{countFor(c.slug)} {countFor(c.slug) === 1 ? 'item' : 'items'}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
