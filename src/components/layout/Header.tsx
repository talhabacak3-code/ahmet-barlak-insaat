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
      {/* Buzlu cam navigasyon hapı */}
      <header
        className={`fixed inset-x-0 top-0 ${open ? "z-[60]" : "z-50"} pt-3 transition-transform duration-500 ease-[var(--ease-out-expo)] md:pt-4 ${
          hidden && !open ? "-translate-y-[130%]" : "translate-y-0"
        }`}
      >
        <div className="shell">
          <div
            className={`frost mx-auto flex h-[60px] max-w-[1100px] items-center justify-between gap-4 rounded-full pl-5 pr-2 transition-shadow duration-500 ${
              scrolled || open ? "shadow-nav" : ""
            }`}
          >
            <Link href="/" aria-label={`${site.name} — Ana sayfa`} className="-my-2 rounded-full py-2">
              <Logo />
            </Link>

            <nav aria-label="Ana menü" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {site.nav.map((item) => {
                  const active = pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`block rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                          active ? "bg-linen text-ink" : "text-charcoal hover:bg-linen hover:text-ink"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-1">
              <a href={site.phone.href} className={`btn btn-primary hidden rounded-full md:inline-flex ${open ? "invisible" : ""}`}>
                <span>
                  <span className="text-muted">Ara</span> {site.phone.display}
                </span>
                <span aria-hidden="true" className="btn-arrow">
                  →
                </span>
              </a>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobil-menu"
                className="flex h-11 items-center gap-3 rounded-full px-4 text-[15px] font-medium text-ink transition-colors hover:bg-linen lg:hidden"
              >
                {open ? "Kapat" : "Menü"}
                <span aria-hidden="true" className="relative block h-2.5 w-5">
                  <span className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-500 ${open ? "top-1 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-500 ${open ? "top-1 -rotate-45" : "top-2.5"}`} />
                </span>
              </button>
            </div>
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
        className="fixed inset-0 z-[55] overflow-y-auto bg-paper text-ink lg:hidden"
      >
        <div className="shell flex min-h-full flex-col pb-10 pt-[calc(var(--header-h)+24px)]">
          <nav aria-label="Mobil menü">
            <ul className="border-t hairline">
              {[{ href: "/", label: "Ana Sayfa" }, ...site.nav].map((item) => (
                <li key={item.href} className="border-b hairline">
                  <Link
                    href={item.href}
                    aria-current={(item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) ? "page" : undefined}
                    className="flex items-center justify-between py-5"
                  >
                    <span className="display text-[40px]">{item.label}</span>
                    <span aria-hidden="true" className="btn-arrow text-muted">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-3 pt-12">
            <a href={site.phone.href} className="btn btn-dark">
              <span>Hemen ara · {site.phone.display}</span>
              <span aria-hidden="true" className="btn-arrow">
                →
              </span>
            </a>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <span>WhatsApp&apos;tan yazın</span>
                <span aria-hidden="true" className="btn-arrow">
                  ↗
                </span>
              </a>
            )}
            <address className="mt-4 text-sm not-italic leading-relaxed text-muted">
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
