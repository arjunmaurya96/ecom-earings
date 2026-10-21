/**
 * Delivery date ka andaza (DEMO)
 * TODO (Step 9): shipping partner (Shiprocket/Delhivery) API se asli date
 */
const METRO = /^(11|40|56|60|70|50)/; // Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad

const fmt = (d) => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

export function estimateDelivery(pincode, from = new Date()) {
  const metro = METRO.test(String(pincode || ''));
  const a = new Date(from);
  const b = new Date(from);
  a.setDate(a.getDate() + (metro ? 2 : 4));
  b.setDate(b.getDate() + (metro ? 4 : 7));
  return { from: fmt(a), to: fmt(b), label: `${fmt(a)} – ${fmt(b)}` };
}
