// Next 16 statik export: istemci segment prefetch dosyalarını düz adla (`__next.kurumsal.__PAGE__.txt`)
// ister, derleme ise iç içe yazar (`__next.kurumsal/__PAGE__.txt`). Statik sunucularda 404 olmaması için
// iç içe dosyaların düz adlı kopyaları oluşturulur.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
let copied = 0;

function flatten(segmentDir) {
  const parent = join(segmentDir, "..");
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else {
        const flat = join(parent, relative(parent, p).split(sep).join("."));
        if (!existsSync(flat)) {
          copyFileSync(p, flat);
          copied++;
        }
      }
    }
  };
  walk(segmentDir);
}

function scan(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory() || name === "_next") continue;
    if (name.startsWith("__next.")) flatten(p);
    else scan(p);
  }
}

if (existsSync(OUT)) {
  scan(OUT);
  console.log(`flatten-export-segments: ${copied} dosya`);
}
