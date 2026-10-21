import { FaWhatsapp } from 'react-icons/fa6';
import { whatsappLink } from '@/utils/whatsapp';
import { SITE } from '@/config/site.config';

/** Har page pe neeche right corner mein WhatsApp button */
export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(`Hi ${SITE.name}! I have a question.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-pill bg-whatsapp p-3.5 text-white shadow-lift transition-all duration-300 hover:pr-5 md:bottom-7 md:right-7"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-pill bg-whatsapp/40 [animation-duration:2.5s]" />
      <FaWhatsapp size={26} />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-40 md:inline">
        Order on WhatsApp
      </span>
    </a>
  );
}
