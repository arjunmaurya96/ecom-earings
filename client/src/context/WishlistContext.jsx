import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import toast from 'react-hot-toast';
import { loadState, saveState } from '@/utils/storage';

const STORAGE_KEY = 'pa_wishlist';
const WishlistContext = createContext(null);

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return state.includes(action.id) ? state.filter((id) => id !== action.id) : [...state, action.id];
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [ids, dispatch] = useReducer(wishlistReducer, [], () => loadState(STORAGE_KEY, []));

  useEffect(() => saveState(STORAGE_KEY, ids), [ids]);

  const toggleWishlist = useCallback(
    (product) => {
      const wasSaved = ids.includes(product.id);
      dispatch({ type: 'TOGGLE', id: product.id });
      toast(wasSaved ? 'Removed from wishlist' : 'Saved to wishlist', { icon: wasSaved ? '🤍' : '💗' });
    },
    [ids],
  );

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      isWishlisted: (id) => ids.includes(id),
      toggleWishlist,
      clearWishlist: () => dispatch({ type: 'CLEAR' }),
    }),
    [ids, toggleWishlist],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
};
