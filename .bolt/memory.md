# Project memory

## Product intent & audience

- Static multi-page business website with four pages: Home, Products, Services, About & Contact.
- Audience and exact business domain not yet specified; appears to be a company/product showcase site.

## Brand personality & voice

- Not yet inferred from available context.

## Visual design & UX direction

- Uses SVG illustrations sized/styled via CSS.
- Styling driven by a single root-level `style.css`; interactivity via root-level `script.js`.
- Layout, colors, and visuals are CSS-dependent — broken asset paths render as unstyled HTML.

## Decisions, constraints & rationale

- Build tool: Vite; output goes to `dist/`.
- Asset files live at project root (`style.css`, `script.js`), not under `css/` or `js/` subdirectories.
- All HTML pages must reference root paths (`style.css`, `script.js`) — not `css/style.css` / `js/script.js`.
- After editing source HTML, rebuild so `dist/` copies stay in sync.
- Pages: four HTML source files (Home, Products, Services, About & Contact), each copied to `dist/` on build.

## Open questions & assumptions

- Business name, industry, and target audience still unspecified.
- Brand voice, color palette, and typography choices not yet established.
- Assuming no external images are used; visuals are SVG-based.
- Whether navigation structure or additional pages will be added later is unknown.

## Image & asset log

Current state of the image assets (all original, hand-built SVG; no `.jpg`/`.png`/`.webp` files and no external image URLs):

- `images/hero.svg` (600x450): showroom scene used in the Home hero. Wall units, two tower units on podiums, outdoor unit, window with skyline, plants, spot lighting and a floor.
- `images/types/*.svg` (400x300, 10 files): `split`, `window`, `cassette`, `tower`, `ductable`, `vrf`, `portable`, `floor-ceiling`, `multi-split`, `packaged`. Each is a full-frame scene (room, ceiling, building or house cutaway) with lighting, shadows and airflow.
- `images/brands/*.svg` (300x110, 6 files): `o-general`, `hitachi`, `haier`, `toshiba`, `daikin`, `blue-star`. Name badges with a gradient tile, wave pattern and a small AC icon. They are not official logos.
- The pages no longer reference these files. Since 2026-11-22 the scenes are inlined in the HTML: each page that shows graphics (`index.html`, `products.html`) has a hidden `<svg>` sprite right after `<body>` (between `<!-- svg-sprite -->` markers) holding one shared `<defs>` block and one `<symbol>` per scene. Cards use `<svg class="scene" viewBox="..." role="img" aria-label="..."><use href="#scene-..."/></svg>`. Product cards reuse the matching `scene-<type>` symbol by AC type. `services.html` and `about-contact.html` have no scene graphics (their icons were already inline SVG).
- The `images/` files are kept as the source for these scenes but nothing links to them.

History:

- 2026-11-21 (commit `c1d4459`): replaced the inline placeholder SVGs with image files. Brands went from 4 to 6 (Daikin and Blue Star added at the owner's request) and AC types from 5 to 10. Image styles were appended to `style.css`.
- 2026-11-22: redrew the existing SVG files as richer full-frame scenes. Only the files under `images/` changed. Filenames, dimensions and aspect ratios are the same, so no HTML or CSS changes were needed. Site text, layout, brands, categories, services and contact/form code were not touched.
- 2026-11-22 (later): replaced every `<img src="images/...">` in `index.html` (hero, 6 brand tiles, 10 AC type cards, 4 featured cards) and `products.html` (16 product cards) with inline `<svg>` that uses a per-page sprite. `style.css` had no image-file references; its image rules were changed to target `.scene` instead of `img`. Contact details, WhatsApp, map link, service cities, brand list, categories, services and the Formspree placeholder in `script.js` were left as they were.

Notes and constraints:

- Daikin and Blue Star are placeholders. Confirm with the owner that these brands are sold, or replace them.
- To use real photos or official logos, replace the relevant inline `<svg class="scene">` with an `<img>` pointing at a file in `images/` (keep each file around 1600px wide or less).
- Inline scenes rely on the `.scene` rules at the end of `style.css`. Product cards use `.prod-img .scene`, which must keep a higher specificity than the older `.prod-img svg` rule.
- Verified on 2026-11-22: all four pages load with zero `<img>` elements, no missing `<use>` targets or gradient ids, no missing local files, `style.css` and `script.js` linked by root paths on every page, and no script errors when run in a DOM (jsdom). Not tested in a real browser.
- `dist/` was not rebuilt in this change and still holds the older build. Rebuilding drops `script.js` from `dist/` because the script tags lack `type="module"`; fix that before deploying from `dist/`.
- The embedded Google Map on the contact page cannot load inside the claude.ai preview (it blocks other sites' frames). It is expected to work on normal hosting.