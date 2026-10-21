import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import Reveal from '@/components/ui/Reveal';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Newsletter signup – Step 7 ke baad backend API se judega */
export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email, like name@gmail.com');
      return;
    }
    setError('');
    setEmail('');
    // TODO (Step 7): POST /api/newsletter
    toast.success('Subscribed! Watch your inbox for offers.');
  };

  return (
    <section className="container-page pb-16 md:pb-24" aria-labelledby="news-heading">
      <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-cream px-6 py-12 text-center sm:px-10 md:py-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-primary shadow-card">
          <HiOutlineEnvelope size={24} />
        </span>
        <h2 id="news-heading" className="mx-auto mt-5 max-w-xl text-[1.75rem] md:text-[2.25rem]">
          Get 10% off your first order
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-muted">
          Join our list for new arrivals, festive offers and gifting ideas. No spam, ever.
        </p>

        <form onSubmit={submit} noValidate className="mx-auto mt-7 max-w-md">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-0 sm:rounded-pill sm:border sm:border-line sm:bg-white sm:p-1.5">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-invalid={!!error}
              aria-describedby={error ? 'newsletter-error' : undefined}
              className="h-12 flex-1 rounded-pill border border-line bg-white px-5 text-[15px] text-ink outline-none placeholder:text-muted focus:border-primary sm:h-11 sm:border-0"
            />
            <button type="submit" className="h-12 rounded-pill bg-primary px-7 text-[15px] font-medium text-white transition-colors hover:bg-primary-dark sm:h-11">
              Subscribe
            </button>
          </div>
          {error && (
            <p id="newsletter-error" className="mt-3 text-sm text-primary-dark">{error}</p>
          )}
        </form>
      </Reveal>
    </section>
  );
}
