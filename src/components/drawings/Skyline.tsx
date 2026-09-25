import type { CSSProperties } from "react";

/**
 * Hero çizimi: Afyon Kalesi + kent silüeti + inşa hâlindeki yapı (marka rengi) + kule vinç.
 * Mobilde konteyner oranı değişir; `xMinYMax slice` sayesinde kale ve yapı kadrajda kalır.
 */

const GROUND = 320;
const d = (delay: number, dur?: number) => ({ "--delay": `${delay}s`, ...(dur ? { "--dur": `${dur}s` } : {}) }) as CSSProperties;

type B = [x: number, w: number, top: number];
const CITY: B[] = [
  [492, 64, 248], [562, 52, 222], [620, 78, 262], [896, 62, 238], [964, 88, 206], [1058, 56, 252],
  [1120, 100, 190], [1226, 60, 240], [1292, 84, 214], [1382, 50, 258], [1438, 92, 230], [1536, 64, 262],
];

function windows(x: number, w: number, top: number) {
  const cols = Math.max(2, Math.floor((w - 12) / 14));
  const gap = (w - 12) / cols;
  let p = "";
  for (let y = top + 14; y < GROUND - 16; y += 18) {
    for (let c = 0; c < cols; c++) p += `M${(x + 6 + c * gap + 3).toFixed(1)} ${y}h${(gap - 6).toFixed(1)}`;
  }
  return p;
}

function crenellation(x0: number, x1: number, base: number, top: number) {
  let p = `M${x0} ${base}V${top}`;
  for (let x = x0; x < x1; x += 8) p += `h4v-5h4v5`;
  return p + `V${base}`;
}

// Yapı hero bloğu
const HB = { x: 716, w: 112, top: 118 };
const blocks: [number, number, number][] = [
  [HB.x + HB.w - 12, HB.top - 14, 0], [HB.x + HB.w - 26, HB.top - 14, 1], [HB.x + HB.w - 12, HB.top - 28, 2],
  [HB.x + HB.w - 40, HB.top - 14, 3], [HB.x + HB.w - 26, HB.top - 28, 4], [HB.x + HB.w - 12, HB.top - 42, 5],
  [HB.x + HB.w + 4, HB.top - 22, 6], [HB.x + HB.w + 4, HB.top - 36, 7],
];

/** mode="hero": yüklenişte CSS ile çizilir. mode="scroll": görünür olunca çizilir. */
export function Skyline({ className = "", mode = "hero" }: { className?: string; mode?: "hero" | "scroll" }) {
  return (
    <svg
      viewBox="0 0 1600 360"
      preserveAspectRatio="xMinYMax slice"
      className={`scale-lines ${mode === "hero" ? "hero-draw" : ""} ${className}`}
      data-draw={mode === "scroll" ? "" : undefined}
      role="img"
      aria-label="Afyon Kalesi ve kent silüeti önünde inşa hâlindeki bir yapının teknik çizimi"
    >
      {/* uzak dağ hattı */}
      <path className="drw drw-thin df" style={d(0.3)} opacity="0.45" d="M0 214 C120 196 210 208 320 188 S520 170 640 196 S860 172 980 190 S1180 160 1320 184 S1500 178 1600 168" />

      {/* Kale kayası */}
      <g className="text-ink">
        <path
          className="drw drw-bold dl"
          pathLength={1}
          style={{ ...d(0.4, 2.2), fill: "var(--color-paper)" }}
          d="M40 320 C80 316 118 300 140 272 C160 246 170 214 186 186 C200 160 210 128 226 104 C236 88 246 76 258 70 L330 66 C344 70 352 82 360 98 C372 124 380 158 398 190 C414 220 426 256 446 284 C456 300 466 312 480 320"
        />
        <g className="drw drw-thin" opacity="0.7">
          {[
            "M162 280 C196 272 232 278 262 266",
            "M194 224 C228 214 262 222 296 208",
            "M224 152 C252 144 288 150 320 138",
            "M300 254 C336 244 372 252 408 242",
            "M252 108 C278 104 306 110 338 102",
            "M330 190 C352 184 372 190 392 184",
          ].map((p, i) => (
            <path key={i} className="dl" pathLength={1} style={d(1.2 + i * 0.1, 1.2)} d={p} />
          ))}
        </g>
        <path className="drw dl" pathLength={1} style={d(1.6, 1.4)} d={crenellation(252, 336, 68, 54)} />
        <path className="drw dl" pathLength={1} style={d(1.9, 0.8)} d="M254 54V40h16v14 M318 54V44h14v10" />
        <path className="drw drw-thin df" style={d(2.4)} d="M296 36 L318 12 H352" />
        <text className="drw-text df" style={d(2.5)} x="358" y="15">AFYON KALESİ</text>
      </g>

      {/* Kent */}
      <g className="text-ink">
        {CITY.map(([x, w, top], i) => (
          <g key={x}>
            <path className="drw dl" pathLength={1} style={{ ...d(0.9 + i * 0.07, 1.1), fill: "var(--color-paper)" }} d={`M${x} ${GROUND}V${top}H${x + w}V${GROUND}`} />
            <path className="drw drw-thin dl" pathLength={1} opacity="0.55" style={d(1.5 + i * 0.07, 1.6)} d={windows(x, w, top)} />
          </g>
        ))}
      </g>

      {/* Kule vinç */}
      <g className="text-ink">
        <path className="drw dl" pathLength={1} style={d(1.1, 1.2)} d={`M852 ${GROUND}V58 M866 ${GROUND}V58`} />
        <path
          className="drw drw-thin dl"
          pathLength={1}
          style={d(1.5, 1.6)}
          d={Array.from({ length: 13 }, (_, i) => `M852 ${GROUND - i * 20}L866 ${GROUND - i * 20 - 20}`).join("")}
        />
        <path className="drw dl" pathLength={1} style={d(1.9, 1.2)} d="M690 58H962 M690 70H962 M852 58L870 30L886 58 M870 30L720 58 M870 30L950 58" />
        <path className="drw drw-thin dl" pathLength={1} style={d(2.2, 0.9)} d="M760 70V104 M752 104h16v10h-16z" />
        <rect className="df" style={d(2.3)} x="930" y="72" width="30" height="16" fill="currentColor" opacity="0.85" />
      </g>

      {/* İnşa hâlindeki yapı — marka rengi */}
      <g className="text-brand">
        <path className="drw drw-bold dl" pathLength={1} style={{ ...d(1.3, 1.4), fill: "var(--color-paper)" }} d={`M${HB.x} ${GROUND}V${HB.top}H${HB.x + HB.w}V${GROUND}`} />
        <path
          className="drw drw-thin dl"
          pathLength={1}
          style={d(1.8, 1.4)}
          d={Array.from({ length: 7 }, (_, i) => `M${HB.x} ${GROUND - (i + 1) * 28}H${HB.x + HB.w}`).join("")}
        />
        <path className="drw drw-thin dl" pathLength={1} style={d(2.1, 1.6)} d={windows(HB.x, HB.w, HB.top)} />
        {blocks.map(([x, y, i]) => (
          <rect key={i} className="db" style={d(2.4 + i * 0.07)} x={x} y={y} width="10" height="10" fill="currentColor" />
        ))}
        {/* ölçü hattı */}
        <path className="drw drw-thin df" style={d(2.6)} d={`M700 ${GROUND}V${HB.top} M694 ${GROUND}h12 M694 ${HB.top}h12`} />
        <text className="drw-text df" style={d(2.7)} x="640" y={HB.top + 4}>+24.00</text>
      </g>

      {/* Zemin */}
      <g className="text-ink">
        <path className="drw drw-bold dl" pathLength={1} style={d(0.1, 1.4)} d={`M0 ${GROUND}H1600`} />
        <path
          className="drw drw-thin df"
          style={d(1)}
          opacity="0.5"
          d={Array.from({ length: 200 }, (_, i) => `M${i * 8} ${GROUND + 2}l-8 10`).join("")}
        />
        <text className="drw-text df" style={d(1.2)} x="6" y={GROUND - 8}>±0.00</text>
      </g>
    </svg>
  );
}
