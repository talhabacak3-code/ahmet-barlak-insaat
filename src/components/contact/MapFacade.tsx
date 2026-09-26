"use client";

import { useState } from "react";
import { directionsHref, site } from "@/content/site";

/** Harita yalnızca istenince yüklenir (performans + üçüncü taraf çerezleri kullanıcı onayıyla). */
export function MapFacade() {
  const [load, setLoad] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(site.address.full)}&output=embed`;

  return (
    <div className="diagram-card relative aspect-[4/3] w-full overflow-hidden bg-linen text-ink md:aspect-[16/7]">
      {load ? (
        <iframe title={`${site.name} konumu — Google Haritalar`} src={src} className="absolute inset-0 h-full w-full grayscale-[0.6]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          {/* Stilize konum paftası */}
          <svg aria-hidden="true" viewBox="0 0 800 350" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full text-fog">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M0 120 C200 110 300 150 800 130 M0 250 C240 240 420 270 800 220 M180 0 C190 120 170 240 200 350 M520 0 C500 130 540 250 510 350 M330 0 L360 350" />
              <path d="M0 60 H800 M0 300 H800 M90 0 V350 M680 0 V350" strokeDasharray="4 6" />
            </g>
          </svg>
          <div className="relative flex flex-col items-center gap-5 px-6 text-center">
            <span aria-hidden="true" className="relative block size-3.5 rounded-full bg-brand">
              <span className="absolute -inset-2.5 rounded-full border border-brand-soft" />
            </span>
            <p className="frost max-w-xs rounded-xl px-4 py-3 text-[15px] leading-[1.45] text-ink">{site.address.full}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button type="button" onClick={() => setLoad(true)} className="btn btn-dark">
                Haritayı göster
                <span aria-hidden="true" className="btn-arrow">
                  →
                </span>
              </button>
              <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="btn btn-secondary bg-card">
                Yol tarifi
                <span aria-hidden="true" className="btn-arrow">
                  ↗
                </span>
              </a>
            </div>
            <p className="max-w-xs text-[13px] leading-[1.4] text-muted">Harita Google tarafından sağlanır; gösterildiğinde Google&apos;ın çerezleri kullanılabilir.</p>
          </div>
        </div>
      )}
    </div>
  );
}
