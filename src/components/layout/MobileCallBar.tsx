"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site, whatsappHref } from "@/content/site";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";

/** Mobilde başparmak bölgesinde kalıcı arama çubuğu. İletişim bloğu görünürken gizlenir. */
export function MobileCallBar() {
  const [hide, setHide] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll("[data-hide-callbar]");
    if (!targets.length) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setHide(visible.size > 0);
      },
      { threshold: 0.15 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  const wa = whatsappHref("Merhaba, bir proje hakkında bilgi almak istiyorum.");

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid border-t border-ink/20 bg-paper pb-[env(safe-area-inset-bottom)] transition-transform duration-500 md:hidden ${
        wa ? "grid-cols-2" : "grid-cols-1"
      } ${hide ? "translate-y-full" : "translate-y-0"}`}
      aria-hidden={hide || undefined}
    >
      <a href={site.phone.href} tabIndex={hide ? -1 : undefined} className="flex h-14 items-center justify-center gap-2 bg-brand font-medium text-paper">
        <PhoneIcon /> Hemen ara
      </a>
      {wa && (
        <a href={wa} target="_blank" rel="noopener noreferrer" tabIndex={hide ? -1 : undefined} className="flex h-14 items-center justify-center gap-2 font-medium text-ink">
          <WhatsAppIcon className="size-5 text-[#25D366]" /> WhatsApp
        </a>
      )}
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2" />
    </svg>
  );
}
