import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES, CATEGORY_DESCRIPTIONS, getCategory } from '@/data/categories';
import { SITE } from '@/config/site.config';
import { unsplash } from '@/utils/image';
import useProductFilters from '@/hooks/useProductFilters';
import { loadState, saveState } from '@/utils/storage';
import Button from '@/components/ui/Button';

import ShopBanner from './sections/ShopBanner/ShopBanner';
import CategoryChips from './sections/CategoryChips/CategoryChips';
import FilterPanel from './sections/FilterPanel/FilterPanel';
import MobileFilters from './sections/FilterPanel/MobileFilters';
import ShopToolbar, { ActiveFilters } from './sections/ShopToolbar/ShopToolbar';
import ProductGrid from './sections/ProductGrid/ProductGrid';

/**
 * SHOP + CATEGORY PAGE (ek hi page dono ke liye)
 *   /shop                 → saare products
 *   /shop?q=jhumka        → search result
 *   /category/:slug       → ek category
 * Sections: Banner → Category chips → [Filters | Toolbar + Active filters + Grid]
 */
const PAGE_SIZE = 12;
const SHOP_BANNER_IMAGE = unsplash('1561828995-aa79a2db86dd', 1000, 700);

export default function Shop() {
  const { slug } = useParams();
  const category = slug ? getCategory(slug) : null;
  const f = useProductFilters(PRODUCTS, category?.slug || null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [cols, setCols] = useState(() => loadState('pa_grid_cols', 3));

  // Filter badalne pe wapas pehle 12 products
  const filterKey = JSON.stringify(f.filters);
  useEffect(() => setVisible(PAGE_SIZE), [filterKey, slug]);
  useEffect(() => saveState('pa_grid_cols', cols), [cols]);

  // Galat category link
  if (slug && !category) {
    return (
      <section className="container-page grid min-h-[50vh] place-items-center py-16 text-center">
        <div>
          <h1 className="text-3xl">We could not find this category</h1>
          <p className="mt-3 text-muted">Pick one of our categories below.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <Button key={c.slug} to={`/category/${c.slug}`} variant="outline" size="sm">{c.name}</Button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const q = f.filters.q;
  const title = category ? category.name : q ? `Results for “${q}”` : 'Shop all';
  const description = category
    ? CATEGORY_DESCRIPTIONS[category.slug]
    : q
      ? 'Products that match your search.'
      : 'Claw clips, scrunchies, earrings, jewellery and gift hampers – all in one place.';
  const crumbs = category
    ? [{ label: 'Shop', to: '/shop' }, { label: category.name }]
    : [{ label: q ? 'Search' : 'Shop' }];

  return (
    <>
      <Helmet>
        <title>{`${title} | ${SITE.name}`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE.url}${category ? `/category/${category.slug}` : '/shop'}`} />
      </Helmet>

      <ShopBanner
        title={title}
        description={description}
        image={category ? category.image.replace(/w=\d+&h=\d+/, 'w=1000&h=700') : SHOP_BANNER_IMAGE}
        crumbs={crumbs}
        count={f.total}
      />

      <CategoryChips />

      <div className="container-page pb-20 pt-8 md:pt-10">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[270px_minmax(0,1fr)] xl:gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block" aria-label="Filters">
            <div className="sticky top-24">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg">Filters</h2>
                {f.activeCount > 0 && (
                  <button type="button" onClick={f.clearAll} className="text-sm font-medium text-primary hover:underline">
                    Clear all ({f.activeCount})
                  </button>
                )}
              </div>
              <div className="max-h-[calc(100vh-170px)] overflow-y-auto pr-2" data-lenis-prevent>
                <FilterPanel f={f} showCategory={!category} />
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <MobileFilters f={f} showCategory={!category} resultCount={f.results.length} />

            <div className="mb-6 space-y-4">
              <ShopToolbar
                shown={Math.min(visible, f.results.length)}
                total={f.results.length}
                sort={f.filters.sort}
                onSort={(v) => f.update({ sort: v === 'popular' ? null : v })}
                cols={cols}
                onCols={setCols}
              />
              <ActiveFilters f={f} lockedCategory={category?.slug} />
            </div>

            <h2 className="sr-only">Products</h2>
            <ProductGrid
              products={f.results}
              visible={visible}
              onLoadMore={() => setVisible((v) => v + PAGE_SIZE)}
              cols={cols}
              onClear={f.clearAll}
            />
          </div>
        </div>
      </div>
    </>
  );
}
