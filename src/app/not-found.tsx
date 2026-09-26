import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center pt-[var(--header-h)]">
      <p className="label text-brand">Pafta 404</p>
      <h1 className="display mt-6 text-[clamp(3rem,10vw,9rem)]">Bu pafta arşivde yok.</h1>
      <p className="mt-6 max-w-md leading-relaxed text-muted">Aradığınız sayfa taşınmış ya da hiç çizilmemiş olabilir.</p>
      <Link href="/" className="group mt-10 flex h-14 w-fit items-center gap-6 bg-ink px-6 text-paper transition-colors hover:bg-brand">
        <span className="font-medium">Ana sayfaya dön</span>
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
