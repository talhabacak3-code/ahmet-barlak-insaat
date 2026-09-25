/**
 * Süreç çizimi — 5 aşama: keşif → aks/kot → temel → karkas → teslim.
 * Her aşama `data-stage` grubudur; ProcessStory bunları kaydırmayla çizdirir.
 * Sınıflar: .pd = çizilen hat, .pf = beliren öğe, .pb = alttan yükselen blok.
 */

const G = 520; // zemin kotu
const AX = [130, 300, 470];
const LEVELS = [520, 440, 360, 280, 200];
const KOT = ["±0.00", "+3.20", "+6.40", "+9.60", "+12.80"];

const hatch = (x0: number, x1: number, y: number, h: number, step = 9) =>
  Array.from({ length: Math.ceil((x1 - x0) / step) }, (_, i) => `M${x0 + i * step} ${y + h}l${h} ${-h}`).join("");

export function BuildingStages({ className = "" }: { className?: string }) {
  const bays = [
    [AX[0] + 8, AX[1] - 8],
    [AX[1] + 8, AX[2] - 8],
  ];
  return (
    <svg viewBox="0 0 600 620" className={className} role="img" aria-label="Arsadan teslime yapının aşama aşama inşa edildiği teknik çizim">
      {/* 0 — Keşif */}
      <g data-stage="0">
        <path className="drw drw-bold pd" pathLength={1} d={`M20 ${G}H536`} />
        <path className="drw drw-thin pf" opacity="0.45" d={hatch(20, 530, G, 14)} />
        <g data-survey className="motion-reduce:hidden">
          <path className="drw pd" pathLength={1} d={`M110 ${G}V462l22 9-22 9 M490 ${G}V462l22 9-22 9`} />
          <path className="drw pd" pathLength={1} d={`M300 432L278 ${G}M300 432L322 ${G}M300 432V${G}M288 418h24v14h-24z M312 425h14`} />
          <path className="drw drw-thin pd" pathLength={1} d="M110 560H490M110 552v16M490 552v16" />
          <text className="drw-text pf" x="234" y="584">PARSEL SINIRI</text>
        </g>
      </g>

      {/* 1 — Aks & kot */}
      <g data-stage="1" opacity="0.9">
        {AX.map((x, i) => (
          <g key={x} className="pf">
            <path className="drw drw-thin drw-axis" d={`M${x} 64V600`} />
            <circle className="drw drw-thin" cx={x} cy="46" r="15" />
            <text className="drw-text" x={x - 3.5} y="50">{"ABC"[i]}</text>
          </g>
        ))}
        {LEVELS.map((y, i) => (
          <g key={y} className="pf">
            <path className="drw drw-thin drw-dash" d={`M64 ${y}H536`} opacity="0.6" />
            <text className="drw-text" x="542" y={y + 3}>{KOT[i]}</text>
          </g>
        ))}
      </g>

      {/* 2 — Temel */}
      <g data-stage="2">
        <path className="drw pd" pathLength={1} d={`M96 ${G}V590H504V${G}`} />
        <path className="drw drw-bold pd" pathLength={1} d={`M112 548H488V574H112Z`} />
        <path className="drw drw-thin pf" d={hatch(112, 488, 548, 26, 10)} opacity="0.7" />
        {AX.map((x) => (
          <path key={x} className="drw pd" pathLength={1} d={`M${x - 22} 548V528H${x + 22}V548`} />
        ))}
        <text className="drw-text pf" x="112" y="608">TEMEL — RADYE</text>
      </g>

      {/* 3 — Karkas (kat kat) */}
      <g data-stage="3">
        {LEVELS.slice(1).map((y, f) => (
          <g key={y} data-floor={f}>
            {AX.map((x) => (
              <path key={x} className="drw pd" pathLength={1} d={`M${x - 6} ${LEVELS[f]}V${y + 10} M${x + 6} ${LEVELS[f]}V${y + 10}`} />
            ))}
            <path className="drw drw-bold pd" pathLength={1} d={`M118 ${y}H482V${y + 10}H118Z`} />
          </g>
        ))}
      </g>

      {/* 4 — Teslim */}
      <g data-stage="4">
        {LEVELS.slice(0, 4).map((y, f) =>
          bays.map(([x0, x1], b) => {
            const top = LEVELS[f + 1] + 10;
            const isDoor = f === 0 && b === 1;
            const wx = x0 + 22;
            const ww = x1 - x0 - 44;
            return isDoor ? (
              <path key={`${f}${b}`} className="drw pd" pathLength={1} d={`M${wx + ww / 2 - 18} ${y}V${y - 52}H${wx + ww / 2 + 18}V${y}`} />
            ) : (
              <g key={`${f}${b}`}>
                <path className="drw pd" pathLength={1} d={`M${wx} ${y - 16}V${top + 16}H${wx + ww}V${y - 16}Z`} />
                <path className="drw drw-thin pd" pathLength={1} d={`M${wx + ww / 2} ${y - 16}V${top + 16}M${wx} ${y - 30}H${wx + ww}`} />
              </g>
            );
          }),
        )}
        <path className="drw pd" pathLength={1} d="M112 200V180H488V200" />
        {[
          [458, 164], [472, 164], [472, 150], [444, 164], [458, 150], [472, 136], [486, 150],
        ].map(([x, y], i) => (
          <rect key={i} className="pb accent" x={x} y={y} width="12" height="12" fill="currentColor" />
        ))}
        {[54, 548].map((x) => (
          <path key={x} className="drw drw-thin pd" pathLength={1} d={`M${x} ${G}V484 M${x} 484m-16 0a16 16 0 1 0 32 0a16 16 0 1 0 -32 0`} />
        ))}
      </g>
    </svg>
  );
}
