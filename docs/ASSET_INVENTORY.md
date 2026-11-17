# Asset inventory

Everything under `public/`. Photograph metadata (alt text, crop position, credit) lives in `src/content/images.ts`, which also feeds the `/credits` page — keep the two in sync when a file changes.

Photographs were downloaded and resized to 2400px wide by `scripts/build-assets.mjs`. `next/image` serves AVIF/WebP at the right size, so the files in the repository are masters, not what visitors download.

## Photographs

All paths are under `public/images/`. Unsplash photo IDs resolve at `https://images.unsplash.com/photo-<id>`; Commons files at `https://commons.wikimedia.org/wiki/File:<name>`.

| Key | File | Size | Used on | Source | Licence |
| --- | --- | --- | --- | --- | --- |
| `hero` | `hero/automotive-robotic-line.jpg` | 2400×1600 | Homepage hero, Open Graph image | Unsplash `1567789884554-0b844b597180` | Unsplash |
| `expertise` | `company/engineer-test-bench.jpg` | 2400×1601 | Homepage "Notre métier" | Unsplash `1581091226825-a6a2a5aee158` | Unsplash |
| `port` | `company/container-terminal.jpg` | 2400×1600 | Qui sommes-nous hero | Unsplash `1578575437130-527eed3abbec` | Unsplash |
| `warehouseRacking` | `logistics/warehouse-racking.jpg` | 2400×1597 | Qui sommes-nous, mission | Unsplash `1587293852726-70cdb56c2866` | Unsplash |
| `sourcing` | `sourcing/mechanical-components.jpg` | 2400×1485 | Competency 01 | Unsplash `1537462715879-360eeb61a0ad` | Unsplash |
| `centralisation` | `logistics/warehouse-aisle.jpg` | 2400×3200 | Competency 02 | Unsplash `1553413077-190dd305871c` | Unsplash |
| `repair` | `repair/technician-diagnosis.jpg` | 2400×1602 | Competency 03 | Unsplash `1621905251918-48416bd8575a` | Unsplash |
| `manufacturing` | `manufacturing/robotic-cell.jpg` | 2400×1837 | Sector 01 | Unsplash `1563968743333-044cef800494` | Unsplash |
| `energy` | `energy/power-lines.jpg` | 2400×1600 | Sector 02 | Unsplash `1473341304170-971dccb5ac1e` | Unsplash |
| `food` | `food-industry/process-piping.jpg` | 2400×1600 | Sector 03 | Unsplash `1513828583688-c52646db42da` | Unsplash |
| `chemical` | `chemical-industry/refinery.jpg` | 2400×1600 | Sector 04 | Unsplash `1516937941344-00b4e0337589` | Unsplash |
| `pharmaceutical` | `pharmaceutical/laboratory.jpg` | 2400×1601 | Sector 05 | Unsplash `1581093450021-4a7360e9a6b5` | Unsplash |
| `water` | `water-treatment/clarifier.jpg` | 2400×1296 | Sector 06 | Commons, Czeva — `ČBu,_wastewater_treatment_plant_05.jpg` | CC BY-SA 4.0 |
| `maintenance` | `industrial-maintenance/mechanic-wrench.jpg` | 2400×1800 | Sector 07 | Unsplash `1619642751034-765dfdf7c58e` | Unsplash |
| `metallurgy` | `metallurgy/hot-rolling.jpg` | 2400×1599 | Sector 08 | Commons, Adrian Tync — `Huta_Pokój_walcownia_2019_(2).jpg` | CC BY-SA 4.0 |
| `logistics` | `logistics/container-port-aerial.jpg` | 2400×1600 | Sector 09 | Unsplash `1494412574643-ff11b0a5c1c3` | Unsplash |
| `plastics` | `plastics/injection-moulding-hall.jpg` | 2400×1600 | Sector 10 | Commons, Orionpenindia — `Inside_the_factory.jpg` | CC BY-SA 4.0 |
| `cement` | `cement/cement-plant.jpg` | 2400×1350 | Sector 11 | Commons, CEphoto, Uwe Aranas — `Hoping_Taiwan-Cement-Corporation-Hoping-Plant-02.jpg` | CC BY-SA 3.0 |
| `automotive` | `automotive/assembly-line.jpg` | 2400×1600 | Sector 12 | Commons, Marek Ślusarczyk (Tupungato) — `002_Production_line_-_car_assembly_line_in_General_Motors_Manufacturing_Poland_-_Gliwice,_Poland.jpg` | CC BY 3.0 |

The Creative Commons photographs require attribution: the `/credits` page (linked from the footer) provides it and must stay online while they are used. Unsplash authors are credited generically as "Photographe Unsplash"; individual names were not recorded.

These are illustration photographs, not pictures of the company's own sites. Replace them with real photography when the client supplies some.

## Company logo

Under `public/logos/`.

| File | Origin | Use |
| --- | --- | --- |
| `etc-sat-maroc.svg`, `etc-sat-maroc.png` | Supplied by the client | Master files. The PNG is referenced in JSON-LD |
| `company/etc-sat-maroc-horizontal.svg` | Derived | Header on light backgrounds |
| `company/etc-sat-maroc-horizontal-on-dark.svg` | Derived | Header over the hero. White wordmark, emblem unchanged |
| `company/etc-sat-maroc-stacked.svg` | Derived | Footer |
| `company/etc-sat-maroc-stacked-on-dark.svg` | Derived | Not used yet, kept for dark backgrounds |
| `company/etc-sat-maroc-emblem.svg` | Derived | Source of the icons |
| `favicon.ico`, `favicon.png` | Derived | Copies of `src/app/favicon.ico` and `src/app/icon.png` |

Derived files are generated from the client's SVG by `scripts/build-assets.mjs`: the original paths are rearranged, never redrawn. The same script produces `src/app/icon.png`, `apple-icon.png`, `favicon.ico` and `opengraph-image.jpg`.

## Partner and client logos

| File | Status |
| --- | --- |
| `partners/project-international.jpg` → `project-international-trimmed.png` | Supplied by the client. White margins trimmed. Shown |
| `partners/copex.jpg` → `copex-trimmed.png` | Supplied by the client. White margins trimmed. Shown |
| `partners/_unconfirmed/smt-global.jpg` | Relationship with the company not confirmed. **Not shown** |
| `partners/_unconfirmed/hypertec-system.png` | Same. **Not shown** |
| `clients/` | Empty. No client logo has been supplied |

Every company without a supplied logo is shown as its name in plain type. Missing: the 19 clients, and BLICKLE, FREUDENBERG, AZOLGAS, ETC SILLY, SATHERM, BROP.

## Empty folders

`public/videos/`, `public/icons/` and `public/images/aerospace/` hold only a `.gitkeep`. They are reserved for future material and nothing references them.

## Re-running the pipeline

```bash
node scripts/build-assets.mjs [commons-metadata.json]
```

Existing photographs are skipped, so the script is safe to re-run to regenerate logo variants, icons and the Open Graph image. Downloading the five Wikimedia Commons photographs again needs a JSON file mapping the script's short IDs to download URLs; that file was not kept, so re-download those by hand from the links above if they are ever deleted. `sharp` is available through Next.js and is not a direct dependency.
