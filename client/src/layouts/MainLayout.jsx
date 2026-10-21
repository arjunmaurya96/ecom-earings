import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer/Footer';
import IntroDoor from '@/components/widgets/IntroDoor';
import WhatsAppFloat from '@/components/widgets/WhatsAppFloat';
import BackToTop from '@/components/widgets/BackToTop';
import CartDrawer from '@/components/cart/CartDrawer';

// In pages pe hero banner header ke neeche se shuru hota hai (header banner ke upar dikhta hai)
const FULL_BLEED_PAGES = ['/'];

/** Page load hote waqt chhota spinner – sirf page wale hisse mein */
function PageLoader() {
  return (
    <div className="grid min-h-[100svh] place-items-center" role="status" aria-label="Loading">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
    </div>
  );
}

/** Har page: Header + page content + Footer */
export default function MainLayout() {
  const { pathname } = useLocation();
  const fullBleed = FULL_BLEED_PAGES.includes(pathname);

  return (
    <>
      <IntroDoor />
      <Header />
      {/* Baaki pages pe fixed header ke liye jagah */}
      <main id="main" className={`min-h-[60vh] ${fullBleed ? '' : 'pt-[120px] md:pt-[136px]'}`}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
      <CartDrawer />
    </>
  );
}
