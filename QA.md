# Executed local Chromium checks

- 1440×900: five sorted links, rejected invalid URL/draft, decoded title, no horizontal overflow, mode toggle, refresh, no uncaught page errors — PASS
- 390×844: five sorted links, rejected invalid URL/draft, decoded title, no horizontal overflow, mode toggle, refresh, no uncaught page errors — PASS
- 320×740: five sorted links, rejected invalid URL/draft, decoded title, no horizontal overflow, mode toggle, refresh, no uncaught page errors — PASS
- 873×393: five sorted links, rejected invalid URL/draft, decoded title, no horizontal overflow, mode toggle, refresh, no uncaught page errors — PASS
- Offline snapshot / simulated image failures / reduced motion — PASS
- Monitor click initiates zoom and points to expected article — PASS (external navigation not tested)

Browser navigation was blocked by administrator policy, so HTML, CSS and JS were injected into a local browser document with a mocked fetch. Actual WordPress API/CORS, real image delivery, Three.js module/WebGL rendering, real navigation, on-device performance and GitHub Pages deployment were not verified. Screenshot shows the offline fallback, not live artwork.
