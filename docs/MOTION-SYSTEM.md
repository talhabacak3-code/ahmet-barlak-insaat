# Hareket Sistemi

Metafor: **inşa etmek.** Hiçbir şey "süzülmez"; çizilir, yerleşir, yükselir.

## Temel değerler

| Token | Değer |
|---|---|
| `ease.out` | `expo.out` (giriş) |
| `ease.inOut` | `power3.inOut` (geçiş) |
| `dur.s / m / l` | 0.5 / 0.9 / 1.4s |
| `stagger` | 0.06 (satır), 0.035 (blok) |
| Tetik | `top 82%` — öğe ekranın alt beşte birine girince |

## Sayfa girişi

Hero: antet çizgisi soldan çizilir (0.9s) → başlık satırları maskeden yükselir (stagger 0.08) → silüet çizgileri çizilir (1.6s) → bordo yapı blokları alttan üste yerleşir → CTA'lar belirir. Toplam < 2.2s; içerik 0.3s'de okunabilir başlar (LCP'yi geciktirmez; ilk çerçevede metin `visibility` açık, yalnızca transform).

## Metin açılışları

`RevealText`: SplitText ile satırlara bölünür, her satır `overflow: clip` maskeden `yPercent: 110 → 0`. Manifesto paragrafında kelime bazlı opaklık scrub'ı (0.18 → 1).

## Görsel açılışları

`DrawSvg`: `[data-draw]` path'leri `stroke-dashoffset` ile çizilir. Pafta kartları `clip-path: inset(100% 0 0 0) → inset(0)` (döküm gibi alttan dolar).

## Hover

- Link: alt çizgi `scaleX 0→1`, origin sol, 0.45s.
- Hizmet satırı: bordo dolgu `scaleX`, numara 12px sağa kayar, ok 45° döner.
- Manyetik buton: imleç çekimi max 0.35 × mesafe, bırakınca `elastic.out(1, 0.4)`.
- Sadece `(hover: hover) and (pointer: fine)` cihazlarda.

## Kaydırma

- Lenis (lerp 0.1), GSAP ticker ile senkron. Anchor linkleri Lenis üzerinden.
- Süreç bölümü: ≥1024px'te pin + scrub; çizim aşamaları adım ilerlemesine bağlı.
- Projeler: ≥1024px'te yatay pin (x = -(genişlik - viewport)); aksi hâlde native scroll-snap.
- Scroll-jacking yok: pin süresi içerik uzunluğuyla orantılı, scrub 0.6.

## Geçişler

Sayfalar arası: header sabit kalır, yeni sayfanın başlığı aynı hero giriş kurgusunu kullanır (süreklilik).

## Azaltılmış hareket

`prefers-reduced-motion: reduce` → Lenis başlatılmaz, `gsap.matchMedia` ile tüm animasyonlar atlanır, SVG'ler çizili, metin görünür, pin yok, manyetik etki yok. CSS tarafında `transition-duration: 0.01ms`.
