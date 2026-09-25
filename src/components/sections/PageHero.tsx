import type { CSSProperties, ReactNode } from "react";

const dl = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

type Props = {
  sheet: string;
  eyebrow: string;
  /** Her öğe bir satır; satırlar maskeden yükselir. */
  lines: ReactNode[];
  lead?: ReactNode;
  aside?: ReactNode;
};

/** İç sayfa başlığı — ana sayfa hero'suyla aynı giriş kurgusu (süreklilik). */
export function PageHero({ sheet, eyebrow, lines, lead, aside }: Props) {
  return (
    <section aria-labelledby="sayfa-baslik" className="pt-[var(--header-h)]">
      <div className="shell">
        <div className="label hero-fade flex justify-between gap-4 border-b hairline py-4 text-muted" style={dl(0.1)}>
          <span>
            Pafta {sheet} — {eyebrow}
          </span>
          <span className="hidden sm:block">Ölçek 1:100 · Afyonkarahisar</span>
        </div>

        <div className="grid gap-10 pb-16 pt-12 md:pb-24 md:pt-16 lg:grid-cols-12 lg:gap-6">
          <h1 id="sayfa-baslik" className="display text-[clamp(2.8rem,9vw,8.4rem)] lg:col-span-9 lg:text-[clamp(3rem,7.2vw,8.4rem)]">
            {lines.map((l, i) => (
              <span key={i} className="hero-line block overflow-clip pb-[0.04em]">
                <span style={dl(0.15 + i * 0.1)}>{l}</span>
              </span>
            ))}
          </h1>
          {(lead || aside) && (
            <div className="hero-fade flex flex-col justify-end gap-6 lg:col-span-3" style={dl(0.6)}>
              {lead && <p className="max-w-md text-[1.05rem] leading-relaxed text-ink/80">{lead}</p>}
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
