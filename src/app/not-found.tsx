import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center pt-[var(--header-h)]">
      <p className="label text-muted">404</p>
      <h1 className="display mt-5 max-w-[14em] text-[clamp(2.5rem,5.4vw,4.25rem)] text-ink">Bu pafta arşivde yok.</h1>
      <p className="mt-5 max-w-md text-[17px] leading-[1.55] text-charcoal">Aradığınız sayfa taşınmış ya da hiç çizilmemiş olabilir.</p>
      <Link href="/" className="btn btn-primary mt-9 w-fit">
        Ana sayfaya dön
        <span aria-hidden="true" className="btn-arrow">
          →
        </span>
      </Link>
    </section>
  );
}
