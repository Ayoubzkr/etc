/**
 * Pre-computes the dotted world map used on the homepage. Output: src/content/world-map.json
 * Markers: the company's own base (Tanger Med) and the countries of origin of the partners and
 * sourcing references listed in src/content/network.ts — country level only, never an office.
 * Run: node scripts/build-world-map.mjs
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
const require = createRequire(import.meta.url);
const mod = require("dotted-map");
const DottedMap = mod.default ?? mod;

// Antarctica and the far north are cropped: they only add empty rows.
const map = new DottedMap({ height: 84, grid: "diagonal", region: { lat: { min: -56, max: 76 }, lng: { min: -170, max: 180 } } });
const points = map.getPoints().map((p) => [Number(p.x.toFixed(2)), Number(p.y.toFixed(2))]);
const pin = (lat, lng) => {
  const { x, y } = map.getPin({ lat, lng });
  return { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) };
};
// Approximate position of the Tangier region (city-level, world-scale illustration only)
const hub = pin(35.78, -5.8);
// Country centroids (approximate). United States: Florida, where the sourcing reference is based.
const origins = [
  { country: "Allemagne", ...pin(51.2, 10.4) },
  { country: "France", ...pin(46.6, 2.4) },
  { country: "Italie", ...pin(42.8, 12.6) },
  { country: "Espagne", ...pin(40.2, -3.7) },
  { country: "Roumanie", ...pin(45.9, 24.9) },
  { country: "États-Unis", ...pin(28.1, -81.6) },
];
const out = { width: map.image.width, height: map.image.height, hub, origins, points };
fs.writeFileSync(path.resolve(import.meta.dirname, "../src/content/world-map.json"), JSON.stringify(out));
console.log(points.length, out.width, out.height, hub, origins);
