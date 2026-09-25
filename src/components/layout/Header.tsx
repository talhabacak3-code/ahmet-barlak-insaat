"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { site, whatsappHref } from "@/content/site";
import { scrollLock } from "@/components/motion/SmoothScroll";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > 240 && y > lastY.current + 2);
      if (y < lastY.current - 2) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Rota değişince menüyü kapat (render sırasında önceki rota ile karşılaştırarak)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    scrollLock(open);
    if (!open) return;
    const dialog = dialogRef.current;
    // Kapat butonu diyalog dışında (header'da) olduğu için tuzağa dahil edilir.
    const focusables = () => [toggleRef.current, ...Array.from(dialog?.querySelectorAll<HTMLElement>("a,button") ?? [])].filter((el): el is HTMLElement => !!el);
    focusables()[1]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const f = focusables();
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      scrollLock(false);
    };
  }, [open]);

  const wa = whatsappHref();

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 ${open ? "z-[60]" : "z-50"} transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-out-expo)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${open ? "border-b border-transparent bg-transparent" : scrolled ? "border-b hairline bg-paper" : "border-b border-transparent bg-paper/0"}`}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name} — Ana sayfa`} className="relative z-[60] -m-2 p-2">
            <Logo tone={open ? "light" : "dark"} />
          </Link>

          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {site.nav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={active ? "page" : undefined} className="u-link group flex items-baseline gap-1.5 py-1 text-[0.95rem] font-medium">
                      <span className="label text-[0.62rem] text-muted transition-colors group-hover:text-brand">{item.sheet}</span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <a href={site.phone.href} className={`group hidden items-center gap-3 md:flex ${open ? "invisible" : ""}`}>
              <span className="label text-right text-muted">
                Bizi
                <br />
                arayın
              </span>
              <span className="font-display text-lg font-bold tracking-tight wdth-112 transition-colors group-hover:text-brand">{site.phone.display}</span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobil-menu"
              className={`relative z-[60] -mr-2 flex h-11 items-center gap-3 px-2 lg:hidden ${open ? "text-paper" : "text-ink"}`}
            >
              <span className="label">{open ? "Kapat" : "Menü"}</span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-500 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobil-menu"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        hidden={!open}
        className="on-dark fixed inset-0 z-[55] overflow-y-auto bg-ink text-paper lg:hidden"
      >
        <div className="shell flex min-h-full flex-col pb-10 pt-[calc(var(--header-h)+32px)]">
          <nav aria-label="Mobil menü">
            <ul className="border-t border-paper/15">
              <li className="border-b border-paper/15">
                <Link href="/" className="flex items-baseline gap-4 py-5">
                  <span className="label text-brand-soft">01</span>
                  <span className="display text-[clamp(2.2rem,11vw,3.5rem)]">Ana Sayfa</span>
                </Link>
              </li>
              {site.nav.map((item) => (
                <li key={item.href} className="border-b border-paper/15">
                  <Link href={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined} className="flex items-baseline gap-4 py-5">
                    <span className="label text-brand-soft">{item.sheet}</span>
                    <span className="display text-[clamp(2.2rem,11vw,3.5rem)]">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-6 pt-12">
            <a href={site.phone.href} className="display text-4xl text-paper">
              {site.phone.display}
            </a>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="label u-link w-fit text-brand-soft">
                WhatsApp&apos;tan yazın ↗
              </a>
            )}
            <address className="not-italic text-sm leading-relaxed text-paper/70">
              {site.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
        </div>
      </div>
    </>
  );
}
