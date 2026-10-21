import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa6';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineClock, HiCheckCircle } from 'react-icons/hi2';
import { SITE } from '@/config/site.config';
import { whatsappLink } from '@/utils/whatsapp';
import { isEmail, isPhone } from '@/utils/validate';
import { TextField, TextArea, SelectField, SubmitButton } from '@/components/form/Field';

const TOPICS = ['Order status', 'Return or exchange', 'Custom hamper', 'Bulk / corporate order', 'Something else'];

/** /contact – Step 7 ke baad form backend (email) pe jaayega */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => {
    setForm({ ...form, [k]: k === 'phone' ? e.target.value.replace(/\D/g, '').slice(0, 10) : e.target.value });
    setErrors({ ...errors, [k]: '' });
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 2) er.name = 'Enter your name';
    if (!isEmail(form.email)) er.email = 'Enter a valid email';
    if (form.phone && !isPhone(form.phone)) er.phone = 'Enter a 10-digit mobile number';
    if (!form.topic) er.topic = 'Choose a topic';
    if (form.message.trim().length < 10) er.message = 'Tell us a little more (at least 10 characters)';
    setErrors(er);
    if (Object.keys(er).length) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // TODO (Step 7): POST /api/contact
    setLoading(false);
    setSent(true);
    toast.success('Message sent');
  };

  const cards = [
    { icon: FaWhatsapp, title: 'WhatsApp', value: SITE.phone, note: 'Fastest reply', href: whatsappLink(`Hi ${SITE.name}!`), tone: 'text-whatsapp' },
    { icon: HiOutlinePhone, title: 'Call us', value: SITE.phone, note: 'Mon–Sat, 10am–7pm' },
    { icon: HiOutlineEnvelope, title: 'Email', value: SITE.email, note: 'Reply within 24 hours' },
    { icon: FaInstagram, title: 'Instagram', value: SITE.instagramHandle, note: 'DM us anytime', href: SITE.social.instagram },
  ];

  return (
    <section className="container-page pb-16">
      <Helmet>
        <title>{`Contact us | ${SITE.name}`}</title>
        <meta name="description" content={`Get in touch with ${SITE.name} on WhatsApp, phone or email.`} />
      </Helmet>

      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">We are here to help</p>
        <h1 className="mt-3 text-[2rem] md:text-5xl">Contact us</h1>
        <p className="mt-3 text-[15px] text-muted md:text-base">
          Questions about an order, a custom hamper or a bulk gift? Message us – a real person will reply. You can also check our{' '}
          <Link to="/faq" className="font-medium text-primary hover:underline">FAQ</Link>.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_1.3fr]">
        <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {cards.map(({ icon: Icon, title, value, note, href, tone }) => {
            const inner = (
              <>
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blush ${tone || 'text-primary'}`}><Icon size={22} /></span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted">{title}</span>
                  <span className="block select-all break-all font-semibold text-ink">{value}</span>
                  <span className="block text-xs text-muted">{note}</span>
                </span>
              </>
            );
            return href ? (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-primary/40">
                {inner}
              </a>
            ) : (
              <div key={title} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4">{inner}</div>
            );
          })}
          <p className="flex items-center gap-2 px-1 text-sm text-muted">
            <HiOutlineClock /> Support hours: Monday – Saturday, 10am – 7pm
          </p>
        </div>

        <div className="rounded-3xl bg-cream p-5 sm:p-8">
          {sent ? (
            <div className="py-10 text-center">
              <HiCheckCircle className="mx-auto text-success" size={56} />
              <h2 className="mt-4 text-2xl">Thank you, {form.name.split(' ')[0]}!</h2>
              <p className="mt-2 text-muted">We have received your message and will reply on {form.email} within 24 hours.</p>
              <button type="button" onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', topic: '', message: '' }); }} className="mt-6 text-sm font-semibold text-primary hover:underline">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-4">
              <h2 className="text-xl">Send us a message</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField id="ct-name" label="Your name" value={form.name} onChange={set('name')} error={errors.name} autoComplete="name" />
                <TextField id="ct-email" label="Email" type="email" value={form.email} onChange={set('email')} error={errors.email} autoComplete="email" />
                <TextField id="ct-phone" label="Mobile number" optional inputMode="numeric" value={form.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" />
                <SelectField id="ct-topic" label="Topic" value={form.topic} onChange={set('topic')} error={errors.topic} options={TOPICS} placeholder="Choose a topic" />
              </div>
              <TextArea id="ct-message" label="Message" rows={5} value={form.message} onChange={set('message')} error={errors.message} placeholder="Include your order number if it is about an order" />
              <SubmitButton loading={loading} className="sm:!w-auto sm:px-10">Send message</SubmitButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
