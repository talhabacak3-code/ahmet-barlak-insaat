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

  const field = "peer h-14 w-full border-0 border-b border-ink/35 bg-transparent px-0 pt-4 text-[1.02rem] outline-none transition-colors focus:border-brand focus-visible:outline-none";
  const label = "label pointer-events-none absolute left-0 top-0 text-muted transition-colors peer-focus:text-brand";

  if (!site.whatsapp) {
    return (
      <p className="text-lg">
        Proje talepleriniz için bizi arayın:{" "}
        <a className="u-link font-medium" href={site.phone.href}>
          {site.phone.display}
        </a>
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${id}-not`} className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
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
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="relative">
          <select id={`${id}-hizmet`} name="hizmet" defaultValue={initial} className={`${field} cursor-pointer appearance-none`}>
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
          <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-0 text-sm">
            ↓
          </span>
        </div>
        <div className="relative">
          <input id={`${id}-konum`} name="konum" placeholder=" " className={field} />
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

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="group flex h-14 items-center justify-between gap-8 bg-ink px-6 text-paper transition-colors hover:bg-brand">
          <span className="font-medium">WhatsApp ile gönder</span>
          <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
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
