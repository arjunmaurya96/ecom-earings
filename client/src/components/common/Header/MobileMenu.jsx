import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HiXMark, HiChevronDown } from 'react-icons/hi2';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa6';
import { MAIN_NAV, CATEGORY_GROUPS } from '@/config/navigation';
import { SITE } from '@/config/site.config';
import { whatsappLink } from '@/utils/whatsapp';
import Logo from '@/components/ui/Logo';
import Portal from '@/components/ui/Portal';
import { useAuth } from '@/context/AuthContext';
import useOverlay from '@/hooks/useOverlay';

/** Mobile drawer menu – categories accordion ke saath */
export default function MobileMenu({ open, onClose }) {
  const [expanded, setExpanded] = useState(CATEGORY_GROUPS[0].title);
  useOverlay(open, onClose);
  const { user } = useAuth();

  return (
    <Portal>
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[150] bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed inset-y-0 left-0 z-[151] flex w-[86%] max-w-sm flex-col bg-white shadow-lift"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Menu"
            data-lenis-prevent
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo size={42} />
              <button type="button" onClick={onClose} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full hover:bg-blush">
                <HiXMark size={22} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-1">
                {MAIN_NAV.filter((n) => !n.mega).map((n) => (
                  <li key={n.to}>
                    <NavLink
                      to={n.to}
                      end
                      onClick={onClose}
                      className={({ isActive }) =>
                        `block rounded-xl px-3 py-3 text-[15px] font-medium ${isActive ? 'bg-blush text-primary' : 'text-ink hover:bg-blush/60'}`
                      }
                    >
                      {n.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <p className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Shop by category</p>
              {CATEGORY_GROUPS.map((g) => {
                const isOpen = expanded === g.title;
                return (
                  <div key={g.title} className="border-b border-line last:border-0">
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : g.title)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between px-3 py-3.5 text-[15px] font-medium text-ink"
                    >
                      {g.title}
                      <HiChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden pb-2"
                        >
                          {g.items.map((it) => (
                            <li key={it.to}>
                              <Link to={it.to} onClick={onClose} className="block px-6 py-2 text-[14.5px] text-ink-soft hover:text-primary">
                                {it.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="space-y-3 border-t border-line p-5">
              <div className="grid grid-cols-2 gap-2">
                <Link to={user ? '/account' : '/login'} onClick={onClose} className="flex h-11 items-center justify-center rounded-pill border border-line text-sm font-medium text-ink">
                  {user ? `Hi, ${user.name.split(' ')[0]}` : 'Log in'}
                </Link>
                <Link to="/wishlist" onClick={onClose} className="flex h-11 items-center justify-center rounded-pill border border-line text-sm font-medium text-ink">
                  Wishlist
                </Link>
              </div>
              <a
                href={whatsappLink(`Hi ${SITE.name}!`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center justify-center gap-2 rounded-pill bg-whatsapp text-sm font-medium text-white"
              >
                <FaWhatsapp size={18} /> Chat on WhatsApp
              </a>
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm text-ink-soft">
                <FaInstagram /> {SITE.instagramHandle}
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
    </Portal>
  );
}
