import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { HiPlus, HiMagnifyingGlass } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';
import { FAQ } from '@/data/infoPages';
import { SITE } from '@/config/site.config';
import { whatsappLink } from '@/utils/whatsapp';
import Button from '@/components/ui/Button';

function Item({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-line">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between gap-4 py-5 text-left">
        <span className="text-[15px] font-medium text-ink md:text-base">{q}</span>
        <HiPlus className={`shrink-0 text-primary transition-transform duration-300 ${open ? 'rotate-45' : ''}`} size={20} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <p className="max-w-2xl pb-5 text-[15px] leading-relaxed text-ink-soft">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** /faq – sawaal: data/infoPages.js */
export default function Faq() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(`${FAQ[0].group}-0`);

  const groups = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return FAQ;
    return FAQ.map((g) => ({ ...g, items: g.items.filter(([qq, aa]) => `${qq} ${aa}`.toLowerCase().includes(t)) })).filter((g) => g.items.length);
  }, [q]);

  // Google ke liye FAQ schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.flatMap((g) => g.items.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } }))),
  };

  return (
    <section className="container-page pb-16">
      <Helmet>
        <title>{`FAQ | ${SITE.name}`}</title>
        <meta name="description" content="Answers about delivery, payments, returns and gift hampers at Pretty Aura." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Help centre</p>
          <h1 className="mt-3 text-[2rem] md:text-5xl">Frequently asked questions</h1>
          <label className="mx-auto mt-7 flex h-13 max-w-lg items-center gap-3 rounded-pill border border-line bg-white px-5">
            <HiMagnifyingGlass className="text-muted" size={19} />
            <span className="sr-only">Search questions</span>
            <input id="faq-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search, e.g. refund, COD, delivery" className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted" />
          </label>
        </div>

        <div className="mt-10 space-y-10">
          {groups.map((g) => (
            <div key={g.group}>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-dark">{g.group}</h2>
              <div className="mt-2">
                {g.items.map(([qq, aa], i) => {
                  const id = `${g.group}-${i}`;
                  return <Item key={id} q={qq} a={aa} open={open === id || !!q} onToggle={() => setOpen(open === id ? null : id)} />;
                })}
              </div>
            </div>
          ))}
          {!groups.length && <p className="text-center text-muted">No questions match “{q}”. Try another word or message us.</p>}
        </div>

        <div className="mt-14 rounded-3xl bg-cream p-8 text-center">
          <h2 className="text-xl">Still have a question?</h2>
          <p className="mt-2 text-muted">We usually reply within a few minutes during working hours.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button href={whatsappLink(`Hi ${SITE.name}! I have a question.`)} variant="whatsapp"><FaWhatsapp size={18} /> Chat on WhatsApp</Button>
            <Button to="/contact" variant="outline">Contact us</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
