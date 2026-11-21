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
- Pages reference these through `<img>` tags in `index.html` (hero, brand strip, AC types, featured products) and `products.html` (product cards). Product cards reuse the matching `images/types/` file by AC type.

History:

- 2026-11-21 (commit `c1d4459`): replaced the inline placeholder SVGs with image files. Brands went from 4 to 6 (Daikin and Blue Star added at the owner's request) and AC types from 5 to 10. Image styles were appended to `style.css`.
- 2026-11-22: redrew the existing SVG files as richer full-frame scenes. Only the files under `images/` changed. Filenames, dimensions and aspect ratios are the same, so no HTML or CSS changes were needed. Site text, layout, brands, categories, services and contact/form code were not touched.

Notes and constraints:

- Daikin and Blue Star are placeholders. Confirm with the owner that these brands are sold, or replace them.
- To use real photos or official logos, save them under the same names in `images/` (or update the extension in the HTML). Keep each file around 1600px wide or less.
- A test Vite build (to a temporary folder) copies the referenced images into `dist/assets/` with hashed names, so no external files are needed.
- `dist/` was not rebuilt in this change and still holds the older build. Rebuilding drops `script.js` from `dist/` because the script tags lack `type="module"`; fix that before deploying from `dist/`.
- The embedded Google Map on the contact page cannot load inside the claude.ai preview (it blocks other sites' frames). It is expected to work on normal hosting.