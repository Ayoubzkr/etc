# ETC SAT MAROC — corporate website

Marketing site for ETC SAT MAROC (industrial spare-parts sourcing, Tanger Med). French only, 8 pages, statically prerendered, one API route for the contact form.

Stack: Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, Motion + GSAP ScrollTrigger, react-hook-form + zod.

> Next.js 16 has breaking changes. Read `AGENTS.md` and the guides in `node_modules/next/dist/docs/` before changing framework-level code.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
npm run start    # serve the production build
npm run lint
```

## Environment

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, no trailing slash. Drives canonical URLs, sitemap, Open Graph and JSON-LD. |
| `RESEND_API_KEY` | Resend key for the contact form. Without it the form returns a clear "not connected yet" error and sends nothing. |
| `CONTACT_TO_EMAIL` | Recipient of contact requests. Defaults to `contact@etc-sat-maroc.com`. |
| `CONTACT_FROM_EMAIL` | Sender. Must belong to a domain verified in Resend. |

## Pages

| Route | File |
| --- | --- |
| `/` | `src/app/page.tsx` |
| `/qui-sommes-nous` | `src/app/qui-sommes-nous/page.tsx` |
| `/competences` | `src/app/competences/page.tsx` |
| `/secteurs` | `src/app/secteurs/page.tsx` |
| `/ils-nous-font-confiance` | `src/app/ils-nous-font-confiance/page.tsx` |
| `/partenaires` | `src/app/partenaires/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` |
| `/credits` | `src/app/credits/page.tsx` |
| `/api/contact` | `src/app/api/contact/route.ts` (POST, zod-validated, honeypot, 5 messages / 10 min / IP) |

`robots.txt`, `sitemap.xml`, icons and the Open Graph image are generated from `src/app`.

## Editing content

All copy and data live in `src/content/` — pages contain no hard-coded company data.

| File | Holds |
| --- | --- |
| `site.ts` | Company name, tagline, phone, e-mail, the two entities and their addresses, navigation |
| `about.ts` | History, mission, vision |
| `services.ts` | The three competencies |
| `sectors.ts` | The 12 sectors (`featured: true` shows a sector on the homepage) |
| `network.ts` | Clients, partners, sourcing references |
| `images.ts` | Every photograph: path, alt text, crop position, credit |
| `search-index.ts` | Entries of the site search |

Rules followed throughout: client wording only, no invented claims or milestones, and a value set to `null` hides the matching UI element rather than showing a placeholder.

### Adding a client or partner logo

Only original files supplied by the company are used; a missing logo is typeset as plain text, never redrawn.

1. Drop the official file in `public/logos/clients/` or `public/logos/partners/`.
2. In `src/content/network.ts`, set `logo: { src, width, height }` with the intrinsic pixel size.

### Replacing a photograph

Drop the file under `public/images/…` and update `src`, `alt`, `width`, `height` and `credit` in `src/content/images.ts`. The credits page updates itself. See `docs/ASSET_INVENTORY.md`.

## Waiting on the client

- Resend API key and a verified sender domain, so the contact form can send.
- Official logos for the 30 clients and for BLICKLE, FREUDENBERG, AZOLGAS, ETC SILLY, SATHERM and BROP.
- Confirmation of the two logos kept aside in `public/logos/partners/_unconfirmed/` (SMT Global, Hypertec System). They are not shown anywhere.
- Exact Google Maps pins for both addresses (`mapsEmbedUrl` in `site.ts`). Until then each address links to a Maps text search.
- LinkedIn URL (`site.social.linkedin`). The icon appears once it is set.
- Final production domain, if different from `www.etc-sat-maroc.com`.

## Other documentation

- `docs/DESIGN_SYSTEM.md` — colours, type, spacing, components, motion.
- `docs/ASSET_INVENTORY.md` — every image and logo, with source and licence.
- `docs/reference/` — the client's brief and correction documents.
