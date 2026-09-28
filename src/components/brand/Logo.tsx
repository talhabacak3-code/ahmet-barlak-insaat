import { site } from "@/content/site";

/**
 * "ab" sonsuzluk monogramı — orijinal logodan (public/brand/logo-orijinal.jpg) vektörel yeniden çizim.
 * Firmadan orijinal vektör dosya (AI/SVG/PDF) alındığında bu bileşen onunla değiştirilmelidir.
 */
export function LogoMark({ className = "", title }: { className?: string; title?: string }) {
  const px: [number, number, "b" | "g"][] = [
    [74, 3, "b"], [79, 3, "g"], [84, 3, "b"],
    [76.5, 7.5, "g"], [81.5, 7.5, "b"],
    [79, 12, "b"], [84, 12, "g"],
  ];
  return (
    <svg viewBox="0 0 92 50" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <g fill="none" stroke="currentColor" strokeWidth="5.2" strokeLinecap="butt" strokeLinejoin="round">
        {/* tek hat: a halkası → çapraz geçiş → b halkası ve sapı */}
        <path d="M35.4 41 L31.8 37.2 A14 14 0 1 1 31.8 17.4 L50.6 34.2 A14 14 0 1 0 50.6 14.4 L50.6 6" />
      </g>
      {/* ok uçları */}
      <path d="M44.6 8.6 L50.6 0.8 L56.6 8.6 Z" fill="currentColor" />
      <path d="M31.2 44.6 L40.8 45.2 L37.8 36.6 Z" fill="currentColor" />
      {px.map(([x, y, c], i) => (
        <rect key={i} x={x} y={y} width="3.4" height="3.4" fill={c === "b" ? "currentColor" : "#9b9590"} />
      ))}
    </svg>
  );
}

export function Logo({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  const ink = tone === "dark" ? "text-ink" : "text-paper";
  const accent = tone === "dark" ? "text-brand" : "text-brand-soft";
  return (
    <span className="flex items-center gap-3">
      <LogoMark className={`h-8 w-auto shrink-0 ${accent}`} />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={`font-wordmark text-[1.18rem] font-extrabold italic tracking-[-0.01em] wdth-125 ${ink}`}>{site.wordmark}</span>
          <span className={`mt-[3px] font-wordmark text-[0.64rem] font-semibold italic tracking-[0.02em] wdth-112 ${accent}`}>{site.tagline}</span>
        </span>
      )}
    </span>
  );
}
