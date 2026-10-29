const announcementText =
  "Titasweb™ · AUTUMN '26 · LIVE NOW · Titas CLOTHING · LIMITED EDITION · FREE SHIPPING ON ORDERS OVER 3K";

export default function AnnouncementBar() {
  return (
    <div
      className="overflow-hidden bg-primary text-white relative z-50"
      role="region"
      aria-label="Store announcements"
    >
      <div className="flex w-max animate-marquee-slow">
        {[...Array(6)].map((_, index) => (
          <span
            key={index}
            aria-hidden={index !== 0}
            className="uppercase px-8 py-1.5 text-[12px] font-medium font-sans tracking-widest"
          >
            {announcementText}
          </span>
        ))}
      </div>
    </div>
  );
}
