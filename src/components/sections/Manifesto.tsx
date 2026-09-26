import { site } from "@/content/site";

export function Manifesto() {
  return (
    <section id="tanim" aria-labelledby="tanim-baslik" className="section-y">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-3">
          <p className="label text-brand">
            <span aria-hidden="true">§ </span>Tanım
          </p>
          <h2 id="tanim-baslik" className="sr-only">
            Firma tanımı
          </h2>
        </div>

        <div className="lg:col-span-9">
          <p data-reveal="words" className="font-display text-[clamp(1.7rem,3.6vw,3.4rem)] font-semibold leading-[1.12] tracking-[-0.02em] wdth-100">
            Bir yapının ömrü, kâğıda çizilen ilk çizginin doğruluğuna bağlıdır. {site.shortName} &amp; Mühendislik olarak Afyonkarahisar&apos;da her projeye oradan
            başlıyoruz: önce yeri tanıyor, sonra hesabı kuruyor, en son inşa ediyoruz.
          </p>

          <dl className="mt-16 grid border-t hairline sm:grid-cols-2 lg:mt-24 lg:grid-cols-4" data-reveal="fade" data-stagger>
            {[
              ["Firma", site.name],
              ["Merkez", `${site.address.district}, ${site.address.street}`],
              ["Telefon", site.phone.display],
              ["Çalışma bölgesi", site.serviceArea],
            ].map(([k, v], i) => (
              <div key={k} className={`border-b hairline py-5 sm:pr-6 ${i > 0 ? "lg:border-l lg:pl-6" : ""} ${i % 2 ? "sm:border-l sm:pl-6 lg:pl-6" : ""}`}>
                <dt className="label text-muted">{k}</dt>
                <dd className="mt-2 text-[0.95rem] leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
