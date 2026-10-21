import { Link } from 'react-router-dom';
import { SITE } from '@/config/site.config';

/** Logo + naam. showText=false karne pe sirf round logo. */
export default function Logo({ size = 52, showText = true, light = false, className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={SITE.logo}
        alt={`${SITE.name} logo`}
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="rounded-full shadow-card ring-1 ring-gold/40"
      />
      {showText && (
        <span className="flex flex-col leading-none">
          <span className={`text-[1.2rem] font-semibold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
            Pretty <span className={light ? 'text-primary-light' : 'text-primary-dark'}>Aura</span>
          </span>
          <span className={`mt-1 text-[10px] font-medium uppercase tracking-[0.2em] ${light ? 'text-white/60' : 'text-muted'}`}>
            Accessories & Gifts
          </span>
        </span>
      )}
    </Link>
  );
}
