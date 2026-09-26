"use client";

import { useState } from "react";
import { directionsHref, site } from "@/content/site";

/** Harita yalnızca istenince yüklenir (performans + üçüncü taraf çerezleri kullanıcı onayıyla). */
export function MapFacade() {
  const [load, setLoad] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(site.address.full)}&output=embed`;

  return (
    <div className="crop relative aspect-[4/3] w-full overflow-hidden border border-ink/25 bg-paper-2/60 text-ink md:aspect-[16/7]">
      {load ? (
        <iframe title={`${site.name} konumu — Google Haritalar`} src={src} className="absolute inset-0 h-full w-full grayscale-[0.6]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          {/* Stilize konum paftası */}
          <svg aria-hidden="true" viewBox="0 0 800 350" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full text-ink/25">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M0 120 C200 110 300 150 800 130 M0 250 C240 240 420 270 800 220 M180 0 C190 120 170 240 200 350 M520 0 C500 130 540 250 510 350 M330 0 L360 350" />
              <path d="M0 60 H800 M0 300 H800 M90 0 V350 M680 0 V350" strokeDasharray="4 6" />
            </g>
          </svg>
          <div className="relative flex flex-col items-center gap-5 px-6 text-center">
            <span aria-hidden="true" className="relative block h-4 w-4 bg-brand">
              <span className="absolute -inset-3 border border-brand/50" />
            </span>
            <p className="label max-w-xs text-ink">{site.address.full}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button type="button" onClick={() => setLoad(true)} className="label h-11 bg-ink px-5 text-paper transition-colors hover:bg-brand">
                Haritayı göster
              </button>
              <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="label flex h-11 items-center border border-ink/40 bg-paper px-5 transition-colors hover:border-brand hover:text-brand">
                Yol tarifi ↗
              </a>
            </div>
            <p className="max-w-xs text-xs text-muted">Harita Google tarafından sağlanır; gösterildiğinde Google&apos;ın çerezleri kullanılabilir.</p>
          </div>
        </div>
      )}
    </div>
  );
}
