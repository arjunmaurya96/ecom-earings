import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import {
  HiOutlineSquares2X2,
  HiOutlineShoppingBag,
  HiOutlineMapPin,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineArrowRightOnRectangle,
  HiArrowRight,
} from 'react-icons/hi2';
import { useAuth } from '@/context/AuthContext';
import { useOrders, orderStatus } from '@/context/OrderContext';
import { useWishlist } from '@/context/WishlistContext';
import { SITE } from '@/config/site.config';
import { formatPrice } from '@/utils/format';
import AccountOrders from './sections/AccountOrders';
import AccountAddresses from './sections/AccountAddresses';
import AccountProfile from './sections/AccountProfile';

const TABS = [
  { id: 'overview', label: 'Overview', icon: HiOutlineSquares2X2 },
  { id: 'orders', label: 'My orders', icon: HiOutlineShoppingBag },
  { id: 'addresses', label: 'Addresses', icon: HiOutlineMapPin },
  { id: 'profile', label: 'Profile', icon: HiOutlineUser },
];

function Overview({ user }) {
  const { ordersFor } = useOrders();
  const { count: wish } = useWishlist();
  const orders = ordersFor(user.email);
  const latest = orders[0];
  const stats = [
    ['Orders', orders.length, '/account/orders', HiOutlineShoppingBag],
    ['Wishlist', wish, '/wishlist', HiOutlineHeart],
    ['Addresses', user.addresses?.length || 0, '/account/addresses', HiOutlineMapPin],
  ];
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map(([label, n, to, Icon]) => (
          <Link key={label} to={to} className="group rounded-2xl border border-line bg-white p-5 transition-colors hover:border-primary/40">
            <Icon className="text-primary" size={22} />
            <p className="mt-3 text-3xl font-semibold text-ink">{n}</p>
            <p className="flex items-center gap-1 text-sm text-muted group-hover:text-primary">
              {label} <HiArrowRight className="transition-transform group-hover:translate-x-0.5" size={13} />
            </p>
          </Link>
        ))}
      </div>
      {latest ? (
        <div className="rounded-2xl bg-cream p-5">
          <p className="text-xs uppercase tracking-wider text-muted">Latest order</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-ink">#{latest.id}</p>
              <p className="text-sm text-muted">{formatPrice(latest.totals.total)} · {orderStatus(latest)}</p>
            </div>
            <Link to="/account/orders" className="text-sm font-semibold text-primary hover:underline">Track order</Link>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-cream p-5 text-sm text-ink-soft">
          You have not placed any orders yet. <Link to="/shop" className="font-semibold text-primary hover:underline">Start shopping</Link>
        </div>
      )}
    </div>
  );
}

/**
 * MY ACCOUNT  →  /account, /account/orders, /account/addresses, /account/profile
 * (RequireAuth: login zaroori)
 */
export default function Account() {
  const { tab = 'overview' } = useParams();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const current = TABS.find((t) => t.id === tab) || TABS[0];
  const since = new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  const doLogout = () => {
    // Pehle Home pe jao, phir logout (warna protected page login pe bhej deta)
    navigate('/', { replace: true });
    setTimeout(() => {
      logout();
      toast('Logged out. See you soon!', { icon: '👋' });
    }, 0);
  };

  return (
    <section className="container-page pb-16">
      <Helmet>
        <title>{`${current.label} | ${SITE.name}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="flex flex-wrap items-center gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-xl font-semibold text-white">{user.name.charAt(0).toUpperCase()}</span>
        <div>
          <h1 className="text-[1.75rem] leading-tight md:text-[2.25rem]">Hi, {user.name.split(' ')[0]}</h1>
          <p className="text-sm text-muted">{user.email} · Member since {since}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="Account" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:block lg:space-y-1 lg:px-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <NavLink
              key={id}
              to={id === 'overview' ? '/account' : `/account/${id}`}
              end
              className={() =>
                `flex shrink-0 items-center gap-3 rounded-pill px-4 py-2.5 text-[15px] font-medium transition-colors lg:rounded-xl ${
                  current.id === id ? 'bg-ink text-white' : 'border border-line text-ink-soft hover:bg-blush hover:text-ink lg:border-0'
                }`
              }
            >
              <Icon size={19} /> {label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={doLogout}
            className="flex shrink-0 items-center gap-3 rounded-pill border border-line px-4 py-2.5 text-[15px] font-medium text-ink-soft hover:text-primary lg:w-full lg:rounded-xl lg:border-0"
          >
            <HiOutlineArrowRightOnRectangle size={19} /> Log out
          </button>
        </nav>

        <div className="min-w-0">
          <h2 className="mb-5 text-xl lg:hidden">{current.label}</h2>
          {current.id === 'overview' && <Overview user={user} />}
          {current.id === 'orders' && <AccountOrders user={user} />}
          {current.id === 'addresses' && <AccountAddresses user={user} />}
          {current.id === 'profile' && <AccountProfile user={user} />}
        </div>
      </div>
    </section>
  );
}
