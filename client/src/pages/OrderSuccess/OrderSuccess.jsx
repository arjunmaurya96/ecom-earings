import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiCheck, HiOutlineClipboardDocument, HiOutlineTruck, HiOutlineMapPin, HiOutlineCreditCard } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';
import { useOrders } from '@/context/OrderContext';
import { useAuth } from '@/context/AuthContext';
import { SITE } from '@/config/site.config';
import { formatPrice } from '@/utils/format';
import { resizeUrl } from '@/utils/image';
import { whatsappLink } from '@/utils/whatsapp';
import Button from '@/components/ui/Button';

const CONFETTI = Array.from({ length: 16 }, (_, i) => ({
  x: Math.cos((i / 16) * Math.PI * 2) * (90 + (i % 3) * 25),
  y: Math.sin((i / 16) * Math.PI * 2) * (90 + (i % 3) * 25),
  c: ['#D6246E', '#C9A24A', '#F4A7BB', '#1F8A5B'][i % 4],
}));

/** /order-success/:id – order ho gaya */
export default function OrderSuccess() {
  const { id } = useParams();
  const { getOrder } = useOrders();
  const { user } = useAuth();
  const order = getOrder(id);

  if (!order) {
    return (
      <section className="container-page grid min-h-[50vh] place-items-center pb-16 text-center">
        <div>
          <h1 className="text-2xl">We could not find this order</h1>
          <p className="mt-2 text-muted">Check the order number in your email, or look in My Account.</p>
          <Button to="/account/orders" className="mt-6">My orders</Button>
        </div>
      </section>
    );
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(order.id);
      toast.success('Order number copied');
    } catch {
      /* text is selectable */
    }
  };
  const a = order.address;

  return (
    <section className="container-page pb-16">
      <Helmet>
        <title>{`Order placed | ${SITE.name}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="mx-auto max-w-3xl">
        {/* Success badge */}
        <div className="flex flex-col items-center text-center">
          <div className="relative grid h-28 w-28 place-items-center">
            {CONFETTI.map((p, i) => (
              <motion.span
                key={i}
                className="absolute h-2.5 w-2.5 rounded-full"
                style={{ background: p.c }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{ x: p.x, y: p.y, opacity: [0, 1, 0], scale: [0, 1, 0.6] }}
                transition={{ duration: 1.2, delay: 0.25, ease: 'easeOut' }}
              />
            ))}
            <motion.span
              className="grid h-24 w-24 place-items-center rounded-full bg-success text-white shadow-lift"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            >
              <HiCheck size={48} />
            </motion.span>
          </div>
          <h1 className="mt-6 text-[2rem] md:text-[2.5rem]">Thank you for your order!</h1>
          <p className="mt-2 max-w-md text-muted">
            We have sent the details to <span className="font-medium text-ink">{order.email}</span>. We will pack it with love and ship it soon.
          </p>
          <button type="button" onClick={copy} className="mt-5 inline-flex items-center gap-2 rounded-pill border border-dashed border-gold bg-cream px-5 py-2.5 text-sm">
            Order number <span className="select-all font-semibold tracking-wider text-ink">{order.id}</span>
            <HiOutlineClipboardDocument className="text-muted" />
          </button>
        </div>

        {/* Info cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            [HiOutlineTruck, 'Estimated delivery', order.delivery?.label || '3–7 working days'],
            [HiOutlineMapPin, 'Delivering to', `${a.fullName}, ${a.city} – ${a.pincode}`],
            [HiOutlineCreditCard, 'Payment', order.payment.method === 'cod' ? 'Cash on Delivery' : `Online · ${order.payment.status}`],
          ].map(([Icon, t, v]) => (
            <div key={t} className="rounded-2xl border border-line bg-white p-4">
              <Icon className="text-primary" size={22} />
              <p className="mt-2 text-xs uppercase tracking-wider text-muted">{t}</p>
              <p className="mt-1 text-sm font-medium text-ink">{v}</p>
            </div>
          ))}
        </div>

        {/* Items */}
        <div className="mt-6 rounded-3xl bg-cream p-5 sm:p-6">
          <h2 className="text-lg">Order summary</h2>
          <ul className="mt-4 divide-y divide-ink/10">
            {order.items.map((i) => (
              <li key={i.key} className="flex items-center gap-3 py-3">
                <img src={resizeUrl(i.image, 120, 150)} alt="" className="h-16 w-13 shrink-0 rounded-xl object-cover" />
                <span className="min-w-0 flex-1 text-sm">
                  <span className="line-clamp-1 font-medium text-ink">{i.name}</span>
                  <span className="text-xs text-muted">
                    Qty {i.qty}
                    {[i.color, i.size && `Size ${i.size}`].filter(Boolean).map((x) => ` · ${x}`)}
                  </span>
                </span>
                <span className="text-sm font-medium tabular-nums text-ink">{formatPrice(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-dashed border-ink/15 pt-4">
            <span className="font-semibold text-ink">Total paid{order.payment.method === 'cod' ? ' on delivery' : ''}</span>
            <span className="text-xl font-semibold text-ink">{formatPrice(order.totals.total)}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/shop">Continue shopping</Button>
          {user && <Button to="/account/orders" variant="outline">View my orders</Button>}
          <Button href={whatsappLink(`Hi ${SITE.name}! I just placed order ${order.id}.`)} variant="outline">
            <FaWhatsapp className="text-whatsapp" size={18} /> Questions? WhatsApp us
          </Button>
        </div>
      </div>
    </section>
  );
}
