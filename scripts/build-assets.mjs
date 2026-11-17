/**
 * One-off asset pipeline (already executed — outputs are committed in /public).
 * Re-run with:  node scripts/build-assets.mjs
 * - downloads the stock photographs listed in docs/ASSET_INVENTORY.md
 * - derives logo variants (horizontal lockup, light/dark, emblem) from the supplied SVG
 * - generates favicon.png / favicon.ico / apple icon / Open Graph image
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const pub = (...p) => path.join(root, "public", ...p);
const UA = { "User-Agent": "asset-pipeline/1.0" };

const photos = [
  // [output path, source url]
  ["hero/automotive-robotic-line.jpg", "u:1567789884554-0b844b597180"],
  ["company/engineer-test-bench.jpg", "u:1581091226825-a6a2a5aee158"],
  ["company/container-terminal.jpg", "u:1578575437130-527eed3abbec"],
  ["logistics/warehouse-racking.jpg", "u:1587293852726-70cdb56c2866"],
  ["sourcing/mechanical-components.jpg", "u:1537462715879-360eeb61a0ad"],
  ["logistics/warehouse-aisle.jpg", "u:1553413077-190dd305871c"],
  ["repair/technician-diagnosis.jpg", "u:1621905251918-48416bd8575a"],
  ["manufacturing/robotic-cell.jpg", "u:1563968743333-044cef800494"],
  ["energy/power-lines.jpg", "u:1473341304170-971dccb5ac1e"],
  ["chemical-industry/refinery.jpg", "u:1516937941344-00b4e0337589"],
  ["pharmaceutical/laboratory.jpg", "u:1581093450021-4a7360e9a6b5"],
  ["industrial-maintenance/mechanic-wrench.jpg", "u:1619642751034-765dfdf7c58e"],
  ["logistics/container-port-aerial.jpg", "u:1494412574643-ff11b0a5c1c3"],
  ["food-industry/process-piping.jpg", "u:1513828583688-c52646db42da"],
  ["water-treatment/clarifier.jpg", "c:d01"],
  ["metallurgy/hot-rolling.jpg", "c:e04"],
  ["plastics/injection-moulding-hall.jpg", "c:a00"],
  ["cement/cement-plant.jpg", "c:b06"],
  ["automotive/assembly-line.jpg", "c:h02"],
];

async function fetchPhotos(commonsMeta) {
  for (const [out, src] of photos) {
    const dest = pub("images", out);
    if (fs.existsSync(dest)) continue;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const [kind, id] = src.split(":");
    const url = kind === "u"
      ? `https://images.unsplash.com/photo-${id}?w=2400&q=85&fm=jpg&fit=max`
      : commonsMeta[id].url;
    const res = await fetch(url, { headers: UA });
    if (!res.ok) { console.error("FAILED", out, res.status); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf).rotate().resize({ width: 2400, withoutEnlargement: true })
      .jpeg({ quality: 84, mozjpeg: true }).toFile(dest);
    console.log("ok", out);
    await new Promise((r) => setTimeout(r, 400));
  }
}

function logoVariants() {
  const svg = fs.readFileSync(pub("logos", "etc-sat-maroc.svg"), "utf8");
  const paths = [...svg.matchAll(/<path fill="(#\w+)"[^>]*d="([^"]*)"/g)].map((m) => ({ fill: m[1], d: m[2] }));
  const red = paths.find((p) => /^#E9/i.test(p.fill));
  const green = paths.find((p) => /^#00/i.test(p.fill));
  const subs = green.d.split(/(?=M )/).map((s) => s.trim()).filter(Boolean);
  const ys = (s) => (s.match(/-?\d+\.?\d*/g) || []).map(Number).filter((_, i) => i % 2 === 1);
  const word = subs.filter((s) => Math.min(...ys(s)) >= 300).join(" ");
  const star = subs.filter((s) => Math.max(...ys(s)) < 300).join(" ");
  const outline = red.d.split(/(?=M )/)[0].trim();
  // white backing so the cut-out monogram stays white on any background
  const emblem = `<path fill="#FFFFFF" d="${outline}"/><path fill="${red.fill}" fill-rule="evenodd" d="${red.d}"/><path fill="${green.fill}" fill-rule="evenodd" d="${star}"/>`;
  const head = (w, h, t) => `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img"><title>${t}</title>`;
  const horizontal = (wordFill) =>
    `${head(650, 100, "ETC SAT MAROC")}<g transform="translate(-129 0) scale(0.2994)">${emblem}</g><g transform="translate(124 ${(27 - 343 * 0.43).toFixed(2)}) scale(0.43)"><path fill="${wordFill}" fill-rule="evenodd" d="${word}"/></g></svg>\n`;
  const stacked = (wordFill) =>
    `${head(1200, 451, "ETC SAT MAROC")}${emblem}<path fill="${wordFill}" fill-rule="evenodd" d="${word}"/></svg>\n`;
  const emblemSvg = `${head(336, 336, "ETC SAT MAROC — emblème")}<g transform="translate(-431 1)">${emblem}</g></svg>\n`;
  const out = {
    "company/etc-sat-maroc-horizontal.svg": horizontal(green.fill),
    "company/etc-sat-maroc-horizontal-on-dark.svg": horizontal("#FFFFFF"),
    "company/etc-sat-maroc-stacked.svg": stacked(green.fill),
    "company/etc-sat-maroc-stacked-on-dark.svg": stacked("#FFFFFF"),
    "company/etc-sat-maroc-emblem.svg": emblemSvg,
  };
  for (const [f, c] of Object.entries(out)) fs.writeFileSync(pub("logos", f), c);
  return emblemSvg;
}

function ico(pngs) {
  // ICO container with embedded PNG entries
  const header = Buffer.alloc(6); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + 16 * pngs.length; const entries = [];
  for (const { size, buf } of pngs) {
    const e = Buffer.alloc(16); e[0] = size >= 256 ? 0 : size; e[1] = size >= 256 ? 0 : size;
    e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(buf.length, 8); e.writeUInt32LE(offset, 12);
    offset += buf.length; entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
}

async function icons(emblemSvg) {
  const render = (size, pad = 0.06) => {
    const inner = Math.round(size * (1 - pad * 2));
    return sharp(Buffer.from(emblemSvg), { density: 600 }).resize(inner, inner, { fit: "contain", background: "#0000" })
      .extend({ top: Math.round((size - inner) / 2), bottom: size - inner - Math.round((size - inner) / 2), left: Math.round((size - inner) / 2), right: size - inner - Math.round((size - inner) / 2), background: "#0000" }).png().toBuffer();
  };
  const p512 = await render(512);
  fs.writeFileSync(pub("logos", "favicon.png"), p512);
  fs.writeFileSync(path.join(root, "src/app/icon.png"), p512);
  const apple = await sharp(await render(180, 0.12)).flatten({ background: "#FFFFFF" }).png().toBuffer();
  fs.writeFileSync(path.join(root, "src/app/apple-icon.png"), apple);
  const icoBuf = ico([{ size: 16, buf: await render(16, 0) }, { size: 32, buf: await render(32, 0) }, { size: 48, buf: await render(48, 0) }]);
  fs.writeFileSync(pub("logos", "favicon.ico"), icoBuf);
  fs.writeFileSync(path.join(root, "src/app/favicon.ico"), icoBuf);
}

async function og() {
  const logo = await sharp(pub("logos/company/etc-sat-maroc-horizontal-on-dark.svg"), { density: 300 }).resize({ width: 520 }).png().toBuffer();
  const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#172B3A" stop-opacity=".96"/><stop offset=".6" stop-color="#172B3A" stop-opacity=".72"/><stop offset="1" stop-color="#172B3A" stop-opacity=".3"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><rect x="80" y="330" width="64" height="4" fill="#E5252A"/><text x="80" y="400" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="44" fill="#fff">Sourcing multimarque &amp; pièces de rechange</text><text x="80" y="456" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="44" fill="#fff">pour la maintenance industrielle</text><text x="80" y="520" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="#D5DCE1" letter-spacing="3">INDUSTRIAL SUPPLY &amp; SPARE PARTS SOURCING</text></svg>`);
  await sharp(pub("images/hero/automotive-robotic-line.jpg")).resize(1200, 630, { fit: "cover" })
    .composite([{ input: overlay }, { input: logo, left: 80, top: 150 }]).jpeg({ quality: 86 }).toFile(path.join(root, "src/app/opengraph-image.jpg"));
}

async function trimPartnerLogos() {
  // Remove the white margins of supplied partner logos (proportions untouched)
  for (const name of ["project-international", "copex"]) {
    const src = pub("logos/partners", `${name}.jpg`);
    const out = pub("logos/partners", `${name}-trimmed.png`);
    const { info } = await sharp(src).trim({ threshold: 18 }).png().toFile(out).then((info) => ({ info }));
    console.log(name, info.width, info.height);
  }
}

const metaPath = process.argv[2];
await trimPartnerLogos();
await fetchPhotos(metaPath ? JSON.parse(fs.readFileSync(metaPath, "utf8")) : {});
const emblem = logoVariants();
await icons(emblem);
await og();
console.log("done");
