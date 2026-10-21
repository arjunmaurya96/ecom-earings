import { useEffect, useRef } from 'react';
import { useSmoothScroll } from '@/context/SmoothScrollContext';

/**
 * Popup khula ho to:
 *  - page scroll band (Lenis + body)
 *  - Escape dabane pe band
 * Sab popups/drawers yahi use karte hain, taaki behaviour ek jaisa rahe.
 */
export default function useOverlay(open, onClose) {
  const lenis = useSmoothScroll();
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    lenis?.stop();
    const onKey = (e) => e.key === 'Escape' && closeRef.current?.();
    window.addEventListener('keydown', onKey);
    return () => {
      html.style.overflow = prev;
      lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open, lenis]);
}
