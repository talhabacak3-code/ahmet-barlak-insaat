import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center pt-[var(--header-h)]">
      <p className="label text-brand">Pafta 404</p>
      <h1 className="display display-hero mt-6 text-page">Bu pafta arşivde yok.</h1>
      <p className="mt-6 max-w-md leading-relaxed text-muted">Aradığınız sayfa taşınmış ya da hiç çizilmemiş olabilir.</p>
      <Link href="/" className="btn btn-primary mt-10 w-fit">
        Ana sayfaya dön
        <span aria-hidden="true" className="btn-arrow">
          →
        </span>
      </Link>
    </section>
  );
}
