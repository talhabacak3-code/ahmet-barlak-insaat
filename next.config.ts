import type { NextConfig } from "next";

// GitHub Pages proje sitesi alt yolda yayınlanır (örn. /ahmet-barlak-insaat). Kendi alan adında boş bırakın.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  poweredByHeader: false,
  // Statik export'ta Next'in görsel optimizasyon sunucusu yok.
  images: { unoptimized: true },
};

export default nextConfig;
