import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';
import { SmoothScrollProvider } from './SmoothScrollContext';
import { AuthProvider } from './AuthContext';
import { OrderProvider } from './OrderContext';

/**
 * Saare contexts ek jagah: SmoothScroll, Auth, Orders, Wishlist, Cart.
 */
export default function AppProviders({ children }) {
  return (
    <HelmetProvider>
      <SmoothScrollProvider>
        <AuthProvider>
        <OrderProvider>
        <WishlistProvider>
          <CartProvider>
            {children}
            <Toaster
              position="bottom-center"
              toastOptions={{
                duration: 2200,
                style: {
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  borderRadius: '999px',
                  background: '#2B1A17',
                  color: '#fff',
                  padding: '10px 18px',
                },
                success: { iconTheme: { primary: '#D6246E', secondary: '#fff' } },
              }}
            />
          </CartProvider>
        </WishlistProvider>
        </OrderProvider>
        </AuthProvider>
      </SmoothScrollProvider>
    </HelmetProvider>
  );
}
