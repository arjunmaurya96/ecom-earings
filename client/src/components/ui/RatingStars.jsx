import { HiStar } from 'react-icons/hi2';

export default function RatingStars({ rating = 0, size = 14, className = '' }) {
  return (
    <span role="img" className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <HiStar key={n} size={size} className={n <= Math.round(rating) ? 'text-gold' : 'text-line'} />
      ))}
    </span>
  );
}
