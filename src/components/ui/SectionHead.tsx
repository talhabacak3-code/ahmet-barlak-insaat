import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  /** Koyu/renkli yüzey üstünde açık metin */
  tone?: "light" | "dark";
  className?: string;
};

/** Bölüm başlığı: caption + 40–48px serif başlık (sola yaslı, 6–8 sütun) + isteğe bağlı açıklama ve bağlantı. */
export function SectionHead({ id, eyebrow, title, lead, action, tone = "light", className = "" }: Props) {
  const dark = tone === "dark";
  return (
    <div className={`grid gap-6 md:grid-cols-12 md:items-end ${className}`}>
      <div className="md:col-span-8">
        <p className={`label ${dark ? "text-dim" : "text-muted"}`}>{eyebrow}</p>
        <h2 id={id} data-reveal="lines" className={`display mt-4 text-[clamp(2rem,3.6vw,3rem)] ${dark ? "text-paper" : "text-ink"}`}>
          {title}
        </h2>
        {lead && (
          <p data-reveal="fade" className={`mt-5 max-w-xl text-[17px] leading-[1.55] ${dark ? "text-dim" : "text-charcoal"}`}>
            {lead}
          </p>
        )}
      </div>
      {action && <div className="md:col-span-4 md:justify-self-end">{action}</div>}
    </div>
  );
}
