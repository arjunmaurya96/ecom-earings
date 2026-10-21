import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiChevronDown, HiCheck, HiOutlineShoppingBag } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';
import { useOrders, orderStatus, ORDER_STEPS } from '@/context/OrderContext';
import { SITE } from '@/config/site.config';
import { formatPrice } from '@/utils/format';
import { resizeUrl } from '@/utils/image';
import { whatsappLink } from '@/utils/whatsapp';
import Button from '@/components/ui/Button';

const STATUS_STYLE = {
  Placed: 'bg-gold-light text-gold-dark',
  Packed: 'bg-blush text-primary-dark',
  Shipped: 'bg-primary/10 text-primary',
  Delivered: 'bg-success/10 text-success',
  Cancelled: 'bg-ink/10 text-muted',
};

/** Placed → Packed → Shipped → Delivered */
export function StatusTimeline({ status }) {
  if (status === 'Cancelled') return <p className="text-sm font-medium text-muted">This order was cancelled.</p>;
  const current = ORDER_STEPS.indexOf(status);
  return (
    <ol className="grid grid-cols-4" aria-label={`Order status: ${status}`}>
      {ORDER_STEPS.map((s, i) => {
        const done = i <= current;
        return (
          <li key={s} className="relative flex flex-col items-center text-center">
            {i > 0 && <span className={`absolute right-1/2 top-3.5 h-0.5 w-full ${i <= current ? 'bg-success' : 'bg-line'}`} />}
            <span className={`relative grid h-7 w-7 place-items-center rounded-full text-xs ${done ? 'bg-success text-white' : 'border-2 border-line bg-white text-muted'}`}>
              {done ? <HiCheck size={14} /> : i + 1}
            </span>
            <span className={`mt-2 text-xs ${i === current ? 'font-semibold text-ink' : 'text-muted'}`}>{s}</span>
          </li>
        );
      })}
    </ol>
  );
}

function OrderCard({ order, open, onToggle, onCancel }) {
  const status = orderStatus(order);
  const [confirm, setConfirm] = useState(false);
  const date = new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const count = order.items.reduce((n, i) => n + i.qty, 0);
  const a = order.address;

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-white">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full flex-wrap items-center gap-4 p-4 text-left sm:p-5">
        <div className="flex -space-x-3">
          {order.items.slice(0, 3).map((i) => (
            <img key={i.key} src={resizeUrl(i.image, 96, 96)} alt="" className="h-12 w-12 rounded-xl object-cover ring-2 ring-white" />
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-ink">#{order.id}</p>
          <p className="text-sm text-muted">{date} · {count} {count === 1 ? 'item' : 'items'} · {formatPrice(order.totals.total)}</p>
        </div>
        <span className={`rounded-pill px-3 py-1 text-xs font-semibold ${STATUS_STYLE[status]}`}>{status}</span>
        <HiChevronDown className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="space-y-6 border-t border-line p-4 sm:p-5">
              <StatusTimeline status={status} />
              {order.delivery && status !== 'Delivered' && status !== 'Cancelled' && (
                <p className="text-center text-sm text-ink-soft">Expected by <span className="font-semibold text-ink">{order.delivery.label}</span></p>
              )}
              <ul className="divide-y divide-line">
                {order.items.map((i) => (
                  <li key={i.key} className="flex items-center gap-3 py-2.5 text-sm">
                    <img src={resizeUrl(i.image, 96, 120)} alt="" className="h-14 w-11 shrink-0 rounded-lg object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-1 font-medium text-ink">{i.name}</span>
                      <span className="text-xs text-muted">Qty {i.qty}{[i.color, i.size && `Size ${i.size}`].filter(Boolean).map((x) => ` · ${x}`)}</span>
                    </span>
                    <span className="tabular-nums text-ink">{formatPrice(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="grid gap-4 text-sm sm:grid-cols-2">
                <div className="rounded-xl bg-cream p-4">
                  <p className="text-xs uppercase tracking-wider text-muted">Delivery address</p>
                  <p className="mt-1.5 font-medium text-ink">{a.fullName} · {a.addrPhone}</p>
                  <p className="text-ink-soft">{a.line1}{a.line2 ? `, ${a.line2}` : ''}, {a.city}, {a.state} – {a.pincode}</p>
                </div>
                <div className="rounded-xl bg-cream p-4">
                  <p className="text-xs uppercase tracking-wider text-muted">Payment</p>
                  <p className="mt-1.5 font-medium text-ink">{order.payment.method === 'cod' ? 'Cash on Delivery' : 'Online'}</p>
                  <p className="text-ink-soft">Total {formatPrice(order.totals.total)}{order.couponCode ? ` · Coupon ${order.couponCode}` : ''}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button href={whatsappLink(`Hi ${SITE.name}! I need help with order ${order.id}.`)} variant="outline" size="sm">
                  <FaWhatsapp className="text-whatsapp" /> Need help?
                </Button>
                {status === 'Placed' &&
                  (confirm ? (
                    <span className="flex items-center gap-3 text-sm">
                      <span className="text-ink-soft">Cancel this order?</span>
                      <button type="button" onClick={() => onCancel(order.id)} className="font-semibold text-primary hover:underline">Yes, cancel</button>
                      <button type="button" onClick={() => setConfirm(false)} className="text-muted">No</button>
                    </span>
                  ) : (
                    <button type="button" onClick={() => setConfirm(true)} className="text-sm text-muted hover:text-primary">Cancel order</button>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

/** My orders list */
export default function AccountOrders({ user }) {
  const { ordersFor, cancelOrder } = useOrders();
  const orders = ordersFor(user.email);
  const [openId, setOpenId] = useState(orders[0]?.id || null);

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-cream px-6 py-14 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-primary shadow-card"><HiOutlineShoppingBag size={28} /></span>
        <h2 className="mt-5 text-xl">No orders yet</h2>
        <p className="mt-2 text-sm text-muted">When you place an order, you can track it here.</p>
        <Button to="/shop" className="mt-6">Start shopping</Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <OrderCard key={o.id} order={o} open={openId === o.id} onToggle={() => setOpenId(openId === o.id ? null : o.id)} onCancel={cancelOrder} />
      ))}
    </div>
  );
}
