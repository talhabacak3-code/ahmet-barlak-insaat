"use client";

import { useId, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { site, whatsappHref } from "@/content/site";

/**
 * Sunucusuz talep formu: bilgiler kaydedilmez, WhatsApp mesajı olarak hazırlanır.
 * Bir e-posta/CRM servisi eklendiğinde yalnızca `onSubmit` değiştirilmelidir.
 */
export function ProjectRequestForm() {
  const params = useSearchParams();
  const initial = site.services.find((s) => s.slug === params.get("hizmet"))?.title ?? "";
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const id = useId();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("ad") ?? "").trim();
    const phone = String(data.get("telefon") ?? "").trim();
    if (!name || !phone) {
      setError("Lütfen adınızı ve telefon numaranızı yazın.");
      return;
    }
    setError(null);
    const lines = [
      "Merhaba, web sitenizden proje talebi:",
      `Ad Soyad: ${name}`,
      `Telefon: ${phone}`,
      data.get("hizmet") ? `Hizmet: ${data.get("hizmet")}` : "",
      data.get("konum") ? `Konum: ${data.get("konum")}` : "",
      data.get("mesaj") ? `Not: ${data.get("mesaj")}` : "",
    ].filter(Boolean);
    const href = whatsappHref(lines.join("\n"));
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
      setSent(true);
    }
  };

  // DESIGN.md form alanı: linen dolgu, yalnız alt çizgi, köşesiz
  const field = "field peer h-[58px]";
  const label = "label pointer-events-none absolute left-3 top-2 text-[12px] text-muted transition-colors peer-focus:text-brand";

  if (!site.whatsapp) {
    return (
      <p className="text-[17px] text-charcoal">
        Proje talepleriniz için bizi arayın:{" "}
        <a className="u-link font-medium" href={site.phone.href}>
          {site.phone.display}
        </a>
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${id}-not`} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <input id={`${id}-ad`} name="ad" autoComplete="name" required className={field} />
          <label htmlFor={`${id}-ad`} className={label}>
            Ad Soyad *
          </label>
        </div>
        <div className="relative">
          <input id={`${id}-tel`} name="telefon" type="tel" inputMode="tel" autoComplete="tel" required className={field} />
          <label htmlFor={`${id}-tel`} className={label}>
            Telefon *
          </label>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <select id={`${id}-hizmet`} name="hizmet" defaultValue={initial} className={`${field} cursor-pointer appearance-none pr-10`}>
            <option value="">Seçiniz</option>
            {site.services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Diğer">Diğer</option>
          </select>
          <label htmlFor={`${id}-hizmet`} className={label}>
            Hizmet
          </label>
          <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 text-sm text-muted">
            ↓
          </span>
        </div>
        <div className="relative">
          <input id={`${id}-konum`} name="konum" className={field} />
          <label htmlFor={`${id}-konum`} className={label}>
            Arsa / yapı konumu
          </label>
        </div>
      </div>
      <div className="relative">
        <textarea id={`${id}-mesaj`} name="mesaj" rows={4} className={`${field} h-auto resize-none pt-8`} />
        <label htmlFor={`${id}-mesaj`} className={label}>
          Projenizden kısaca bahsedin
        </label>
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-brand">
          {error}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-dark">
          WhatsApp ile gönder
          <span aria-hidden="true" className="btn-arrow">
            ↗
          </span>
        </button>
        <p id={`${id}-not`} className="max-w-xs text-xs leading-relaxed text-muted">
          Bilgileriniz sitemizde saklanmaz; WhatsApp üzerinden doğrudan bize iletilecek bir mesaj olarak hazırlanır.
        </p>
      </div>
      <p aria-live="polite" className="text-sm text-muted">
        {sent ? "WhatsApp açıldı. Mesajı göndermeyi unutmayın — dilerseniz doğrudan da arayabilirsiniz." : ""}
      </p>
    </form>
  );
}
