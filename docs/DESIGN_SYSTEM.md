# Design system

Tokens are defined in `src/app/globals.css` (`@theme` block) and exposed as Tailwind utilities. This file describes what exists; the CSS is the source of truth.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| `red` | `#e5252a` | Brand accent: primary buttons, eyebrow rule, numbering, hover and focus |
| `red-dark` | `#c41b20` | Primary button hover, error text |
| `navy` | `#172b3a` | Headings, dark sections (hero, CTA band), rules |
| `navy-soft` | `#24404f` | Navy button hover |
| `ink` | `#20272d` | Body text |
| `mute` | `#5f6b73` | Secondary text. Passes AA on white |
| `steel` | `#7a858d` | Decorative icons and large labels only. Not for small text |
| `mist` | `#f5f6f7` | Alternate section background |
| `line` | `#e3e6e8` | Hairlines and grid borders |

Red is an accent, never a background for long text. The logo's green appears only in the logo itself.

## Typography

- Display: **Manrope** (500–800) — headings, numbers, brand names. `font-display`.
- Text: **Inter** — everything else. `font-sans`.

Both are loaded with `next/font` in `src/app/layout.tsx`.

| Class | Size | Use |
| --- | --- | --- |
| `.text-display` | 36 → 72px | Homepage hero title |
| `.text-h1` | 34 → 60px | Page titles, CTA band |
| `.text-h2` | 28 → 44px | Section titles |
| `.text-h3` | 20 → 24px | Card titles |
| `.text-lead` | 17 → 20px | Intro paragraphs |
| `.eyebrow` | 12px, uppercase, 0.16em | Section label with a red rule before it |

Sizes are fluid (`clamp`). Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.

## Layout

- `.container-site` — max width 1320px, side padding 20 / 32 / 48px.
- `.section` — vertical padding 72 → 136px.
- 12-column grid from `lg` (1024px). Extra breakpoint `xs` at 416px.
- Header height is the `--header-h` variable (72px, 80px from `2xl`); inner pages offset by it.
- Square corners everywhere. Structure comes from hairlines and a navy top rule, not from cards and shadows.

## Components

| Component | Path | Notes |
| --- | --- | --- |
| `ButtonLink` | `components/ui/Button.tsx` | Variants `primary`, `navy`, `outline`, `outline-light`. Min height 48px |
| `.link-arrow` | `globals.css` | Text link with a red underline and an arrow that slides on hover |
| `SectionHeading` | `components/ui/SectionHeading.tsx` | Eyebrow + title + optional lead |
| `PageHero` | `components/ui/PageHero.tsx` | Inner-page header: breadcrumb (with JSON-LD), title, intro, optional photo |
| `Photo` | `components/ui/Photo.tsx` | Fills its parent with an image from `content/images.ts` |
| `SectorTile` | `components/sections/SectorTile.tsx` | Photo + numbered caption |
| `LogoMarquee` / `Brand` | `components/sections/LogoMarquee.tsx` | Client strip. `Brand` shows the logo, or the name in type when no logo exists |
| `OfficeBlocks` | `components/sections/OfficeBlocks.tsx` | The two entities, always as two separate blocks |
| `WorldMap` | `components/sections/WorldMap.tsx` | Dotted map with a single marker on Tanger Med |
| `CtaBand` | `components/sections/CtaBand.tsx` | Navy closing band on every page except Contact |
| `Header`, `Footer`, `SearchDialog` | `components/layout`, `components/search` | Header is transparent over the homepage hero, white elsewhere and after scrolling |

## Motion

Easing is `cubic-bezier(0.16, 1, 0.3, 1)` (`ease-out-expo`) throughout.

| Effect | Where | Implementation |
| --- | --- | --- |
| Fade and rise on scroll | Most blocks | `Reveal`, `RevealGroup` / `RevealItem` (staggered) |
| Masked image reveal | Feature photos | `ImageReveal` |
| Word-by-word title | Heroes | `SplitHeading` |
| Parallax | Feature photos, desktop only | `Parallax` (GSAP ScrollTrigger) |
| Hero curtain, settle and drift | Homepage | `HomeHero` |
| Page entrance | Every navigation | `app/template.tsx`, CSS only |
| Marquee | Client strip | CSS animation, pauses on hover, focus and via its button |

Reveals play once. Nothing loops except the marquee and the map marker.

## Accessibility

- `prefers-reduced-motion` is respected: Motion runs with `reducedMotion="user"`, GSAP effects are behind a media query, CSS animations are neutralised, and the marquee becomes a scrollable list.
- Visible focus ring (2px red, 3px offset) on every interactive element.
- Touch targets are at least 44px.
- Mobile menu and search dialog trap focus and close on Escape.
- Form fields have labels, inline errors announced with `role="alert"`, and a live status message.
- The duplicated marquee list is hidden from assistive technology.
