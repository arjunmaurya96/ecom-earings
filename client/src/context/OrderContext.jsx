import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadState, saveState } from '@/utils/storage';

/**
 * ORDER CONTEXT  (⚠️ DEMO – orders browser mein save hote hain)
 * Step 9 mein: placeOrder → POST /api/orders (+ Razorpay), orders → GET /api/orders/my
 */
const ORDERS_KEY = 'pa_demo_orders';
const OrderContext = createContext(null);

export const ORDER_STEPS = ['Placed', 'Packed', 'Shipped', 'Delivered'];

/** Demo: order kitna purana hai uske hisaab se status (Step 12 mein admin badlega) */
export const orderStatus = (order) => {
  if (order.status === 'Cancelled') return 'Cancelled';
  const hours = (Date.now() - new Date(order.createdAt).getTime()) / 36e5;
  if (hours > 96) return 'Delivered';
  if (hours > 30) return 'Shipped';
  if (hours > 6) return 'Packed';
  return 'Placed';
};

const newOrderId = () => {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `PA${ymd}${Math.floor(1000 + Math.random() * 9000)}`;
};

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => loadState(ORDERS_KEY, []));
  useEffect(() => saveState(ORDERS_KEY, orders), [orders]);

  /** placeOrder({ email, items, totals, address, payment, ... }) → order */
  const placeOrder = useCallback((data) => {
    const order = { ...data, id: newOrderId(), status: 'Placed', createdAt: new Date().toISOString() };
    setOrders((list) => [order, ...list]);
    return order;
  }, []);

  const cancelOrder = useCallback((id) => setOrders((list) => list.map((o) => (o.id === id ? { ...o, status: 'Cancelled' } : o))), []);

  const value = useMemo(
    () => ({
      orders,
      placeOrder,
      cancelOrder,
      getOrder: (id) => orders.find((o) => o.id === id),
      ordersFor: (email) => orders.filter((o) => o.email === email),
    }),
    [orders, placeOrder, cancelOrder],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used inside OrderProvider');
  return ctx;
};
