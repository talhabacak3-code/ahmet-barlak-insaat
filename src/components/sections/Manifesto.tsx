import { site } from "@/content/site";

export function Manifesto() {
  const facts = [
    ["Firma", site.name],
    ["Merkez", `${site.address.district}, ${site.address.street}`],
    ["Telefon", site.phone.display],
    ["Çalışma bölgesi", site.serviceArea],
  ];

  return (
    <section id="tanim" aria-labelledby="tanim-baslik" className="section-y">
      <div className="shell">
        <p className="label text-muted">Tanım</p>
        <h2 id="tanim-baslik" className="sr-only">
          Firma tanımı
        </h2>
        <p data-reveal="words" className="display mt-5 max-w-[22em] text-[clamp(1.65rem,3vw,2.5rem)] leading-[1.28] text-ink">
          Bir yapının ömrü, kâğıda çizilen ilk çizginin doğruluğuna bağlıdır. {site.shortName} &amp; Mühendislik olarak Afyonkarahisar&apos;da her projeye oradan
          başlıyoruz: önce yeri tanıyor, sonra hesabı kuruyor, en son inşa ediyoruz.
        </p>

        <dl className="mt-14 grid gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4" data-reveal="fade" data-stagger>
          {facts.map(([k, v]) => (
            <div key={k} className="card p-5">
              <dt className="label text-muted">{k}</dt>
              <dd className="mt-2 text-[15px] leading-snug text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
