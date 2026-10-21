import { Link } from 'react-router-dom';

/**
 * Ek hi Button poori site ke liye.
 * variant: primary | outline | light | dark | ghost      size: sm | md | lg
 * `to` doge to Link banega, `href` doge to <a>, warna <button>.
 */
const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-dark shadow-soft',
  outline: 'border border-ink/15 text-ink hover:border-primary hover:text-primary bg-white/70',
  light: 'bg-white text-ink hover:bg-blush shadow-card',
  dark: 'bg-ink text-white hover:bg-ink/90',
  ghost: 'text-ink hover:text-primary',
  whatsapp: 'bg-whatsapp text-white hover:brightness-95',
};
const SIZES = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-[15px]',
  lg: 'h-13 px-8 text-base',
};

export default function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-pill font-medium whitespace-nowrap
    transition-all duration-300 ease-soft active:scale-[.98] disabled:opacity-50 disabled:pointer-events-none
    ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}
