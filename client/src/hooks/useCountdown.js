import { useEffect, useState } from 'react';

const calc = (target) => {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    ended: diff === 0,
  };
};

/** Offer countdown: useCountdown('2026-11-15T23:59:59+05:30') */
export default function useCountdown(target) {
  const [time, setTime] = useState(() => calc(target));
  useEffect(() => {
    const t = setInterval(() => setTime(calc(target)), 1000);
    return () => clearInterval(t);
  }, [target]);
  return time;
}
