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