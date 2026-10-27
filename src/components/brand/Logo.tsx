import Image from "next/image";
import { asset, site } from "@/content/site";

/**
 * Orijinal logo görseli. `public/brand/logo.png`, `logo-orijinal.jpg` dosyasından yalnızca dış boşluğu kırpılarak
 * ve beyaz zemini şeffaflaştırılarak üretildi; sembol, yazı ve renkler değiştirilmedi.
 */
const W = 426;
const H = 166;

type Props = {
  /** "light": koyu zemin — logo renkleri değişmeden açık bir plakaya oturur. */
  tone?: "dark" | "light";
  /** Yükseklik sınıfı; genişlik orana göre otomatik. */
  className?: string;
  priority?: boolean;
};

export function Logo({ tone = "dark", className = "h-11", priority = false }: Props) {
  const img = <Image src={asset("/brand/logo.png")} alt={site.name} width={W} height={H} priority={priority} className={`${className} w-auto`} />;
  return tone === "light" ? <span className="inline-flex bg-paper px-3 py-2">{img}</span> : img;
}
