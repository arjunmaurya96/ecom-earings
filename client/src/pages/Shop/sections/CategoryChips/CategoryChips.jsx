import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CATEGORIES } from '@/data/categories';
import { resizeUrl } from '@/utils/image';

/** Upar ki category list – photo ke saath gol chips, mobile pe side scroll */
export default function CategoryChips() {
  const items = [{ slug: null, name: 'All', image: null }, ...CATEGORIES];
  const listRef = useRef(null);
  const { pathname } = useLocation();

  // Active category chip ko dikhne wali jagah pe le aao (mobile)
  useEffect(() => {
    const list = listRef.current;
    const active = list?.querySelector('[aria-current="page"]');
    if (list && active) list.scrollTo({ left: active.offsetLeft - list.clientWidth / 2 + active.clientWidth / 2, behavior: 'smooth' });
  }, [pathname]);
  return (
    <nav className="container-page mt-6 md:mt-8" aria-label="Categories">
      <ul ref={listRef} className="no-scrollbar relative -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1" data-lenis-prevent>
        {items.map((c) => (
          <li key={c.slug || 'all'} className="shrink-0">
            <NavLink
              to={c.slug ? `/category/${c.slug}` : '/shop'}
              end
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-pill border py-1.5 pl-1.5 pr-4 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'border-primary bg-primary text-white shadow-soft'
                    : 'border-line bg-white text-ink-soft hover:border-primary/40 hover:text-primary'
                } ${c.image ? '' : 'pl-4'}`
              }
            >
              {c.image && <img src={resizeUrl(c.image, 64, 64)} width="32" height="32" alt="" className="h-8 w-8 rounded-full object-cover" loading="lazy" />}
              {c.shortName || c.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
