# Bilgi Mimarisi

Tüm firma verisi: `src/content/site.ts`. Başka firmaya uyarlamada yalnızca bu dosya + logo değişir.

## Sayfalar

| URL | Amaç |
|---|---|
| `/` | Güven + yönlendirme; aramaya dönüştürme |
| `/kurumsal` | Firma yaklaşımı, ilkeler, yerel odak |
| `/hizmetler` | Hizmet kapsamları (SEO: "Afyonkarahisar inşaat firması", "kentsel dönüşüm Afyon") |
| `/projeler` | Pafta formatında proje portföyü (firma verisi gelene dek yer tutucu) |
| `/iletisim` | Telefon, WhatsApp proje formu, adres, harita |

## Ana sayfa bölümleri (ritim: açık → açık/editoryal → liste → koyu pin → yatay → bordo → koyu)

1. **Hero / Pafta başlığı** — Büyük başlık "Her yapı bir hesapla başlar." + antet satırı (konum, koordinat, telefon) + Afyonkarahisar silüeti (Kale + yeni yapı) çizimi. CTA: Ara / Proje görüşmesi.
2. **Tanım (Manifesto)** — Kaydırmayla dolan büyük editoryal paragraf + firma künye tablosu (merkez, iletişim, hizmet alanı). Amaç: kim olduğumuzu tek nefeste söylemek.
3. **Hizmetler dizini** — 01–06 numaralı satırlar, tam genişlik. Amaç: taranabilir kapsam; her satır `/hizmetler#...`'e gider.
4. **Süreç (Sticky story)** — Koyu zemin. Solda sabit çizim: arsa → aks → temel → karkas → teslim. Sağda 5 adım. Amaç: belirsizliği azaltmak (inşaat müşterisinin en büyük kaygısı).
5. **Projeler (yatay kaydırma)** — Pafta kartları. CTA: tüm projeler.
6. **İlkeler bandı** — Bordo zemin, 4 ilke. Amaç: vaat değil, çalışma biçimi.
7. **İletişim finali** — Dev telefon numarası, manyetik Ara butonu, WhatsApp, yol tarifi, adres.

## CTA stratejisi

- Birincil: `tel:+905322708047` (header, hero, final, mobil alt bar).
- İkincil: WhatsApp (form mesajı hazırlar; veri sunucuya gitmez).
- Üçüncül: Yol tarifi (Google Maps).
- Her sayfa iletişim finali ile biter — kullanıcı nerede ikna olursa orada arayabilir.

## İçerik hiyerarşisi

1. Ne yapıyoruz (inşaat & mühendislik) 2. Nerede (Afyonkarahisar) 3. Nasıl çalışıyoruz (süreç, ilkeler) 4. Kanıt (projeler — veri gelince) 5. Nasıl ulaşılır.

## Varsayımlar (firmadan teyit alınacak)

- Hizmet listesi (6 kalem) sektörel varsayımdır.
- 0532 hattının WhatsApp'ta aktif olduğu varsayıldı.
- Proje, kuruluş yılı, ekip, belge bilgisi yok → uydurulmadı; yer tutucu olarak işaretlendi.
- Alan adı bilinmiyor → `NEXT_PUBLIC_SITE_URL` ortam değişkeni.
