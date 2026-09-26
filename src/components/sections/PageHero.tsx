import type { CSSProperties, ReactNode } from "react";

const dl = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

type Props = {
  eyebrow: string;
  /** Her öğe bir satır; satırlar maskeden yükselir. */
  lines: ReactNode[];
  lead?: ReactNode;
};

/** İç sayfa başlığı — editoryal serif başlık, sola yaslı; ana sayfa hero'suyla aynı giriş kurgusu. */
export function PageHero({ eyebrow, lines, lead }: Props) {
  return (
    <section aria-labelledby="sayfa-baslik" className="pt-[calc(var(--header-h)+40px)] md:pt-[calc(var(--header-h)+72px)]">
      <div className="shell grid gap-8 pb-14 md:pb-20 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-8">
          <p className="label hero-fade text-muted" style={dl(0.05)}>
            {eyebrow}
          </p>
          <h1 id="sayfa-baslik" className="display mt-5 text-[clamp(2.5rem,5.4vw,4.25rem)] text-ink">
            {lines.map((l, i) => (
              <span key={i} className="hero-line block overflow-clip pb-[0.06em]">
                <span style={dl(0.15 + i * 0.1)}>{l}</span>
              </span>
            ))}
          </h1>
        </div>
        {lead && (
          <p className="hero-fade max-w-md text-[17px] leading-[1.55] text-charcoal lg:col-span-4" style={dl(0.6)}>
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
