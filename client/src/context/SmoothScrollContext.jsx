import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

/**
 * Lenis smooth scrolling – poori site pe.
 * useSmoothScroll() se lenis milta hai (stop/start/scrollTo ke liye).
 */
const SmoothScrollContext = createContext(null);

export function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const rafRef = useRef(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const instance = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.95 });
    const raf = (time) => {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);
    setLenis(instance);

    return () => {
      cancelAnimationFrame(rafRef.current);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Naye page pe jaate hi top pe
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return <SmoothScrollContext.Provider value={lenis}>{children}</SmoothScrollContext.Provider>;
}

export const useSmoothScroll = () => useContext(SmoothScrollContext);
