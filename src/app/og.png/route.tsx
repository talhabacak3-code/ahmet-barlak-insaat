import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Statik export'ta uzantılı dosya (og.png) üretmek için route handler olarak tanımlı.
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

// Türkçe karakterler için Exo 2 ExtraBold İtalik'i (TTF) Google Fonts'tan yalnızca gereken harflerle alır.
async function loadFont(text: string, weight: number) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@1,${weight}&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const title = "Her yapı bir hesapla başlar.";
  const meta = `${site.name.toUpperCase()} · AFYONKARAHİSAR · ${site.phone.display}`;
  const font = await loadFont(title + meta + "PAFTA 01 İNŞAAT&MÜHENDİSLİK", 800);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#ffffff", padding: 64, fontFamily: font ? "Exo 2" : undefined, fontStyle: "italic" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 2, color: "#5c5c5c", borderBottom: "1px solid #e5e5e5", paddingBottom: 18 }}>
          <span>PAFTA 01</span>
          <span>İNŞAAT & MÜHENDİSLİK</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 100, lineHeight: 1, color: "#111111", letterSpacing: -2 }}>
          <span>Her yapı bir</span>
          <span style={{ color: "#8b1520" }}>hesapla başlar.</span>
        </div>
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 1.5, color: "#111111", borderTop: "2px solid #111111", paddingTop: 18 }}>{meta}</div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Exo 2", data: font, weight: 800, style: "italic" }] : undefined },
  );
}
