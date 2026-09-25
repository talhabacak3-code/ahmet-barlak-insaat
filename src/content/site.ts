/**
 * Firma verisinin tek kaynağı.
 * Siteyi başka bir firmaya uyarlarken bu dosyayı ve /public/brand içeriğini değiştirmeniz yeterlidir.
 *
 * İÇERİK DÜRÜSTLÜĞÜ: Firmadan teyit edilmemiş bilgi eklemeyin. `placeholder: true`
 * olarak işaretli kayıtlar gerçek veri geldiğinde değiştirilmelidir.
 */

export type GlyphKey = "konut" | "ticari" | "proje" | "donusum" | "tadilat" | "anahtar";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  scope: string[];
  glyph: GlyphKey;
};

export type Drawing = {
  floors: number;
  bays: number;
  roof: "flat" | "pitched" | "sawtooth";
  shopfront?: boolean;
  scaffold?: boolean;
};

export type Project = {
  slug: string;
  code: string;
  title: string;
  type: string;
  location: string;
  status: string;
  year?: string;
  /** /public altındaki fotoğraf yolu. Yoksa teknik çizim gösterilir. */
  image?: string;
  drawing: Drawing;
  placeholder?: boolean;
};

const address = {
  district: "Karaman",
  street: "Leylak Cd. No:24/B",
  postalCode: "03200",
  locality: "Merkez",
  city: "Afyonkarahisar",
  country: "TR",
};

export const site = {
  name: "Ahmet Barlak İnşaat & Mühendislik",
  shortName: "Ahmet Barlak İnşaat",
  wordmark: "ahmet barlak",
  tagline: "inşaat & mühendislik",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  description:
    "Afyonkarahisar merkezli inşaat ve mühendislik firması. Konut, ticari yapı, kentsel dönüşüm ve proje-mühendislik hizmetlerinde keşiften teslime tek muhatap.",
  phone: { display: "0532 270 80 47", href: "tel:+905322708047", e164: "+905322708047" },
  // Varsayım: 0532 hattı WhatsApp'ta aktif. Değilse `whatsapp: null` yapın.
  whatsapp: "905322708047" as string | null,
  address: {
    ...address,
    lines: [`${address.district}, ${address.street}`, `${address.postalCode} ${address.city} ${address.locality} / ${address.city}`],
    full: `${address.district}, ${address.street}, ${address.postalCode} ${address.city} ${address.locality}/${address.city}`,
  },
  coordinates: "38°45′ K · 30°32′ D",
  serviceArea: "Afyonkarahisar ve çevresi",

  nav: [
    { href: "/kurumsal", label: "Kurumsal", sheet: "02" },
    { href: "/hizmetler", label: "Hizmetler", sheet: "03" },
    { href: "/projeler", label: "Projeler", sheet: "04" },
    { href: "/iletisim", label: "İletişim", sheet: "05" },
  ],

  // Varsayım: sektörel standart hizmet kalemleri — firmadan teyit alınmalı.
  services: [
    {
      slug: "konut-projeleri",
      title: "Konut Projeleri",
      short: "Müstakil evden çok katlı apartmana, yaşanacak yapılar.",
      description:
        "Arsanın koşullarına, bütçenize ve yaşam biçiminize göre planlanan konut yapıları. Projelendirmeden anahtar teslimine kadar tüm aşamalar tek elden yürütülür.",
      scope: ["Müstakil ve villa tipi konutlar", "Çok katlı apartman yapıları", "Kat karşılığı projeler", "Kaba ve ince işlerin yönetimi"],
      glyph: "konut",
    },
    {
      slug: "ticari-yapilar",
      title: "Ticari & Endüstriyel Yapılar",
      short: "İş yeri, mağaza, depo ve atölye yapıları.",
      description:
        "İşletmenizin iş akışını merkeze alan, işlevsel ve bakımı kolay ticari yapılar. Açıklık, yük ve kullanım senaryoları proje başında netleştirilir.",
      scope: ["İş yeri ve mağaza yapıları", "Depo ve atölye binaları", "Çelik ve betonarme sistemler", "İşletme ihtiyacına göre yerleşim"],
      glyph: "ticari",
    },
    {
      slug: "proje-muhendislik",
      title: "Proje & Mühendislik",
      short: "Keşif, metraj, maliyet ve proje koordinasyonu.",
      description:
        "Uygulamaya geçmeden önce yapının hesabını doğru kurmak için keşif, metraj ve maliyet analizi; mimari ve mühendislik projelerinin koordinasyonu.",
      scope: ["Yerinde keşif ve ihtiyaç analizi", "Metraj ve maliyet hesabı", "Proje koordinasyonu", "İş programı ve planlama"],
      glyph: "proje",
    },
    {
      slug: "kentsel-donusum",
      title: "Kentsel Dönüşüm",
      short: "Riskli yapıların güvenli yapılarla yenilenmesi.",
      description:
        "Riskli yapı sürecinden yeni binanın teslimine kadar hak sahipleriyle şeffaf iletişim içinde yürütülen yenileme projeleri.",
      scope: ["Süreç ve evrak yönlendirmesi", "Hak sahipleriyle koordinasyon", "Yıkım ve yeniden yapım", "Teslim ve iskân süreci desteği"],
      glyph: "donusum",
    },
    {
      slug: "tadilat-guclendirme",
      title: "Tadilat & Güçlendirme",
      short: "Mevcut yapıların yenilenmesi ve iyileştirilmesi.",
      description:
        "Mevcut yapıların ihtiyaca göre yenilenmesi; iç mekân düzenlemeleri, cephe yenileme ve mühendislik değerlendirmesine dayalı iyileştirme çalışmaları.",
      scope: ["İç mekân tadilatı", "Cephe ve çatı yenileme", "Yapısal değerlendirme", "Güçlendirme uygulamaları"],
      glyph: "tadilat",
    },
    {
      slug: "anahtar-teslim",
      title: "Anahtar Teslim Uygulama",
      short: "Temelden son kat boyaya tek sözleşme, tek muhatap.",
      description:
        "Kaba inşaat, tesisat ve ince işlerin tek bir planla, tek bir muhatapla yürütüldüğü uygulama modeli. Sizin için süreç sade, sorumluluk net.",
      scope: ["Kaba inşaat", "Tesisat koordinasyonu", "İnce işler ve dış cephe", "Teslim öncesi kontroller"],
      glyph: "anahtar",
    },
  ] satisfies Service[],

  process: [
    { title: "Keşif & İhtiyaç", text: "Arsa ya da yapı yerinde incelenir. İhtiyaç, bütçe ve takvim birlikte netleştirilir." },
    { title: "Proje & Hesap", text: "Mimari ve mühendislik projeleri koordine edilir; metraj ve maliyet çıkarılır." },
    { title: "Ruhsat & Planlama", text: "Resmi süreçler yürütülür, iş programı ve tedarik planı hazırlanır." },
    { title: "Uygulama", text: "Temelden çatıya kaba ve ince işler, planlanan iş programına göre ilerler." },
    { title: "Teslim & Destek", text: "Kontroller tamamlanır, yapı teslim edilir. Teslimden sonra da ulaşılabilir kalırız." },
  ],

  principles: [
    { title: "Önce hesap", text: "Her karar ölçüye, keşfe ve mühendislik hesabına dayanır. Tahminle değil, veriyle ilerleriz." },
    { title: "Tek muhatap", text: "Proje, resmi süreç ve şantiye aynı masada yönetilir. Kime soracağınızı her zaman bilirsiniz." },
    { title: "Açık iletişim", text: "İş programı, maliyet kalemleri ve ilerleme düzenli olarak sizinle paylaşılır." },
    { title: "Yerinde bilgi", text: "Afyonkarahisar'da, şantiyeye yakın çalışırız. Yakın olmak hızlı karar vermek demektir." },
  ],

  // YER TUTUCU: Firmanın gerçek projeleri geldiğinde değiştirin (başlık, konum, yıl, görsel).
  projects: [
    { slug: "konut-01", code: "KNT-01", title: "Apartman Yapısı", type: "Konut", location: "Afyonkarahisar", status: "Bilgi eklenecek", drawing: { floors: 5, bays: 4, roof: "flat" }, placeholder: true },
    { slug: "ticari-01", code: "TCR-01", title: "Ticari Yapı", type: "Ticari", location: "Afyonkarahisar", status: "Bilgi eklenecek", drawing: { floors: 3, bays: 5, roof: "flat", shopfront: true }, placeholder: true },
    { slug: "mustakil-01", code: "MST-01", title: "Müstakil Konut", type: "Konut", location: "Afyonkarahisar", status: "Bilgi eklenecek", drawing: { floors: 2, bays: 3, roof: "pitched" }, placeholder: true },
    { slug: "donusum-01", code: "KD-01", title: "Dönüşüm Yapısı", type: "Kentsel Dönüşüm", location: "Afyonkarahisar", status: "Bilgi eklenecek", drawing: { floors: 6, bays: 3, roof: "flat" }, placeholder: true },
    { slug: "endustriyel-01", code: "END-01", title: "Depo & Atölye", type: "Endüstriyel", location: "Afyonkarahisar", status: "Bilgi eklenecek", drawing: { floors: 1, bays: 6, roof: "sawtooth" }, placeholder: true },
    { slug: "tadilat-01", code: "TDL-01", title: "Cephe Yenileme", type: "Tadilat", location: "Afyonkarahisar", status: "Bilgi eklenecek", drawing: { floors: 4, bays: 3, roof: "flat", scaffold: true }, placeholder: true },
  ] satisfies Project[],
};

export const whatsappHref = (text?: string) =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}` : null;

export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address.full)}`;
