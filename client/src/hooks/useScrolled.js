import { useEffect, useState } from 'react';

/** true jab page itna neeche scroll ho gaya (header shadow, back-to-top ke liye) */
export default function useScrolled(offset = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return scrolled;
}
