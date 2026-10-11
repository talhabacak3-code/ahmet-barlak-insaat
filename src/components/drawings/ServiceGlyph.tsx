import type { GlyphKey } from "@/content/site";

const PATHS: Record<GlyphKey, string[]> = {
  // Betonarme karkas: kolonlar, döşemeler ve üstte filiz demirleri (kaba inşaat sürüyor)
  karkas: [
    "M6 58H58",
    "M14 58V18 M32 58V18 M50 58V18",
    "M10 45H54 M10 31H54 M10 18H54",
    "M14 18V9 M20 18V11 M32 18V9 M38 18V11 M50 18V9",
  ],
  konut: [
    "M16 58V16H48V58",
    "M22 22h6v6h-6zM36 22h6v6h-6zM22 32h6v6h-6zM36 32h6v6h-6zM22 42h6v6h-6zM36 42h6v6h-6z",
    "M28 58V50h8v8",
    "M8 58H56",
  ],
  proje: [
    "M10 12H54V54H10Z",
    "M10 30H32V54 M32 38H54 M40 12V30",
    "M10 6H54 M10 3v6 M54 3v6",
    "M18 46l8-8",
  ],
  anahtar: [
    "M22 32m-14 0a14 14 0 1 0 28 0a14 14 0 1 0 -28 0",
    "M15 36V29l7-6 7 6v7z",
    "M36 32H58 M50 32v8 M56 32v6",
  ],
};

export function ServiceGlyph({ name, className = "" }: { name: GlyphKey; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" data-draw>
      {PATHS[name].map((d, i) => (
        <path key={i} d={d} className="dl" pathLength={1} fill="none" stroke="currentColor" strokeWidth="1.5" style={{ ["--delay" as string]: `${i * 0.12}s`, ["--dur" as string]: "0.9s" }} />
      ))}
    </svg>
  );
}
