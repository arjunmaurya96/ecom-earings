import { Helmet } from 'react-helmet-async';
import { SITE } from '@/config/site.config';

import HeroSection from './sections/HeroSection/HeroSection';
import CategoryMarquee from './sections/CategoryMarquee/CategoryMarquee';
import TrustBar from './sections/TrustBar/TrustBar';
import CategorySection from './sections/CategorySection/CategorySection';
import BestSellers from './sections/BestSellers/BestSellers';
import HamperBanner from './sections/HamperBanner/HamperBanner';
import NewArrivals from './sections/NewArrivals/NewArrivals';
import OfferBanner from './sections/OfferBanner/OfferBanner';
import ReviewsSection from './sections/ReviewsSection/ReviewsSection';
import InstagramSection from './sections/InstagramSection/InstagramSection';
import NewsletterSection from './sections/NewsletterSection/NewsletterSection';

/**
 * HOME PAGE
 * ----------------------------------------------------------
 * Sections isi order mein dikhte hain.
 * - Order badalna ho → list mein upar/neeche karo
 * - Section hatana ho → us line ko comment/delete karo
 * - Section ka design badalna ho → sections/<SectionName>/ folder
 */
const SECTIONS = [
  HeroSection,
  CategoryMarquee,
  TrustBar,
  CategorySection,
  BestSellers,
  HamperBanner,
  NewArrivals,
  OfferBanner,
  ReviewsSection,
  InstagramSection,
  NewsletterSection,
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{`${SITE.name} | Hair Accessories, Earrings & Gift Hampers`}</title>
        <meta name="description" content={SITE.description} />
        <meta property="og:title" content={`${SITE.name} – ${SITE.tagline}`} />
        <meta property="og:description" content={SITE.description} />
        <meta property="og:image" content={`${SITE.url}${SITE.logo}`} />
        <link rel="canonical" href={SITE.url} />
      </Helmet>

      {SECTIONS.map((Section, i) => (
        <Section key={i} />
      ))}
    </>
  );
}
