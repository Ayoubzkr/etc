/**
 * Pre-computes the dotted world map used on the homepage (neutral map, no location markers
 * except the Tangier hub). Output: src/content/world-map.json
 * Run: node scripts/build-world-map.mjs
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
const require = createRequire(import.meta.url);
const mod = require("dotted-map");
const DottedMap = mod.default ?? mod;

const map = new DottedMap({ height: 62, grid: "diagonal" });
const points = map.getPoints().map((p) => [Number(p.x.toFixed(2)), Number(p.y.toFixed(2))]);
// Approximate position of the Tangier region (city-level, world-scale illustration only)
const hub = map.getPin({ lat: 35.78, lng: -5.8 });
const out = { width: map.image.width, height: map.image.height, hub: { x: hub.x, y: hub.y }, points };
fs.writeFileSync(path.resolve(import.meta.dirname, "../src/content/world-map.json"), JSON.stringify(out));
console.log(points.length, out.width, out.height, out.hub);
