import { NavLink, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { POLICIES } from '@/data/infoPages';
import { SITE } from '@/config/site.config';
import Button from '@/components/ui/Button';

/**
 * /privacy-policy, /return-policy, /shipping-policy, /terms
 * Ek hi page – text data/infoPages.js se (slug URL se)
 */
export default function Policy() {
  const slug = useLocation().pathname.replace('/', '');
  const page = POLICIES[slug];
  if (!page) return null;

  return (
    <section className="container-page pb-16">
      <Helmet>
        <title>{`${page.title} | ${SITE.name}`}</title>
        <meta name="description" content={`${page.title} for ${SITE.name}.`} />
      </Helmet>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="Policies" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:sticky lg:top-28 lg:mx-0 lg:block lg:space-y-1 lg:self-start lg:px-0">
          {Object.entries(POLICIES).map(([s, p]) => (
            <NavLink
              key={s}
              to={`/${s}`}
              className={({ isActive }) =>
                `block shrink-0 rounded-pill px-4 py-2.5 text-sm font-medium transition-colors lg:rounded-xl ${
                  isActive ? 'bg-ink text-white' : 'border border-line text-ink-soft hover:bg-blush lg:border-0'
                }`
              }
            >
              {p.title}
            </NavLink>
          ))}
        </nav>

        <article className="max-w-3xl">
          <h1 className="text-[2rem] md:text-[2.5rem]">{page.title}</h1>
          <p className="mt-2 text-sm text-muted">Last updated: {page.updated}</p>
          <div className="mt-8 space-y-8">
            {page.sections.map(([h, t], i) => (
              <section key={h}>
                <h2 className="flex items-baseline gap-3 text-lg">
                  <span className="text-sm font-semibold text-gold-dark">{String(i + 1).padStart(2, '0')}</span>
                  {h}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft md:text-base">{t}</p>
              </section>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-4 rounded-2xl bg-cream p-5">
            <p className="flex-1 text-sm text-ink-soft">Have a question about this policy?</p>
            <Button to="/contact" size="sm">Contact us</Button>
          </div>
        </article>
      </div>
    </section>
  );
}
