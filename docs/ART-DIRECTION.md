# Art Direction — Ahmet Barlak İnşaat & Mühendislik

> **Güncel tasarım sistemi (v2):** Site, kullanıcının sağladığı DESIGN.md referansına ("kamp ateşi başında edebiyat dergisi") taşındı.
> Kaynak tokenlar `src/app/globals.css` içinde. Özet:
>
> - **Zemin:** Parchment `#fefffc`, kartlar `#ffffff`, form/yüzey `#f9faf7`; kıl çizgi `#dee2de` (Mist).
> - **Metin:** Graphite `#2c2c2c` başlık, Charcoal `#444141` gövde, Ash `#646464` yardımcı. Metinde saydamlık yok.
> - **Tek vurgu:** DESIGN.md'deki Signal Blue yerine **logo bordosu `#7a1e29`** — yalnızca kenarlıklı birincil buton ve küçük vurgular. Renkli yüzey tek yerde: İlkeler kartı. Gece kartı Dusk `#1f1f29`.
> - **Tipografi:** Başlık Fraunces 400 (ppmondwest yedeği), `-0.02em`, satır 1.1, liga kapalı; gövde Geist 400/500; çizim etiketleri Geist Mono; logo yazısı Archivo geniş italik.
> - **Şekil:** Buton 8px, kart 12px, diyagram kartı 16px, atmosferik yüzey 24px, navigasyon hapı tam yuvarlak. Butonlarda gölge yok.
> - **Bileşenler:** Buzlu cam navigasyon hapı, hero'da buzlu cam başlık kartı, kenarlıklı birincil / ikincil buton, tek dolu koyu buton, beyaz içerik kartı, diyagram kartı (süreç çizimi), atmosferik kartlar (İlkeler, gece silüeti), linen dolgulu alt çizgili form alanı, beyaz künye footer.
> - **Korunanlar:** Teknik çizim illüstrasyonları (canlı silüet, süreç çizimi, gece silüeti), hareket sistemi.
>
> Aşağıdaki bölümler v1 ("Pafta") yönünün kayıtlarıdır; illüstrasyon ve hareket kısımları hâlâ geçerlidir.

## Proje özeti

- **İşletme:** İnşaat & mühendislik firması, Afyonkarahisar merkez (Karaman Mah., Leylak Cd. No:24/B).
- **Hedef kitle:** Arsa sahipleri, konut/iş yeri yaptırmak isteyen bireyler, kat karşılığı / kentsel dönüşüm düşünen mülk sahipleri, yerel ticari işletmeler, kurumsal iş ortakları.
- **Birincil dönüşüm:** Telefonla arama (0532 270 80 47). İkincil: WhatsApp üzerinden proje talebi, yol tarifi.
- **Marka kişiliği:** Hesaplı, ciddi, yerel, güvenilir. "Gösterişli" değil "sağlam".
- **İçerik yoğunluğu:** Düşük–orta. Elimizde gerçek proje görseli, kuruluş yılı, referans yok → tasarım fotoğrafa bağımlı olmamalı.
- **Şablon hedefi:** Site, başka inşaat firmalarına uyarlanabilecek şekilde tüm firma verisini `src/content/site.ts` içinde tutar.

## Değerlendirilen yönler

1. **"Beton & Cam" — fotoğraf ağırlıklı sinematik.** Tam ekran şantiye fotoğrafları, video hero. *Elendi:* firmaya ait görsel yok; stok/AI şantiye fotoğrafı markayı sahte gösterir ve içerik dürüstlüğü kuralını ihlal eder.
2. **"Brutalist şantiye" — sarı/siyah uyarı bantları, ağır grotesk.** *Elendi:* sektör klişesi; logodaki bordo ve zarif italik karakterle çelişir.
3. **"Pafta" (seçildi) — teknik çizim editoryali.** Site bir mimari pafta gibi kurgulanır: ince çizgiler, ölçü okları, kot etiketleri (±0.00), aks numaraları, antet (title block) bilgileri. Görsel dil çizimle üretilir; yapılar kaydırdıkça "inşa edilir". Afyon Kalesi silüeti yerel kimlik olarak hero'da yer alır.

**Gerekçe:** Firmanın adı "inşaat & mühendislik" — hesap ve çizim, mühendisliğin doğal dili. Fotoğrafsız da premium görünür, gerçek proje fotoğrafları geldiğinde aynı çerçeveye (pafta kartı) yerleşir. Logodaki piksel kareler "yapı taşı" motifine dönüşür.

## Tipografi

| Rol | Font | Ayar |
|---|---|---|
| Display | **Archivo** (variable, wdth 62–125) | wdth 112–125, wght 700–850; logo wordmark'ı ile aynı aile (geniş + italik) |
| Metin | **IBM Plex Sans** | 400/500, 16–18px, satır 1.6 |
| Teknik etiket | **IBM Plex Mono** | 400/500, 11–13px, uppercase, tracking 0.08em |

- Başlıklar sıkı satır aralığı (0.92–1.0), negatif tracking (-0.02em).
- Italik yalnızca marka vurgusu için (logodaki gibi), gövde metninde kullanılmaz.
- Tüm fontlar `latin-ext` → Türkçe karakterler (İ, ı, ş, ğ) garanti.
- Ölçek: `clamp()` tabanlı akışkan; hero başlığı mobilde ~15vw, masaüstünde max 11rem.

## Renk token'ları

| Token | Değer | Kullanım |
|---|---|---|
| `--paper` | `#F2EEE7` | Ana zemin — Afyon mermeri / traverten tonu |
| `--paper-2` | `#E8E2D7` | İkincil zemin, kart |
| `--ink` | `#191715` | Metin, koyu bölümler (logodaki siyah) |
| `--ink-2` | `#2B2825` | Koyu bölüm yüzeyi |
| `--muted` | `#5F5850` | İkincil metin (paper üzerinde 6.2:1) |
| `--line` | `rgb(25 23 21 / .16)` | Hairline çizgiler |
| `--brand` | `#7A1E29` | Logo bordosu — vurgu, CTA |
| `--brand-deep` | `#561520` | Hover / basılı |
| `--brand-soft` | `#C9A3A6` | Koyu zeminde vurgu |

Kural: bordo yüzeyin %10'unu geçmez; bir bölümün tamamı bordo olduğunda (ilkeler bandı) başka bordo öğe kullanılmaz. Gradyan yok.

## Boşluk

4px tabanlı: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192. Bölüm dikey boşluğu `clamp(96px, 14vw, 192px)`.

## Grid

- Masaüstü: 12 sütun, 24px oluk, yan boşluk `clamp(16px, 4vw, 56px)`, max 1520px.
- Tablet: 8 sütun. Mobil: 4 sütun, 16px oluk.
- Asimetri esastır: metin blokları 5–7 sütun, çizimler kenara taşar (full-bleed).
- Görünür aks çizgileri (dikey hairline) bazı bölümlerde grid'i ifşa eder — paftadaki aks sistemi gibi.

## Kenar / radius

Sıfır radius. Mimari hassasiyet: köşeler keskin, kutular yerine hairline çizgiler ve köşe işaretleri (crop marks). Yuvarlak tek öğe: dairesel "Ara" butonu (manyetik).

## Görsel işleme

- Birincil görsel dil: SVG teknik çizim (görünüş, kesit, silüet), stroke 1–1.5px, `vector-effect: non-scaling-stroke`.
- Proje kartları "pafta" formatında: çizim + antet tablosu (Konum / Tür / Durum). Gerçek fotoğraf eklendiğinde aynı çerçevede, hafif sıcak ton + %6 grain ile gösterilir.
- Yasak: stok şantiye fotoğrafı, AI render, blob, glassmorphism.

## Hareket dili

"İnşa etmek": çizgiler çizilir (stroke-dashoffset), bloklar alttan üste yerleşir, metin satırları maskeden yükselir. Easing `expo.out` / `power3.out`, 0.8–1.4s. Detay: `docs/MOTION-SYSTEM.md`.

## Etkileşim dili

- Linkler: alt çizgi soldan sağa çizilir.
- Hizmet satırları: bordo dolgu soldan akar, satır numarası kayar.
- Birincil CTA: manyetik dairesel buton (yalnızca hover destekli cihazlarda).
- Fokus: 2px bordo outline + 3px offset, her zaman görünür.

## Mobil stratejisi

- Hero: başlık üstte, silüet çizimi altta tam genişlik; CTA'lar tam genişlik.
- Kalıcı alt bar: "Ara" + "WhatsApp" (başparmak bölgesi), footer'a gelince gizlenir.
- Pinned sticky-story mobilde kapatılır → adımlar alt alta, her adımın küçük çizimi kendi içinde.
- Yatay proje kaydırması mobilde native scroll-snap.
- Hover etkileri mobilde statik hâle gelir (açıklama her zaman görünür).

## Erişilebilirlik kısıtları

- WCAG AA kontrast (tüm metin ≥ 4.5:1; bordo #7A1E29 paper üzerinde 8.4:1).
- Dekoratif SVG'ler `aria-hidden`; anlam taşıyan çizimlerde `role="img"` + `aria-label`.
- `prefers-reduced-motion`: Lenis kapalı, scrub animasyonları final durumda, pin yok.
- Skip link, klavye ile açılıp kapanan mobil menü (Escape, focus trap).

## Performans kısıtları

- Fotoğraf yok → LCP metin. Fontlar `next/font` ile self-host.
- GSAP + ScrollTrigger + SplitText tek client modülünde, `gsap.context()` ile temizlenir.
- Harita iframe'i tıklamayla yüklenir (facade).
- Hedef: Lighthouse Perf ≥ 90, A11y ≥ 95, CLS ≈ 0.
