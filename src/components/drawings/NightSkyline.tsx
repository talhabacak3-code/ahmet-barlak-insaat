import type { CSSProperties } from "react";
import { CASTLE, CITY, CLUSTER, FLOAT, GROUND, HB, SLOTS, crenellation, winGrid } from "@/components/drawings/Skyline";

/**
 * Kapanış çizimi — hero'daki kentin gece hâli: vinç gitmiş, yapı tamamlanmış, pencereler yanıyor.
 * Tamamen CSS ile canlanır (globals.css → .wl, .wf, .st, .flag-wave); hareket azaltılmışsa sabit ve ışıklı.
 */

// Deterministik sözde-rastgele: sunucu ve istemcide aynı sonuç
const rnd = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const v = (o: Record<string, string | number>) => Object.fromEntries(Object.entries(o).map(([k, val]) => [`--${k}`, typeof val === "number" ? `${val}s` : val])) as CSSProperties;

type Win = { x: number; y: number; w: number; lit: boolean; o: number; flick: boolean };

function cityWindows(): Win[] {
  const out: Win[] = [];
  CITY.forEach(([x, w, top], b) => {
    const { cols, gap } = winGrid(x, w);
    for (let r = 0, y = top + 11; y < GROUND - 14; r++, y += 18) {
      for (let c = 0; c < cols; c++) {
        const s = b * 97 + r * 13 + c * 5;
        out.push({ x: x + 6 + c * gap + 2, y, w: gap - 4, lit: rnd(s) < 0.4, o: 0.35 + rnd(s + 1) * 0.5, flick: rnd(s + 2) < 0.1 });
      }
    }
  });
  return out.sort((a, b) => a.x - b.x);
}

const STARS = Array.from({ length: 34 }, (_, i) => ({ x: rnd(i * 3) * 1600, y: 10 + rnd(i * 3 + 1) * 150, r: 0.8 + rnd(i * 3 + 2) * 1.1 })).filter(
  (s) => !(s.x > 220 && s.x < 400 && s.y < 90) && !(s.x > 700 && s.x < 860 && s.y > 60),
);

export function NightSkyline({ className = "" }: { className?: string }) {
  const wins = cityWindows();
  const hbWins: { x: number; y: number; w: number }[] = [];
  const { cols, gap } = winGrid(HB.x, HB.w);
  for (let y = HB.top + 11; y < GROUND - 14; y += 18) for (let c = 0; c < cols; c++) hbWins.push({ x: HB.x + 6 + c * gap + 2, y, w: gap - 4 });

  return (
    <svg viewBox="0 0 1600 360" preserveAspectRatio="xMinYMax slice" className={`scale-lines ${className}`} data-draw aria-hidden="true">
      {/* yıldızlar */}
      <g className="text-paper">
        {STARS.map((s, i) => (
          <circle key={i} className="st" cx={s.x} cy={s.y} r={s.r} fill="currentColor" opacity="0.45" style={v({ td: 2.5 + rnd(i) * 4, sd: rnd(i + 9) * 5 })} />
        ))}
      </g>

      {/* uzak dağ */}
      <path className="drw drw-thin df text-paper" opacity="0.18" d="M-60 214 C120 196 210 208 320 188 S520 170 640 196 S860 172 980 190 S1180 160 1320 184 S1500 178 1660 168" />

      {/* kale */}
      <g className="text-paper/45">
        <path className="drw drw-bold dl" pathLength={1} style={{ ...v({ delay: 0.1, dur: 1.8 }), fill: "var(--color-dusk)" }} d={CASTLE} />
        <path className="drw dl" pathLength={1} style={v({ delay: 0.9, dur: 1 })} d={crenellation(252, 336, 68, 54)} />
        <path className="drw dl" pathLength={1} style={v({ delay: 1.1, dur: 0.6 })} d="M254 54V40h16v14 M318 54V44h14v10 M262 40V12" />
        <g className="df flag-wave" style={v({ delay: 1.4 })}>
          <rect x="262" y="12" width="24" height="16" fill="#e30a17" />
          <circle cx="270.5" cy="20" r="4.4" fill="#fff" />
          <circle cx="271.6" cy="20" r="3.5" fill="#e30a17" />
          <path d="M276.6 20l3.6-1.2-2.2 3.1v-3.8l2.2 3.1z" fill="#fff" />
        </g>
      </g>

      {/* kent */}
      <g className="text-paper/30">
        {CITY.map(([x, w, top], i) => (
          <path key={x} className="drw dl" pathLength={1} style={{ ...v({ delay: 0.4 + i * 0.05, dur: 1 }), fill: "var(--color-dusk)" }} d={`M${x} ${GROUND}V${top}H${x + w}V${GROUND}`} />
        ))}
      </g>
      <g className="text-paper">
        {wins.map((w, i) =>
          w.lit ? (
            <rect
              key={i}
              className={`wl ${w.flick ? "wf" : ""}`}
              x={w.x}
              y={w.y - 3}
              width={w.w}
              height="6"
              fill="currentColor"
              style={v({ o: String(w.o), delay: 1.2 + (w.x / 1600) * 1.6, fd: 4 + rnd(i) * 6 })}
            />
          ) : (
            <rect key={i} x={w.x} y={w.y - 3} width={w.w} height="6" fill="currentColor" opacity="0.05" />
          ),
        )}
      </g>

      {/* tamamlanan yapı */}
      <g className="text-brand-soft">
        <path className="drw drw-bold dl" pathLength={1} style={{ ...v({ delay: 0.6, dur: 1.2 }), fill: "var(--color-dusk)" }} d={`M${HB.x} ${GROUND}V${HB.top}H${HB.x + HB.w}V${GROUND}`} />
        <path className="drw drw-thin dl" pathLength={1} opacity="0.35" style={v({ delay: 1, dur: 1 })} d={Array.from({ length: 7 }, (_, i) => `M${HB.x} ${GROUND - (i + 1) * 28}H${HB.x + HB.w}`).join("")} />
        {hbWins.map((w, i) => (
          <rect key={i} className="wl" x={w.x} y={w.y - 3} width={w.w} height="6" fill="currentColor" style={v({ o: "0.9", delay: 2.6 + (GROUND - w.y) * 0.004 })} />
        ))}
        {[...CLUSTER, ...SLOTS].map(([x, y], i) => (
          <rect key={`c${i}`} className="db" x={x} y={y} width="10" height="10" fill="currentColor" style={v({ delay: 3.2 + i * 0.05 })} />
        ))}
        {FLOAT.map(([x, y], i) => (
          <rect key={`f${i}`} className="db" x={x} y={y} width="8" height="8" fill="currentColor" opacity="0.6" style={v({ delay: 3.7 + i * 0.08 })} />
        ))}
        <path className="drw drw-thin df" style={v({ delay: 3.4 })} d={`M676 ${HB.top}H${HB.x - 4} M702 ${HB.top}l-4 -7h8z`} />
        <text className="drw-text df" style={v({ delay: 3.5 })} x="604" y={HB.top - 10}>
          +24.00 TESLİM
        </text>
      </g>

      {/* zemin */}
      <g className="text-paper/35">
        <path className="drw dl" pathLength={1} style={v({ delay: 0, dur: 1.4 })} d={`M0 ${GROUND}H1600`} />
        <path className="drw drw-thin df" opacity="0.4" style={v({ delay: 0.8 })} d={Array.from({ length: 200 }, (_, i) => `M${i * 8} ${GROUND + 2}l-8 10`).join("")} />
      </g>
    </svg>
  );
}
