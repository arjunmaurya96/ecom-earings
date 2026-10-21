import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi2';

/** Description / Details & Care / Shipping & Returns */
export default function ProductTabs({ product, details }) {
  const tabs = [
    {
      id: 'description',
      label: 'Description',
      body: (
        <div className="space-y-5">
          <p className="max-w-2xl text-[15px] leading-relaxed text-ink-soft md:text-base">{details.about}</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {details.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 rounded-2xl bg-cream p-4 text-sm text-ink">
                <HiCheckCircle className="mt-0.5 shrink-0 text-primary" size={18} />
                {h}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'details',
      label: 'Details & Care',
      body: (
        <div className="grid gap-8 md:grid-cols-2">
          <dl className="divide-y divide-line rounded-2xl border border-line text-sm">
            {[
              ['Material', details.material],
              ['Colours', product.hasColors ? product.colors.map((c) => c.name).join(', ') : '—'],
              ['Sizes', product.hasSizes ? product.sizes.map((s) => s.label).join(', ') : 'One size'],
              ['Product code', `PA-${product.id.toUpperCase()}`],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[120px_1fr] gap-3 px-4 py-3">
                <dt className="text-muted">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <div>
            <h3 className="mb-3 text-base">How to care</h3>
            <ul className="space-y-2 text-[15px] text-ink-soft">
              {details.care.map((c) => (
                <li key={c} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'shipping',
      label: 'Shipping & Returns',
      body: (
        <div className="grid gap-8 md:grid-cols-2">
          {[
            ['Shipping', details.shipping],
            ['Returns & exchange', details.returns],
          ].map(([title, list]) => (
            <div key={title}>
              <h3 className="mb-3 text-base">{title}</h3>
              <ul className="space-y-2 text-[15px] text-ink-soft">
                {list.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
  ];
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active);

  return (
    <section className="container-page section-space !pb-0" aria-label="Product information">
      <div className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto border-b border-line px-4" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={`relative shrink-0 px-4 pb-4 pt-2 text-[15px] font-medium transition-colors md:px-6 ${active === t.id ? 'text-primary' : 'text-muted hover:text-ink'}`}
          >
            {t.label}
            {active === t.id && <motion.span layoutId="tab-line" className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          role="tabpanel"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="pt-8"
        >
          {current.body}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
