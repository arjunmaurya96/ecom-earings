import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/data/categories';
import { resizeUrl } from '@/utils/image';

/** Hero ke neeche chalti hui category patti – click karke category pe jao */
export default function CategoryMarquee() {
  const list = [...CATEGORIES, ...CATEGORIES];
  return (
    <section className="overflow-hidden border-y border-line bg-cream py-4 md:py-5" aria-label="Categories">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((half) => (
          <ul key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
            {list.map((c, i) => (
              <li key={`${half}-${i}`} className="flex items-center">
                <Link
                  to={`/category/${c.slug}`}
                  tabIndex={half === 1 ? -1 : undefined}
                  className="group flex items-center gap-3 px-5 md:px-7"
                >
                  <img src={resizeUrl(c.image, 96, 96)} alt="" loading="lazy" width="48" height="48" className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-card md:h-12 md:w-12" />
                  <span className="whitespace-nowrap text-lg font-medium text-ink transition-colors group-hover:text-primary md:text-2xl">
                    {c.name}
                  </span>
                </Link>
                <span className="text-gold">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
