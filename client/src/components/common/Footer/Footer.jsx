import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa6';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin } from 'react-icons/hi2';
import { SITE } from '@/config/site.config';
import { CATEGORY_GROUPS, FOOTER_LINKS } from '@/config/navigation';
import { whatsappLink } from '@/utils/whatsapp';
import Logo from '@/components/ui/Logo';

function Column({ title, children }) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-gold">{title}</h3>
      {children}
    </div>
  );
}

const linkCls = 'text-[14.5px] text-white/70 transition-colors hover:text-white';

export default function Footer() {
  const shopLinks = CATEGORY_GROUPS.flatMap((g) => g.items).filter((i) => i.to.startsWith('/category'));
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      {/* soft glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

      <div className="container-page relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
        {/* Brand */}
        <div>
          <Logo size={56} light />
          <p className="mt-5 max-w-xs text-[14.5px] leading-relaxed text-white/70">{SITE.description}</p>
          <div className="mt-6 flex gap-2.5">
            {[
              { icon: FaInstagram, href: SITE.social.instagram, label: 'Instagram' },
              { icon: FaFacebookF, href: SITE.social.facebook, label: 'Facebook' },
              { icon: FaYoutube, href: SITE.social.youtube, label: 'YouTube' },
              { icon: FaWhatsapp, href: whatsappLink(`Hi ${SITE.name}!`), label: 'WhatsApp' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <Column title="Shop">
          <ul className="grid gap-2.5">
            {shopLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkCls}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </Column>

        <Column title="Help">
          <ul className="grid gap-2.5">
            {[...FOOTER_LINKS.help, ...FOOTER_LINKS.company].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkCls}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </Column>

        <Column title="Get in touch">
          <ul className="grid gap-4 text-[14.5px] text-white/70">
            <li className="flex gap-3">
              <FaWhatsapp className="mt-1 shrink-0 text-whatsapp" />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {SITE.phone} (WhatsApp)
              </a>
            </li>
            <li className="flex gap-3">
              <HiOutlinePhone className="mt-1 shrink-0 text-gold" />
              <span className="select-all">{SITE.phone}</span>
            </li>
            <li className="flex gap-3">
              <HiOutlineEnvelope className="mt-1 shrink-0 text-gold" />
              <span className="select-all break-all">{SITE.email}</span>
            </li>
            <li className="flex gap-3">
              <HiOutlineMapPin className="mt-1 shrink-0 text-gold" />
              <span>{SITE.address}</span>
            </li>
          </ul>
        </Column>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-[13px] text-white/60 md:flex-row">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>We accept</span>
            {['UPI', 'Cards', 'Net Banking', 'Cash on Delivery'].map((m) => (
              <span key={m} className="rounded-md border border-white/15 px-2 py-0.5 text-[12px] text-white/80">{m}</span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
