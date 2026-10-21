import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiMagnifyingGlass,
  HiBars3,
  HiChevronDown,
} from 'react-icons/hi2';
import { motion } from 'framer-motion';
import { MAIN_NAV } from '@/config/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import useScrolled from '@/hooks/useScrolled';
import Logo from '@/components/ui/Logo';
import AnnouncementBar from './AnnouncementBar';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import SearchOverlay from './SearchOverlay';
import { useAuth } from '@/context/AuthContext';

/**
 * HEADER (floating)
 * - Page ke upar fixed, hero banner ke upar dikhta hai
 * - Top pe: poori width ka glass bar + announcement patti
 * - Thoda scroll karte hi: patti chhup jaati hai, header patla hokar center mein pill ban jaata hai
 */
function IconLink({ to, label, count, children, className = '' }) {
  return (
    <Link
      to={to}
      aria-label={count ? `${label} (${count})` : label}
      className={`relative grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-blush hover:text-primary ${className}`}
    >
      {children}
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  const scrolled = useScrolled(60);
  const { count: cartCount, openDrawer } = useCart();
  const { count: wishCount } = useWishlist();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef();

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const navLink = (isActive) =>
    `relative rounded-pill px-3.5 py-2 text-[15px] font-medium transition-colors xl:px-4 ${
      isActive ? 'text-primary' : 'text-ink hover:text-primary'
    }`;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={closeMega}>
        {/* Announcement – scroll pe chhup jaati hai */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-soft ${scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'}`}
        >
          <AnnouncementBar />
        </div>

        <div
          className={`transition-all duration-500 ease-soft ${scrolled ? 'px-3 pt-3' : 'px-3 pt-3 md:px-5'}`}
        >
          <div
            className={`relative mx-auto flex items-center justify-between gap-3 border border-white/60 backdrop-blur-xl transition-all duration-500 ease-soft
              ${
                scrolled
                  ? 'h-[60px] max-w-5xl rounded-pill bg-white/90 px-3 shadow-lift md:h-16 md:px-4'
                  : 'h-[64px] max-w-[1600px] rounded-2xl bg-white/75 px-3 shadow-card md:h-[76px] md:rounded-3xl md:px-6'
              }`}
          >
            {/* Mobile: menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-blush lg:hidden"
            >
              <HiBars3 size={24} />
            </button>

            <Logo
              size={scrolled ? 40 : 48}
              showText={!scrolled}
              className="max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2 max-sm:[&>span]:hidden [&>img]:transition-all [&>img]:duration-500"
            />

            {/* Desktop nav */}
            <nav className="hidden lg:block" aria-label="Main">
              <ul className="flex items-center">
                {MAIN_NAV.map((n) =>
                  n.mega ? (
                    <li key={n.to} onMouseEnter={openMega}>
                      <NavLink
                        to={n.to}
                        onFocus={openMega}
                        aria-expanded={megaOpen}
                        className={({ isActive }) => `${navLink(isActive || megaOpen)} flex items-center gap-1`}
                      >
                        {n.label}
                        <HiChevronDown className={`transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`} />
                      </NavLink>
                    </li>
                  ) : (
                    <li key={n.to} onMouseEnter={closeMega}>
                      <NavLink to={n.to} end className={({ isActive }) => navLink(isActive)}>
                        {({ isActive }) => (
                          <>
                            {n.label}
                            {isActive && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary" />}
                          </>
                        )}
                      </NavLink>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-blush hover:text-primary"
              >
                <HiMagnifyingGlass size={21} />
              </button>
              <IconLink to="/wishlist" label="Wishlist" count={wishCount} className="max-sm:hidden">
                <HiOutlineHeart size={22} />
              </IconLink>
              {user ? (
                <Link
                  to="/account"
                  aria-label={`My account (${user.name})`}
                  title={user.name}
                  className="grid h-10 w-10 place-items-center rounded-full max-sm:hidden"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-semibold text-white ring-2 ring-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </Link>
              ) : (
                <IconLink to="/login" label="Log in" className="max-sm:hidden">
                  <HiOutlineUser size={21} />
                </IconLink>
              )}
              <button
                type="button"
                onClick={openDrawer}
                aria-label={cartCount ? `Cart (${cartCount})` : 'Cart'}
                className="relative grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-blush hover:text-primary"
              >
                <HiOutlineShoppingBag size={22} />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div onMouseEnter={openMega} className="hidden lg:block">
          <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
