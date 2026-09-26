import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollEffects } from "@/components/motion/ScrollEffects";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
});
const plex = IBM_Plex_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-plex", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

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
  areaServed: { "@type": "City", name: "Afyonkarahisar" },
};

// JS açık ve hareket azaltılmamışsa ilk boyamadan önce `motion` sınıfı eklenir.
const motionScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${archivo.variable} ${plex.variable} ${plexMono.variable}`}>
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
