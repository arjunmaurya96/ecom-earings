import { useState } from 'react';
import { HiOutlineMapPin, HiOutlineTruck, HiOutlineBanknotes } from 'react-icons/hi2';

const addDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
};

/**
 * Delivery check (abhi dummy: 6 digit pincode pe 3–6 din)
 * TODO (Step 9): shipping partner API se asli delivery date
 */
export default function PincodeCheck() {
  const [pin, setPin] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const check = (e) => {
    e.preventDefault();
    if (!/^[1-9]\d{5}$/.test(pin)) {
      setError('Enter a valid 6-digit pincode, like 302001');
      setResult(null);
      return;
    }
    setError('');
    const metro = /^(11|40|56|60|70|50)/.test(pin);
    setResult({ from: addDays(metro ? 2 : 4), to: addDays(metro ? 4 : 7) });
  };

  return (
    <div className="rounded-2xl border border-line p-4">
      <form onSubmit={check} className="flex items-center gap-2">
        <HiOutlineMapPin className="shrink-0 text-primary" size={20} />
        <label htmlFor="pincode" className="sr-only">Delivery pincode</label>
        <input
          id="pincode"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter pincode to check delivery"
          className="h-10 min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
        />
        <button type="submit" className="h-9 shrink-0 rounded-pill bg-ink px-4 text-sm font-medium text-white hover:bg-primary">
          Check
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-primary-dark">{error}</p>}
      {result && (
        <ul className="mt-3 space-y-1.5 border-t border-line pt-3 text-sm text-ink-soft">
          <li className="flex items-center gap-2">
            <HiOutlineTruck className="text-success" />
            Delivery by <span className="font-semibold text-ink">{result.from} – {result.to}</span>
          </li>
          <li className="flex items-center gap-2">
            <HiOutlineBanknotes className="text-success" /> Cash on Delivery available
          </li>
        </ul>
      )}
    </div>
  );
}
