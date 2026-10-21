import { GiChocolateBar, GiCandleLight, GiRose, GiPerfumeBottle, GiCupcake, GiLipstick } from 'react-icons/gi';

const ICONS = { GiChocolateBar, GiCandleLight, GiRose, GiPerfumeBottle, GiCupcake, GiLipstick };

/** Treat ka icon (photo ki jagah) – data/hamper.js mein `icon` ka naam */
export default function TreatIcon({ name, tint, className = '', size = 32 }) {
  const Icon = ICONS[name] || GiCupcake;
  return (
    <span className={`grid place-items-center ${className}`} style={{ background: `${tint}22`, color: tint }}>
      <Icon size={size} />
    </span>
  );
}
