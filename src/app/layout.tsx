import type { Metadata, Viewport } from "next";
import { Exo_2, Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollEffects } from "@/components/motion/ScrollEffects";

/*
 * Tipografi — logodaki geniş, kalın, sağa eğimli teknik karaktere yakın bir sistem
 * (logo fontu kesin bilinmiyor; Eurostile/Microgramma Extended benzeri):
 *  - Exo 2: başlıklar (hero 800 italik, H2/H3 700, vurgular 700 italik) — değişken font, tek dosya
 *  - Rajdhani: menü (600) ve butonlar (700) — yalnızca kullanılan iki ağırlık
 *  - Inter: paragraflar (400) — değişken font
 * Hepsi latin-ext alt kümesiyle (Türkçe ğ ü ş ı İ ö ç), next/font ile kendi sunucumuzdan.
 */
const exo2 = Exo_2({ subsets: ["latin", "latin-ext"], style: ["normal", "italic"], variable: "--font-exo2", display: "swap" });
const rajdhani = Rajdhani({ subsets: ["latin", "latin-ext"], weight: ["600", "700"], variable: "--font-rajdhani", display: "swap" });
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Afyonkarahisar`,
    template: `%s | ${site.shortName}`,
  },
  ...pageMeta({ description: site.description, path: "/" }),
  applicationName: site.shortName,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f2eee7",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  url: site.url,
  telephone: site.phone.e164,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.district}, ${site.address.street}`,
    postalCode: site.address.postalCode,
    addressLocality: site.address.locality,
    addressRegion: site.address.city,
    addressCountry: site.address.country,
  },
  logo: `${site.url}/brand/logo.png`,
  areaServed: { "@type": "City", name: "Afyonkarahisar" },
};

// JS açık ve hareket azaltılmamışsa ilk boyamadan önce `motion` sınıfı eklenir.
const motionScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${exo2.variable} ${rajdhani.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#icerik" className="label fixed left-4 top-4 z-[100] -translate-y-24 bg-ink px-4 py-3 text-paper focus:translate-y-0">
          İçeriğe geç
        </a>
        <SmoothScroll />
        <ScrollEffects />
        <Header />
        <main id="icerik">{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
