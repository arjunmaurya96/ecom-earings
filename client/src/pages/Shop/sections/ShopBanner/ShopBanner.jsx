import { Link } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi2';
import Reveal from '@/components/ui/Reveal';

/** Shop / Category page ka banner – photo + breadcrumb + title */
export default function ShopBanner({ title, description, image, crumbs = [], count }) {
  return (
    <section className="px-3 md:px-5" aria-label="Page header">
      <div className="relative mx-auto grid max-w-[1600px] overflow-hidden rounded-3xl bg-blush md:grid-cols-[1.1fr_1fr]">
        <Reveal className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
              <li>
                <Link to="/" className="hover:text-primary">Home</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <HiChevronRight size={12} />
                  {c.to ? (
                    <Link to={c.to} className="hover:text-primary">{c.label}</Link>
                  ) : (
                    <span className="font-medium text-ink" aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="mt-4 text-[2rem] leading-tight md:text-5xl">{title}</h1>
          {description && <p className="mt-3 max-w-md text-[15px] text-ink-soft md:text-base">{description}</p>}
          {typeof count === 'number' && (
            <p className="mt-5 inline-flex w-fit items-center gap-2 rounded-pill bg-white px-4 py-1.5 text-sm font-medium text-ink shadow-card">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {count} {count === 1 ? 'product' : 'products'}
            </p>
          )}
        </Reveal>
        {image && (
          <div className="relative hidden min-h-[260px] md:block">
            <img src={image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
