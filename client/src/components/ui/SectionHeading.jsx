import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import Reveal from './Reveal';

/** Har section ka heading: chhota eyebrow + title + subtitle + optional "View all" link */
export default function SectionHeading({ eyebrow, title, subtitle, link, align = 'left', className = '' }) {
  const centered = align === 'center';
  return (
    <Reveal
      className={`mb-8 md:mb-10 flex flex-col gap-4 ${centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'} ${className}`}
    >
      <div className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        )}
        <h2 className="text-[1.75rem] leading-tight md:text-[2.25rem]">{title}</h2>
        {subtitle && <p className="mt-3 text-[15px] text-muted md:text-base">{subtitle}</p>}
      </div>
      {link && (
        <Link
          to={link.to}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink hover:text-primary"
        >
          {link.label}
          <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </Reveal>
  );
}
