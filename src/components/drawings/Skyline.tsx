import type { CSSProperties } from "react";

/**
 * Hero çizimi: Afyon Kalesi + kent silüeti + inşa hâlindeki yapı (marka rengi) + kule vinç.
 * Mobilde konteyner oranı değişir; `xMinYMax slice` sayesinde kale ve yapı kadrajda kalır.
 * `data-*` öznitelikli öğeler LivingSkyline tarafından canlandırılır (vinç, bayrak, bulut, pencere).
 */

export const GROUND = 320;
const d = (delay: number, dur?: number) => ({ "--delay": `${delay}s`, ...(dur ? { "--dur": `${dur}s` } : {}) }) as CSSProperties;

type B = [x: number, w: number, top: number];
const CITY: B[] = [
  [492, 64, 248], [562, 52, 222], [620, 60, 262], [896, 62, 238], [964, 88, 206], [1058, 56, 252],
  [1120, 100, 190], [1226, 60, 240], [1292, 84, 214], [1382, 50, 258], [1438, 92, 230], [1536, 64, 262],
];

const winGrid = (x: number, w: number) => {
  const cols = Math.max(2, Math.floor((w - 12) / 14));
  return { cols, gap: (w - 12) / cols };
};

function windows(x: number, w: number, top: number) {
  const { cols, gap } = winGrid(x, w);
  let p = "";
  for (let y = top + 14; y < GROUND - 16; y += 18) {
    for (let c = 0; c < cols; c++) p += `M${(x + 6 + c * gap + 3).toFixed(1)} ${y}h${(gap - 6).toFixed(1)}`;
  }
  return p;
}

/** Işığı yanıp sönecek pencereler: [bina indeksi, kat, sütun] */
const LIT: [number, number, number][] = [
  [1, 2, 1], [4, 1, 3], [4, 4, 0], [6, 2, 2], [6, 5, 5], [8, 3, 1], [10, 1, 4], [7, 2, 0], [0, 1, 0], [11, 1, 2],
];

function crenellation(x0: number, x1: number, base: number, top: number) {
  let p = `M${x0} ${base}V${top}`;
  for (let x = x0; x < x1; x += 8) p += `h4v-5h4v5`;
  return p + `V${base}`;
}

// İnşa hâlindeki yapı
const HB = { x: 716, w: 112, top: 118 };
/** Çatıdaki sabit piksel kümesi (logodaki yapı taşları) */
const CLUSTER = [[818, 108], [806, 108], [794, 108], [818, 96], [806, 96]];
/** Logodaki gibi dağılmış pikseller */
const FLOAT = [[834, 98], [834, 84]];
/** Vincin sırayla doldurduğu boş yuvalar */
export const SLOTS = [[782, 108], [794, 96], [806, 84], [818, 84]];
/** Yerdeki paletten alınan blok */
export const PICKUP = [693, 296];
export const CRANE = { jibY: 74, restX: 760, restHook: 96 };

/** [x, y, ölçek] */
export const CLOUDS = [
  [180, 70, 1.1],
  [1180, 46, 0.8],
  [560, 128, 0.65],
];
const cloud = "M0 22a9 9 0 0 1 9-9a13 13 0 0 1 24-5a10 10 0 0 1 17 7a8 8 0 0 1 1 16H3a7 7 0 0 1-3-9z";

/** mode="hero": yüklenişte CSS ile çizilir. mode="scroll": görünür olunca çizilir. */
export function Skyline({ className = "", mode = "hero" }: { className?: string; mode?: "hero" | "scroll" }) {
  return (
    <svg
      viewBox="0 0 1600 360"
      preserveAspectRatio="xMinYMax slice"
      className={`scale-lines ${mode === "hero" ? "hero-draw" : ""} ${className}`}
      data-draw={mode === "scroll" ? "" : undefined}
      role="img"
      aria-label="Afyon Kalesi ve kent silüeti önünde, vinçle inşa edilen bir yapının teknik çizimi"
    >
      {/* uzak dağ hattı */}
      <g data-layer="far">
        <path className="drw drw-thin df" style={d(0.3)} opacity="0.45" d="M-60 214 C120 196 210 208 320 188 S520 170 640 196 S860 172 980 190 S1180 160 1320 184 S1500 178 1660 168" />
      </g>

      {/* bulutlar */}
      <g className="text-ink" opacity="0.5">
        {CLOUDS.map(([x, y, s], i) => (
          <g key={i} data-cloud={i} transform={`translate(${x} ${y})`}>
            <path className="drw drw-thin df" style={{ ...d(2.6 + i * 0.2), fill: "var(--color-paper)" }} transform={`scale(${s})`} d={cloud} />
          </g>
        ))}
      </g>

      {/* Kale kayası */}
      <g className="text-ink" data-layer="castle">
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
        {/* bayrak direği + Türk bayrağı */}
        <path className="drw drw-thin dl" pathLength={1} style={d(2.2, 0.5)} d="M262 40V12" />
        <g className="df" style={d(2.5)} data-flag>
          <rect x="262" y="12" width="24" height="16" fill="#e30a17" />
          <circle cx="270.5" cy="20" r="4.4" fill="#fff" />
          <circle cx="271.6" cy="20" r="3.5" fill="#e30a17" />
          <path d="M276.6 20l3.6-1.2-2.2 3.1v-3.8l2.2 3.1z" fill="#fff" />
        </g>
        <path className="drw drw-thin df" style={d(2.4)} d="M300 40 L318 18 H352" />
        <text className="drw-text df" style={d(2.5)} x="358" y="21">AFYON KALESİ</text>
      </g>

      {/* Kent */}
      <g className="text-ink">
        {CITY.map(([x, w, top], i) => (
          <g key={x}>
            <path className="drw dl" pathLength={1} style={{ ...d(0.9 + i * 0.07, 1.1), fill: "var(--color-paper)" }} d={`M${x} ${GROUND}V${top}H${x + w}V${GROUND}`} />
            <path className="drw drw-thin dl" pathLength={1} opacity="0.55" style={d(1.5 + i * 0.07, 1.6)} d={windows(x, w, top)} />
          </g>
        ))}
        {LIT.map(([b, row, col], i) => {
          const [x, w, top] = CITY[b];
          const { cols, gap } = winGrid(x, w);
          const y = top + 14 + row * 18;
          if (col >= cols || y >= GROUND - 16) return null;
          return <rect key={i} data-lit x={x + 6 + col * gap + 2} y={y - 4} width={gap - 4} height="8" className="text-brand" fill="currentColor" opacity="0" />;
        })}
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
        <rect className="df" style={d(2.3)} x="930" y="72" width="30" height="16" fill="currentColor" opacity="0.85" />

        {/* araba + halat + kanca (+ taşınan blok) */}
        <g className="df" style={d(2.4)} data-trolley transform={`translate(${CRANE.restX} 0)`}>
          <rect x="-7" y="70" width="14" height="4" fill="currentColor" />
          <line data-cable className="drw drw-thin" x1="0" y1={CRANE.jibY} x2="0" y2={CRANE.restHook} />
          <g data-hook transform={`translate(0 ${CRANE.restHook})`}>
            <path className="drw" d="M-6 0h12v6h-12z" style={{ fill: "var(--color-paper)" }} />
            <rect data-load x="-5" y="6" width="10" height="10" className="text-brand" fill="currentColor" opacity="0" />
          </g>
        </g>
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
        {CLUSTER.map(([x, y], i) => (
          <rect key={`c${i}`} className="db" style={d(2.4 + i * 0.07)} x={x} y={y} width="10" height="10" fill="currentColor" />
        ))}
        {FLOAT.map(([x, y], i) => (
          // CSS animasyonlu (.db) öğeyi GSAP ile taşıyabilmek için <g> ile sarılı
          <g key={`f${i}`} data-float>
            <rect className="db" style={d(2.8 + i * 0.07)} x={x} y={y} width="8" height="8" fill="currentColor" />
          </g>
        ))}
        {SLOTS.map(([x, y], i) => (
          <rect key={`s${i}`} data-slot={i} x={x} y={y} width="10" height="10" fill="currentColor" opacity="0" />
        ))}

        {/* palet + malzeme */}
        <path className="drw drw-thin dl" pathLength={1} style={d(2.2, 0.4)} d="M684 318H712" />
        <rect className="db" style={d(2.5)} x="687" y="308" width="10" height="10" fill="currentColor" />
        <rect className="db" style={d(2.56)} x="699" y="308" width="10" height="10" fill="currentColor" />
        <g data-pickup>
          <rect className="db" style={d(2.62)} x={PICKUP[0]} y={PICKUP[1]} width="10" height="10" fill="currentColor" />
        </g>

        {/* kot işareti */}
        <path className="drw drw-thin df" style={d(2.6)} d={`M676 ${HB.top}H${HB.x - 4} M702 ${HB.top}l-4 -7h8z`} />
        <text className="drw-text df" style={d(2.7)} x="648" y={HB.top - 10}>+24.00</text>
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
