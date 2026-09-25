import type { GlyphKey } from "@/content/site";

const PATHS: Record<GlyphKey, string[]> = {
  konut: [
    "M16 58V16H48V58",
    "M22 22h6v6h-6zM36 22h6v6h-6zM22 32h6v6h-6zM36 32h6v6h-6zM22 42h6v6h-6zM36 42h6v6h-6z",
    "M28 58V50h8v8",
    "M8 58H56",
  ],
  ticari: [
    "M10 58V24H54V58",
    "M8 24L14 14H50L56 24",
    "M10 24q5.5 6 11 0q5.5 6 11 0q5.5 6 11 0q5.5 6 11 0",
    "M16 34h16v16h-16zM38 58V34h10v24",
    "M6 58H58",
  ],
  proje: [
    "M10 12H54V54H10Z",
    "M10 30H32V54 M32 38H54 M40 12V30",
    "M10 6H54 M10 3v6 M54 3v6",
    "M18 46l8-8",
  ],
  donusum: [
    "M8 58V30H24V58",
    "M40 58V14H56V58",
    "M44 20h8M44 28h8M44 36h8M44 44h8",
    "M26 26q8-10 12 -4 M34 18l4 4-4 4",
    "M4 58H60",
  ],
  tadilat: [
    "M8 20H44 M8 30H44 M8 40H44 M8 50H44",
    "M20 20v10 M32 20v10 M14 30v10 M26 30v10 M38 30v10 M20 40v10 M32 40v10",
    "M8 20V58H44V20",
    "M46 42l10-10 4 4-10 10z M50 38l-6 12",
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
