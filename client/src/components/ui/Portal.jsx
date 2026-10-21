import { createPortal } from 'react-dom';

/**
 * Popup / drawer ko seedha <body> mein render karta hai.
 * Isse koi bhi parent (sticky, transform, overflow) popup ko chhupa ya dhak nahi sakta.
 */
export default function Portal({ children }) {
  if (typeof document === 'undefined') return null;
  return createPortal(children, document.body);
}
