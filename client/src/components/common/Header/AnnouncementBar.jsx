import { SITE } from '@/config/site.config';

/** Header ke upar chalti hui pink patti (messages: config/site.config.js) */
export default function AnnouncementBar() {
  const list = [...SITE.announcements, ...SITE.announcements];
  return (
    <div className="overflow-hidden bg-ink text-white">
      <div className="flex w-max animate-marquee py-2 hover:[animation-play-state:paused]">
        {[0, 1].map((half) => (
          <ul key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
            {list.map((msg, i) => (
              <li key={`${half}-${i}`} className="flex items-center gap-10 px-5 text-[12.5px] font-medium tracking-wide">
                <span>{msg}</span>
                <span className="text-gold">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
