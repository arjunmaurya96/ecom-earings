import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { discountPercent } from '@/utils/format';

/**
 * SHOP FILTERS – saara filter + sort logic ek jagah
 * ----------------------------------------------------------
 * Filters URL mein save hote hain, jaise:
 *   /category/jhumka?color=Pink,Multicolor&min=200&max=600&sort=price-asc
 * Isliye refresh / link share karne pe bhi wahi filters lage rahte hain.
 *
 * Step 7 mein yahi params backend API ko bhej denge (GET /api/products?...)
 */

export const SORT_OPTIONS = [
  { value: 'popular', label: 'Most popular' },
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'discount', label: 'Biggest discount' },
];

export const DISCOUNT_OPTIONS = [20, 30, 40];

const list = (v) => (v ? v.split(',').filter(Boolean) : []);
const num = (v) => (v === null || v === '' || Number.isNaN(Number(v)) ? null : Number(v));

const SORTERS = {
  popular: (a, b) => b.reviewCount - a.reviewCount,
  newest: (a, b) => b._index - a._index,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
  discount: (a, b) => discountPercent(b.price, b.mrp) - discountPercent(a.price, a.mrp),
};

/**
 * @param products  saare products
 * @param lockedCategory  /category/:slug wale page pe woh category (filter mein fixed)
 */
export default function useProductFilters(products, lockedCategory = null) {
  const [params, setParams] = useSearchParams();

  // ---- URL se filters padho ----
  const filters = useMemo(
    () => ({
      q: params.get('q') || '',
      categories: lockedCategory ? [lockedCategory] : list(params.get('cat')),
      colors: list(params.get('color')),
      sizes: list(params.get('size')),
      min: num(params.get('min')),
      max: num(params.get('max')),
      discount: num(params.get('disc')),
      inStock: params.get('stock') === '1',
      sort: params.get('sort') || 'popular',
    }),
    [params, lockedCategory],
  );

  // ---- Filters URL mein likho ----
  const update = useCallback(
    (changes) => {
      const next = new URLSearchParams(params);
      const keyMap = { categories: 'cat', colors: 'color', sizes: 'size', discount: 'disc', inStock: 'stock' };
      Object.entries(changes).forEach(([k, v]) => {
        const key = keyMap[k] || k;
        const empty = v === null || v === '' || v === false || (Array.isArray(v) && v.length === 0);
        if (empty) next.delete(key);
        else next.set(key, Array.isArray(v) ? v.join(',') : v === true ? '1' : String(v));
      });
      setParams(next, { replace: true, preventScrollReset: true });
    },
    [params, setParams],
  );

  const toggle = useCallback(
    (field, value) => {
      const cur = filters[field];
      update({ [field]: cur.includes(value) ? cur.filter((x) => x !== value) : [...cur, value] });
    },
    [filters, update],
  );

  const clearAll = useCallback(() => {
    const next = new URLSearchParams();
    if (filters.q) next.set('q', filters.q);
    if (filters.sort !== 'popular') next.set('sort', filters.sort);
    setParams(next, { replace: true, preventScrollReset: true });
  }, [filters.q, filters.sort, setParams]);

  // ---- Scope: category + search (iske andar ke options filters mein dikhte hain) ----
  const indexed = useMemo(() => products.map((p, i) => ({ ...p, _index: i })), [products]);

  const scope = useMemo(() => {
    const term = filters.q.trim().toLowerCase();
    return indexed.filter((p) => {
      if (lockedCategory && p.category !== lockedCategory) return false;
      if (term && !`${p.name} ${p.category.replace(/-/g, ' ')}`.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [indexed, lockedCategory, filters.q]);

  // ---- Har filter check ----
  const checks = useMemo(
    () => ({
      categories: (p) => !filters.categories.length || filters.categories.includes(p.category),
      colors: (p) => !filters.colors.length || p.colors.some((c) => filters.colors.includes(c.name)),
      sizes: (p) => !filters.sizes.length || p.sizes.some((s) => filters.sizes.includes(s.label)),
      price: (p) => (filters.min === null || p.price >= filters.min) && (filters.max === null || p.price <= filters.max),
      discount: (p) => !filters.discount || discountPercent(p.price, p.mrp) >= filters.discount,
      inStock: (p) =>
        !filters.inStock || (p.colors.length ? p.colors.some((c) => c.stock > 0) : true) && (p.sizes.length ? p.sizes.some((s) => s.stock > 0) : true),
    }),
    [filters],
  );

  const passAllExcept = useCallback(
    (p, skip) => Object.entries(checks).every(([k, fn]) => k === skip || fn(p)),
    [checks],
  );

  // ---- Final result ----
  const results = useMemo(() => {
    const out = scope.filter((p) => passAllExcept(p, null));
    return [...out].sort(SORTERS[filters.sort] || SORTERS.popular);
  }, [scope, passAllExcept, filters.sort]);

  // ---- Filter options + counts (baaki filters lagne ke baad kitne bachenge) ----
  const options = useMemo(() => {
    const count = (skip, test) => scope.filter((p) => passAllExcept(p, skip) && test(p)).length;

    const catSlugs = [...new Set(scope.map((p) => p.category))];
    const colorMap = new Map();
    scope.forEach((p) => p.colors.forEach((c) => !colorMap.has(c.name) && colorMap.set(c.name, c.hex)));
    const sizeSet = [...new Set(scope.flatMap((p) => p.sizes.map((s) => s.label)))];
    const prices = scope.map((p) => p.price);

    return {
      categories: catSlugs.map((slug) => ({ value: slug, count: count('categories', (p) => p.category === slug) })),
      colors: [...colorMap].map(([name, hex]) => ({ value: name, hex, count: count('colors', (p) => p.colors.some((c) => c.name === name)) })),
      sizes: sizeSet.map((label) => ({ value: label, count: count('sizes', (p) => p.sizes.some((s) => s.label === label)) })),
      priceMin: prices.length ? Math.floor(Math.min(...prices) / 50) * 50 : 0,
      priceMax: prices.length ? Math.ceil(Math.max(...prices) / 50) * 50 : 0,
    };
  }, [scope, passAllExcept]);

  // ---- Active filter chips ----
  const activeCount =
    (lockedCategory ? 0 : filters.categories.length) +
    filters.colors.length +
    filters.sizes.length +
    (filters.min !== null || filters.max !== null ? 1 : 0) +
    (filters.discount ? 1 : 0) +
    (filters.inStock ? 1 : 0);

  return { filters, results, options, update, toggle, clearAll, activeCount, total: scope.length };
}
