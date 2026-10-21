import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadState, saveState } from '@/utils/storage';

/**
 * AUTH CONTEXT  (⚠️ DEMO – abhi browser mein hi chalta hai)
 * ----------------------------------------------------------
 * Step 8 mein ye functions backend API se judenge:
 *   login    → POST /api/auth/login
 *   register → POST /api/auth/register
 *   forgot   → POST /api/auth/forgot-password
 *   profile / addresses → /api/users/me
 * Pages ko kuch badalna nahi padega – sirf is file ke andar ka code.
 *
 * Demo mein password plain text nahi, SHA-256 hash save hota hai.
 */
const USERS_KEY = 'pa_demo_users';
const SESSION_KEY = 'pa_session';
const AuthContext = createContext(null);

async function hash(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const publicUser = ({ passwordHash, ...u }) => u; // eslint-disable-line no-unused-vars
const uid = () => Math.random().toString(36).slice(2, 10);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => loadState(USERS_KEY, []));
  const [sessionEmail, setSessionEmail] = useState(() => loadState(SESSION_KEY, null));

  useEffect(() => saveState(USERS_KEY, users), [users]);
  useEffect(() => saveState(SESSION_KEY, sessionEmail), [sessionEmail]);

  const record = users.find((u) => u.email === sessionEmail) || null;
  const user = record ? publicUser(record) : null;

  const patchUser = useCallback(
    (fn) => setUsers((list) => list.map((u) => (u.email === sessionEmail ? { ...u, ...fn(u) } : u))),
    [sessionEmail],
  );

  /** register({ name, email, phone, password }) → { ok, message } */
  const register = useCallback(
    async ({ name, email, phone, password }) => {
      const e = email.trim().toLowerCase();
      if (users.some((u) => u.email === e)) return { ok: false, message: 'An account with this email already exists. Please log in.' };
      const newUser = {
        id: uid(),
        name: name.trim(),
        email: e,
        phone: phone.trim(),
        passwordHash: await hash(password),
        addresses: [],
        createdAt: new Date().toISOString(),
      };
      setUsers((list) => [...list, newUser]);
      setSessionEmail(e);
      return { ok: true };
    },
    [users],
  );

  /** login(email, password) → { ok, message } */
  const login = useCallback(
    async (email, password) => {
      const e = email.trim().toLowerCase();
      const u = users.find((x) => x.email === e);
      if (!u || u.passwordHash !== (await hash(password))) {
        return { ok: false, message: 'Email or password is incorrect.' };
      }
      setSessionEmail(e);
      return { ok: true };
    },
    [users],
  );

  const logout = useCallback(() => setSessionEmail(null), []);

  /** Demo: hamesha "link sent" (Step 8 mein email jaayega) */
  const forgotPassword = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true };
  }, []);

  const updateProfile = useCallback(({ name, phone }) => patchUser(() => ({ name: name.trim(), phone: phone.trim() })), [patchUser]);

  const changePassword = useCallback(
    async (current, next) => {
      if (!record || record.passwordHash !== (await hash(current))) return { ok: false, message: 'Current password is incorrect.' };
      const passwordHash = await hash(next);
      patchUser(() => ({ passwordHash }));
      return { ok: true };
    },
    [record, patchUser],
  );

  // ---- Addresses ----
  const saveAddress = useCallback(
    (address) =>
      patchUser((u) => {
        const list = u.addresses || [];
        const id = address.id || uid();
        const makeDefault = address.isDefault || list.length === 0;
        let next = list.some((a) => a.id === id) ? list.map((a) => (a.id === id ? { ...address, id } : a)) : [...list, { ...address, id }];
        if (makeDefault) next = next.map((a) => ({ ...a, isDefault: a.id === id }));
        return { addresses: next };
      }),
    [patchUser],
  );
  const deleteAddress = useCallback(
    (id) =>
      patchUser((u) => {
        const next = (u.addresses || []).filter((a) => a.id !== id);
        if (next.length && !next.some((a) => a.isDefault)) next[0] = { ...next[0], isDefault: true };
        return { addresses: next };
      }),
    [patchUser],
  );

  const value = useMemo(
    () => ({ user, isLoggedIn: !!user, register, login, logout, forgotPassword, updateProfile, changePassword, saveAddress, deleteAddress }),
    [user, register, login, logout, forgotPassword, updateProfile, changePassword, saveAddress, deleteAddress],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
