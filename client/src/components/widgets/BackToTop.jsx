import { HiArrowUp } from 'react-icons/hi2';
import useScrolled from '@/hooks/useScrolled';
import { useSmoothScroll } from '@/context/SmoothScrollContext';

export default function BackToTop() {
  const visible = useScrolled(700);
  const lenis = useSmoothScroll();
  const toTop = () => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }));

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className={`fixed bottom-24 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-lift ring-1 ring-line transition-all duration-500 hover:text-primary md:bottom-28 md:right-8
        ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <HiArrowUp size={18} />
    </button>
  );
}
