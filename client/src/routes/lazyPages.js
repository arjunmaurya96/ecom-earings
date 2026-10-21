import { lazy } from 'react';

/**
 * Har page alag file mein load hota hai (shuru mein kam JavaScript = fast website).
 * `prefetchPages()` website khulne ke thodi der baad saare pages background mein
 * download kar leta hai – isliye kisi bhi page pe jaate hi wo turant khulta hai.
 */
const loaders = {
  Shop: () => import('@/pages/Shop/Shop'),
  Product: () => import('@/pages/Product/Product'),
  Cart: () => import('@/pages/Cart/Cart'),
  Wishlist: () => import('@/pages/Wishlist/Wishlist'),
  HamperBuilder: () => import('@/pages/HamperBuilder/HamperBuilder'),
  Login: () => import('@/pages/Auth/Login'),
  Register: () => import('@/pages/Auth/Register'),
  ForgotPassword: () => import('@/pages/Auth/ForgotPassword'),
  Checkout: () => import('@/pages/Checkout/Checkout'),
  OrderSuccess: () => import('@/pages/OrderSuccess/OrderSuccess'),
  Account: () => import('@/pages/Account/Account'),
  About: () => import('@/pages/Info/About'),
  Contact: () => import('@/pages/Info/Contact'),
  Faq: () => import('@/pages/Info/Faq'),
  Policy: () => import('@/pages/Info/Policy'),
  ComingSoon: () => import('@/pages/ComingSoon/ComingSoon'),
};

export const Shop = lazy(loaders.Shop);
export const Product = lazy(loaders.Product);
export const Cart = lazy(loaders.Cart);
export const Wishlist = lazy(loaders.Wishlist);
export const HamperBuilder = lazy(loaders.HamperBuilder);
export const Login = lazy(loaders.Login);
export const Register = lazy(loaders.Register);
export const ForgotPassword = lazy(loaders.ForgotPassword);
export const Checkout = lazy(loaders.Checkout);
export const OrderSuccess = lazy(loaders.OrderSuccess);
export const Account = lazy(loaders.Account);
export const About = lazy(loaders.About);
export const Contact = lazy(loaders.Contact);
export const Faq = lazy(loaders.Faq);
export const Policy = lazy(loaders.Policy);
export const ComingSoon = lazy(loaders.ComingSoon);

let prefetched = false;
export function prefetchPages() {
  if (prefetched) return;
  prefetched = true;
  const run = () => Object.values(loaders).forEach((load) => load().catch(() => {}));
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 3000 });
  else setTimeout(run, 1500);
}
