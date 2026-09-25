# Ahmet Barlak İnşaat & Mühendislik — Kurumsal Web Sitesi

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · GSAP (ScrollTrigger, SplitText) · Lenis

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (tüm sayfalar statik)
npm run lint
npm run typecheck
```

## Yayın (GitHub Pages)

`main` dalına her push'ta `.github/workflows/deploy.yml` siteyi statik olarak derleyip GitHub Pages'e yayınlar.
Site repo adıyla alt yolda açılır (`https://<kullanıcı>.github.io/<repo>/`); `NEXT_PUBLIC_BASE_PATH` ve `NEXT_PUBLIC_SITE_URL` iş akışında otomatik ayarlanır.

**Kendi alan adına geçerken:** Pages ayarlarından alan adını bağlayın, iş akışında `NEXT_PUBLIC_BASE_PATH` değerini boş, `NEXT_PUBLIC_SITE_URL` değerini alan adınız yapın.

Proje görselleri eklerken yolu `/` ile başlatın (örn. `/projeler/konut-01.jpg`); alt yol öneki otomatik eklenir.

## Başka bir inşaat firmasına uyarlama

1. **`src/content/site.ts`** — firma adı, telefon, adres, WhatsApp, hizmetler, süreç, ilkeler, projeler. Tüm sayfalar buradan beslenir.
2. **Logo** — `src/components/brand/Logo.tsx` (monogram SVG + yazı) ve `src/app/icon.svg` (favicon).
3. **Renk** — `src/app/globals.css` içindeki `--color-brand*` token'ları (marka rengi) ve gerekirse `--color-paper`.
4. **Hero sloganı** — `src/components/sections/Hero.tsx` ve `src/app/opengraph-image.tsx`.
5. **Silüet** — `src/components/drawings/Skyline.tsx` içindeki Afyon Kalesi çizimi şehre özeldir; başka şehir için kaya/kale path'ini o şehrin simgesiyle değiştirin.

## Proje görselleri

`site.ts` → `projects[].image` alanına `/public` altındaki bir fotoğraf yolunu (örn. `/projeler/konut-01.jpg`) yazdığınızda kart teknik çizim yerine fotoğrafı gösterir. Gerçek proje eklendiğinde `placeholder: true` satırını kaldırın.

## Dokümanlar

- `docs/ART-DIRECTION.md` — görsel yön, tipografi, renk, grid
- `docs/INFORMATION-ARCHITECTURE.md` — sayfalar, bölümler, CTA stratejisi
- `docs/MOTION-SYSTEM.md` — hareket dili ve reduced-motion davranışı

## Firmadan teyit edilecekler

- Hizmet listesi (6 kalem sektörel varsayımdır)
- 0532 hattının WhatsApp'ta aktif olduğu
- Orijinal vektör logo (şu an `public/brand/logo-orijinal.jpg` referans alınarak yeniden çizildi)
- Gerçek proje bilgileri ve fotoğrafları
