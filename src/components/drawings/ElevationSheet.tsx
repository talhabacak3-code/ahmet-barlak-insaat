import type { Drawing } from "@/content/site";

/** Proje kartları için parametrik cephe (görünüş) çizimi. Gerçek görsel yokken pafta gibi durur. */
export function ElevationSheet({ drawing, label, className = "" }: { drawing: Drawing; label?: string; className?: string }) {
  const { floors, bays, roof, shopfront, scaffold } = drawing;
  const GROUND = 250;
  const bayW = Math.min(58, 280 / bays);
  const fh = Math.min(36, 170 / floors);
  const W = bays * bayW;
  const H = floors * fh;
  const x0 = 200 - W / 2;
  const top = GROUND - H;

  let windows = "";
  for (let f = 0; f < floors; f++) {
    for (let b = 0; b < bays; b++) {
      const wx = x0 + b * bayW;
      const fy = GROUND - (f + 1) * fh;
      if (f === 0 && shopfront) continue;
      if (f === 0 && b === Math.floor(bays / 2)) {
        windows += `M${wx + bayW * 0.3} ${GROUND}V${fy + fh * 0.2}H${wx + bayW * 0.7}V${GROUND}`;
      } else {
        windows += `M${wx + bayW * 0.22} ${fy + fh * 0.28}h${bayW * 0.56}v${fh * 0.48}h${-bayW * 0.56}z`;
      }
    }
  }
  const floorLines = Array.from({ length: floors - 1 }, (_, i) => `M${x0} ${GROUND - (i + 1) * fh}H${x0 + W}`).join("");

  const roofPath =
    roof === "pitched"
      ? `M${x0 - 10} ${top}L200 ${top - 44}L${x0 + W + 10} ${top}Z`
      : roof === "sawtooth"
        ? Array.from({ length: bays }, (_, i) => `M${x0 + i * bayW} ${top}L${x0 + i * bayW} ${top - 22}L${x0 + (i + 1) * bayW} ${top}`).join("")
        : `M${x0 - 4} ${top}V${top - 8}H${x0 + W + 4}V${top}`;

  const shop = shopfront
    ? `M${x0 + 6} ${GROUND}V${GROUND - fh + 6}H${x0 + W - 6}V${GROUND}` +
      Array.from({ length: bays - 1 }, (_, i) => `M${x0 + (i + 1) * bayW} ${GROUND}V${GROUND - fh + 6}`).join("")
    : "";

  const scaf = scaffold
    ? Array.from({ length: floors + 1 }, (_, i) => `M${x0 - 14} ${GROUND - i * fh}H${x0 + W * 0.6}`).join("") +
      Array.from({ length: 4 }, (_, i) => `M${x0 - 14 + i * ((W * 0.6 + 14) / 3)} ${GROUND}V${top - 6}`).join("")
    : "";

  return (
    <svg viewBox="0 0 400 300" className={className} data-draw aria-hidden="true">
      <g className="text-ink">
        <path className="drw drw-thin df" opacity="0.35" d="M20 20H380V280H20Z" />
        <path className="drw drw-bold dl" pathLength={1} style={{ ["--dur" as string]: "1.2s" }} d={`M${x0} ${GROUND}V${top}H${x0 + W}V${GROUND}`} />
        <path className="drw dl" pathLength={1} style={{ ["--delay" as string]: "0.3s" }} d={roofPath} />
        <path className="drw drw-thin dl" pathLength={1} style={{ ["--delay" as string]: "0.4s" }} d={floorLines} />
        <path className="drw drw-thin dl" pathLength={1} style={{ ["--delay" as string]: "0.6s", ["--dur" as string]: "1.8s" }} d={windows + shop} />
        {scaffold && <path className="drw drw-thin dl text-brand" stroke="currentColor" pathLength={1} style={{ ["--delay" as string]: "0.9s" }} d={scaf} />}
        <path className="drw drw-bold dl" pathLength={1} d={`M34 ${GROUND}H366`} />
        <path className="drw drw-thin df" opacity="0.45" d={Array.from({ length: 42 }, (_, i) => `M${34 + i * 8} ${GROUND + 2}l-8 9`).join("")} />
        <path className="drw drw-thin df" d={`M${x0 + W + 22} ${GROUND}V${top}M${x0 + W + 16} ${GROUND}h12M${x0 + W + 16} ${top}h12`} />
        <text className="drw-text df" x={x0 + W + 30} y={top + 4}>{`+${(floors * 3.2).toFixed(2)}`}</text>
        <text className="drw-text df" x={x0 + W + 30} y={GROUND - 3}>±0.00</text>
        {label && (
          <text className="drw-text df" x="34" y="40">
            {label}
          </text>
        )}
      </g>
    </svg>
  );
}
