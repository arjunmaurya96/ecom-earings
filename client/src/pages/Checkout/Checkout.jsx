import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { HiOutlineShoppingBag, HiCheck } from 'react-icons/hi2';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { SITE } from '@/config/site.config';
import { COD_FEE } from '@/utils/cartTotals';
import { estimateDelivery } from '@/utils/delivery';
import { isEmail, isPhone, isPincode } from '@/utils/validate';
import Button from '@/components/ui/Button';
import { ContactBlock, AddressBlock, PaymentBlock } from './sections/CheckoutForm';
import CheckoutSummary from './sections/CheckoutSummary';

const STEPS = ['Cart', 'Details', 'Payment', 'Done'];

/**
 * CHECKOUT  →  /checkout
 * 1 Contact → 2 Address → 3 Payment  |  Summary + Place order
 * Step 9 mein: order backend pe save + Razorpay payment
 */
export default function Checkout() {
  const { items, totals, couponCode, giftWrap, giftMessage, clearCart } = useCart();
  const { user, saveAddress } = useAuth();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const defaultAddr = user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0];
  const [selectedId, setSelectedId] = useState(defaultAddr?.id || 'new');
  const [saveNew, setSaveNew] = useState(true);
  const [payment, setPayment] = useState('online');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: user?.email || '',
    phone: user?.phone || '',
    fullName: user?.name || '',
    addrPhone: user?.phone || '',
    line1: '',
    line2: '',
    pincode: '',
    city: '',
    state: '',
  });

  const set = (k) => (e) => {
    let v = e.target.value;
    if (['phone', 'addrPhone'].includes(k)) v = v.replace(/\D/g, '').slice(0, 10);
    if (k === 'pincode') v = v.replace(/\D/g, '').slice(0, 6);
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: '' }));
  };

  const savedAddr = user?.addresses?.find((a) => a.id === selectedId);
  const address = savedAddr || {
    fullName: form.fullName,
    addrPhone: form.addrPhone,
    line1: form.line1,
    line2: form.line2,
    pincode: form.pincode,
    city: form.city,
    state: form.state,
  };
  const delivery = useMemo(() => (isPincode(address.pincode) ? estimateDelivery(address.pincode) : null), [address.pincode]);
  const codFee = payment === 'cod' ? COD_FEE : 0;

  if (!items.length) {
    return (
      <section className="container-page grid min-h-[50vh] place-items-center pb-16 text-center">
        <Helmet><title>{`Checkout | ${SITE.name}`}</title></Helmet>
        <div>
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-blush text-primary"><HiOutlineShoppingBag size={28} /></span>
          <h1 className="mt-5 text-2xl">Your cart is empty</h1>
          <p className="mt-2 text-muted">Add something pretty before you check out.</p>
          <Button to="/shop" className="mt-6">Start shopping</Button>
        </div>
      </section>
    );
  }

  const validate = () => {
    const e = {};
    if (!isEmail(form.email)) e.email = 'Enter a valid email';
    if (!isPhone(form.phone)) e.phone = 'Enter a 10-digit mobile number';
    if (!savedAddr) {
      if (form.fullName.trim().length < 2) e.fullName = 'Enter the receiver’s name';
      if (!isPhone(form.addrPhone)) e.addrPhone = 'Enter a 10-digit mobile number';
      if (form.line1.trim().length < 5) e.line1 = 'Enter house number and street';
      if (!isPincode(form.pincode)) e.pincode = 'Enter a valid 6-digit pincode';
      if (!form.city.trim()) e.city = 'Enter your city';
      if (!form.state) e.state = 'Select your state';
    }
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      toast.error('Please fill the highlighted fields');
      const first = document.querySelector('[aria-invalid="true"]');
      first?.focus({ preventScroll: false });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700)); // demo: payment / API ka time
    if (user && !savedAddr && saveNew) saveAddress(address);
    const order = placeOrder({
      email: form.email.trim().toLowerCase(),
      phone: form.phone,
      userId: user?.id || null,
      items,
      totals: { ...totals, codFee, total: totals.total + codFee },
      couponCode,
      giftWrap,
      giftMessage,
      address,
      payment: { method: payment, status: payment === 'cod' ? 'Pay on delivery' : 'Pending (demo)' },
      delivery,
    });
    navigate(`/order-success/${order.id}`, { replace: true });
    setTimeout(clearCart, 0); // page badalne ke baad cart khaali (empty-cart flash na dikhe)
  };

  return (
    <>
      <Helmet>
        <title>{`Checkout | ${SITE.name}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="container-page pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-[2rem] md:text-[2.5rem]">Checkout</h1>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] sm:text-sm" aria-label="Checkout progress">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full text-xs font-semibold ${
                    i === 0 ? 'bg-success text-white' : i === 1 ? 'bg-primary text-white' : 'border border-line text-muted'
                  }`}
                >
                  {i === 0 ? <HiCheck size={13} /> : i + 1}
                </span>
                <span className={i === 1 ? 'font-medium text-ink' : 'text-muted'}>{s}</span>
                {i < STEPS.length - 1 && <span className="h-px w-3 bg-line sm:w-6" />}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-10">
          <form id="checkout-form" onSubmit={submit} noValidate className="min-w-0 space-y-5">
            <ContactBlock form={form} set={set} errors={errors} user={user} />
            <AddressBlock
              form={form}
              set={set}
              errors={errors}
              user={user}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              saveNew={saveNew}
              setSaveNew={setSaveNew}
              delivery={delivery}
            />
            <PaymentBlock payment={payment} setPayment={setPayment} />
          </form>
          <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start" aria-label="Order summary">
            <CheckoutSummary items={items} totals={totals} couponCode={couponCode} codFee={codFee} loading={loading} payment={payment} />
          </aside>
        </div>
      </section>
    </>
  );
}
