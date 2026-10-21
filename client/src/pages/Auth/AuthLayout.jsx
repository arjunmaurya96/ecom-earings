import { Helmet } from 'react-helmet-async';
import { SITE } from '@/config/site.config';
import { unsplash } from '@/utils/image';
import Reveal from '@/components/ui/Reveal';

const PERKS = ['Track your orders easily', 'Save addresses for faster checkout', 'Get early access to new drops & offers'];

/** Login / Register / Forgot – left photo panel + right form */
export default function AuthLayout({ title, subtitle, children, metaTitle }) {
  return (
    <section className="container-page pb-16">
      <Helmet>
        <title>{`${metaTitle || title} | ${SITE.name}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-line bg-white shadow-card md:grid-cols-[1fr_1.1fr]">
        <div className="relative hidden overflow-hidden bg-blush md:block">
          <img src={unsplash('1744177762306-6432f05fa7b1', 700, 900)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/85 p-5 shadow-card backdrop-blur-md">
            <p className="text-sm font-semibold text-ink">Why create an account?</p>
            <ul className="mt-2 space-y-1.5 text-[13.5px] text-ink-soft">
              {PERKS.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Reveal className="p-6 sm:p-10">
          <h1 className="text-[1.75rem] md:text-[2rem]">{title}</h1>
          {subtitle && <p className="mt-2 text-[15px] text-muted">{subtitle}</p>}
          <div className="mt-7">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
