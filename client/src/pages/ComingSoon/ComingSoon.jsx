import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/ui/Button';

/**
 * Jo pages abhi bane nahi hain unke liye temporary page.
 * Har naye step mein yahan se route hata ke asli page lagayenge.
 */
const PLANNED = [
  { match: /^\/reviews/, title: 'Write a review', step: 10 },
];

export default function ComingSoon() {
  const { pathname } = useLocation();
  const page = PLANNED.find((p) => p.match.test(pathname));

  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
      <Helmet>
        <title>Coming soon | Pretty Aura</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {page ? `Step ${page.step}` : 'Page not found'}
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl">{page ? `${page.title} is coming soon` : 'We could not find this page'}</h1>
        <p className="mt-4 text-muted">
          {page
            ? 'This page will be built in an upcoming step. For now, explore the home page.'
            : 'The link may be broken or the page may have moved.'}
        </p>
        <Button to="/" className="mt-8">Back to home</Button>
      </div>
    </section>
  );
}
