import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Statik export'ta uzantılı dosya (og.png) üretmek için route handler olarak tanımlı.
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

// Türkçe karakterler için Fraunces'ı (TTF) Google Fonts'tan yalnızca gereken harflerle alır.
async function loadFont(text: string, weight: number) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Fraunces:wght@${weight}&text=${encodeURIComponent(text)}`)
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
  const font = await loadFont(title + meta + "PAFTA 01 İNŞAAT&MÜHENDİSLİK", 400);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f2eee7", padding: 64, fontFamily: font ? "Fraunces" : undefined }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 2, color: "#5f5850", borderBottom: "1px solid rgba(25,23,21,.2)", paddingBottom: 18 }}>
          <span>PAFTA 01</span>
          <span>İNŞAAT & MÜHENDİSLİK</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 108, lineHeight: 1.02, color: "#191715", letterSpacing: -2 }}>
          <span>Her yapı bir</span>
          <span style={{ color: "#7a1e29" }}>hesapla başlar.</span>
        </div>
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 1.5, color: "#191715", borderTop: "2px solid #191715", paddingTop: 18 }}>{meta}</div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Fraunces", data: font, weight: 400, style: "normal" }] : undefined },
  );
}
