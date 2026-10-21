// Form validation – saare forms mein ek jaisa
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim());
export const isPhone = (v) => /^[6-9]\d{9}$/.test(String(v).replace(/\D/g, '').slice(-10)) && String(v).replace(/\D/g, '').length >= 10;
export const isPincode = (v) => /^[1-9]\d{5}$/.test(String(v).trim());

/** Password: kam se kam 8, ek letter + ek number */
export const passwordProblem = (v) => {
  if (!v || v.length < 8) return 'Use at least 8 characters';
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return 'Use at least one letter and one number';
  return '';
};

export const passwordStrength = (v = '') => {
  let s = 0;
  if (v.length >= 8) s++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
  if (/\d/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v) || v.length >= 12) s++;
  return s; // 0–4
};
