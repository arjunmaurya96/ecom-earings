import { FaInstagram } from 'react-icons/fa6';
import { INSTAGRAM_POSTS } from '@/data/home/homeContent';
import { SITE } from '@/config/site.config';
import { srcSetFor } from '@/utils/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';

/** Instagram gallery – 6 photos */
export default function InstagramSection() {
  return (
    <section className="container-page section-space" aria-labelledby="insta-heading">
      <SectionHeading
        align="center"
        eyebrow={SITE.instagramHandle}
        title={<span id="insta-heading">Follow us on Instagram</span>}
        subtitle="Styling ideas, new drops and behind-the-scenes hamper packing."
      />
      <div className="grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-4">
        {INSTAGRAM_POSTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05}>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl"
              aria-label={`Instagram post: ${p.alt}`}
            >
              <img src={p.image} srcSet={srcSetFor(p.image, [250, 500], 1)} sizes="(min-width: 768px) 16vw, 33vw" alt={p.alt} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute inset-0 grid place-items-center bg-primary/0 text-white opacity-0 transition-all duration-300 group-hover:bg-primary/45 group-hover:opacity-100">
                <FaInstagram size={28} />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button href={SITE.social.instagram} variant="outline">
          <FaInstagram size={18} /> Follow {SITE.instagramHandle}
        </Button>
      </div>
    </section>
  );
}
