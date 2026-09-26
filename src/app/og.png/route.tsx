import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Statik export'ta uzantılı dosya (og.png) üretmek için route handler olarak tanımlı.
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

// Türkçe karakterler için fontları (TTF) Google Fonts'tan yalnızca gereken harflerle alır.
async function loadFont(family: string, text: string) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const eyebrow = "İnşaat & Mühendislik · Afyonkarahisar";
  const meta = `${site.name} · ${site.phone.display}`;
  const [serif, sans] = await Promise.all([
    loadFont("Fraunces:wght@400", "Her yapı bir hesapla başlar."),
    loadFont("Geist:wght@500", eyebrow + meta),
  ]);
  const fonts = [
    ...(serif ? [{ name: "Fraunces", data: serif, weight: 400 as const, style: "normal" as const }] : []),
    ...(sans ? [{ name: "Geist", data: sans, weight: 500 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f9faf7", padding: 40, fontFamily: sans ? "Geist" : undefined }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            background: "#fefffc",
            border: "1px solid #dee2de",
            borderRadius: 24,
            padding: 56,
          }}
        >
          <div style={{ display: "flex", fontSize: 22, color: "#646464" }}>{eyebrow}</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 96, lineHeight: 1.08, color: "#2c2c2c", letterSpacing: -2, fontFamily: serif ? "Fraunces" : undefined }}>
            <span>Her yapı bir</span>
            <span style={{ color: "#7a1e29" }}>hesapla başlar.</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: "#444141", borderTop: "1px solid #dee2de", paddingTop: 22 }}>
            <span>{meta}</span>
            <span style={{ display: "flex", border: "1px solid #7a1e29", color: "#7a1e29", borderRadius: 8, padding: "8px 16px" }}>Bizi arayın →</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
