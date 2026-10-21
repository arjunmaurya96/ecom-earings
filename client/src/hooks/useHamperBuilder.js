import { useEffect, useMemo, useReducer } from 'react';
import { HAMPER_BOXES, RIBBONS } from '@/data/hamper';
import { loadState, saveState } from '@/utils/storage';

/**
 * HAMPER BUILDER STATE
 * step: 0 Box → 1 Items → 2 Personalise → 3 Review
 * Draft localStorage mein save hota hai (refresh pe progress nahi jaati)
 *
 * item = { key, id, name, image|icon, tint, price, mrp, color, size, qty, kind: 'product'|'treat' }
 */
const DRAFT_KEY = 'pa_hamper_draft';

export const STEPS = ['Choose box', 'Pick items', 'Personalise', 'Review'];

const initial = {
  step: 0,
  boxId: 'classic',
  ribbon: RIBBONS[0].name,
  items: [],
  occasion: 'Birthday',
  to: '',
  from: '',
  message: '',
  hidePrices: true,
};

function reducer(state, a) {
  switch (a.type) {
    case 'STEP':
      return { ...state, step: Math.max(0, Math.min(STEPS.length - 1, a.step)) };
    case 'BOX':
      return { ...state, boxId: a.boxId };
    case 'SET':
      return { ...state, [a.field]: a.value };
    case 'ADD': {
      const ex = state.items.find((i) => i.key === a.item.key);
      if (ex) return { ...state, items: state.items.map((i) => (i.key === a.item.key ? { ...i, qty: i.qty + 1 } : i)) };
      return { ...state, items: [...state.items, { ...a.item, qty: 1 }] };
    }
    case 'DEC': {
      const ex = state.items.find((i) => i.key === a.key);
      if (!ex) return state;
      if (ex.qty <= 1) return { ...state, items: state.items.filter((i) => i.key !== a.key) };
      return { ...state, items: state.items.map((i) => (i.key === a.key ? { ...i, qty: i.qty - 1 } : i)) };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.key !== a.key) };
    case 'RESET':
      return { ...initial };
    default:
      return state;
  }
}

export default function useHamperBuilder() {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({ ...initial, ...loadState(DRAFT_KEY, {}) }));

  useEffect(() => saveState(DRAFT_KEY, state), [state]);

  const box = HAMPER_BOXES.find((b) => b.id === state.boxId) || HAMPER_BOXES[1];
  const ribbon = RIBBONS.find((r) => r.name === state.ribbon) || RIBBONS[0];

  const totals = useMemo(() => {
    const count = state.items.reduce((n, i) => n + i.qty, 0);
    const itemsTotal = state.items.reduce((n, i) => n + i.price * i.qty, 0);
    const itemsMrp = state.items.reduce((n, i) => n + (i.mrp || i.price) * i.qty, 0);
    return {
      count,
      itemsTotal,
      boxPrice: box.price,
      total: itemsTotal + box.price,
      mrp: itemsMrp + box.price,
      left: box.capacity - count,
      full: count >= box.capacity,
      over: count > box.capacity,
    };
  }, [state.items, box]);

  const actions = {
    goTo: (step) => dispatch({ type: 'STEP', step }),
    next: () => dispatch({ type: 'STEP', step: state.step + 1 }),
    back: () => dispatch({ type: 'STEP', step: state.step - 1 }),
    setBox: (boxId) => dispatch({ type: 'BOX', boxId }),
    set: (field, value) => dispatch({ type: 'SET', field, value }),
    add: (item) => dispatch({ type: 'ADD', item }),
    dec: (key) => dispatch({ type: 'DEC', key }),
    remove: (key) => dispatch({ type: 'REMOVE', key }),
    reset: () => dispatch({ type: 'RESET' }),
  };

  /** Agle step pe ja sakte hain? warna kya galat hai */
  const blocker = (() => {
    if (state.step === 1 && totals.count === 0) return 'Add at least one item to your hamper';
    if (state.step >= 1 && totals.over) return `Your ${box.name} holds ${box.capacity} items. Remove ${totals.count - box.capacity} or pick a bigger box.`;
    return '';
  })();

  return { state, box, ribbon, totals, actions, blocker };
}
