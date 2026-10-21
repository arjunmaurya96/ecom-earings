import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home/Home';
import RequireAuth from './RequireAuth';
import {
  Shop, Product, Cart, Wishlist, HamperBuilder, Login, Register, ForgotPassword,
  Checkout, OrderSuccess, Account, About, Contact, Faq, Policy, ComingSoon, prefetchPages,
} from './lazyPages';

/**
 * Saare routes yahan. Naya page banega to:
 *   1. routes/lazyPages.js mein uska loader + export add karo
 *   2. yahan <Route path="..." element={<NewPage />} /> add karo
 * Loading spinner sirf page wale hisse mein dikhta hai (MainLayout ke andar),
 * isliye Header, Footer aur Cart drawer kabhi gayab ya atakte nahi.
 */
export default function AppRoutes() {
  // Website khulne ke baad baaki pages background mein load
  useEffect(() => {
    const t = setTimeout(prefetchPages, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        {/* Step 3: Shop + Category */}
        <Route path="shop" element={<Shop />} />
        <Route path="category/:slug" element={<Shop />} />
        {/* Step 4: Product detail */}
        <Route path="product/:slug" element={<Product />} />
        {/* Step 5: Cart + Wishlist */}
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        {/* Step 6: Custom Hamper Builder */}
        <Route path="build-hamper" element={<HamperBuilder />} />
        {/* A: Login / Register / Forgot password */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        {/* B: Checkout + Order success */}
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-success/:id" element={<OrderSuccess />} />
        {/* C: My Account (login zaroori) */}
        <Route path="account" element={<RequireAuth><Account /></RequireAuth>} />
        <Route path="account/:tab" element={<RequireAuth><Account /></RequireAuth>} />
        {/* D: Info pages */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<Faq />} />
        <Route path="privacy-policy" element={<Policy />} />
        <Route path="return-policy" element={<Policy />} />
        <Route path="shipping-policy" element={<Policy />} />
        <Route path="terms" element={<Policy />} />
        {/* Baaki (reviews form – Step 10) aur galat links */}
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}
