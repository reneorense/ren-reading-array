# Executed local Chromium checks

- 1440×900: five sorted links, rejected invalid URL/draft, decoded title, no horizontal overflow, mode toggle, refresh, no uncaught page errors — PASS
- 390×844: five sorted links, rejected invalid URL/draft, decoded title, no horizontal overflow, mode toggle, refresh, no uncaught page errors — PASS
- 320×740: five sorted links, rejected invalid URL/draft, decoded title, no horizontal overflow, mode toggle, refresh, no uncaught page errors — PASS
- 873×393: five sorted links, rejected invalid URL/draft, decoded title, no horizontal overflow, mode toggle, refresh, no uncaught page errors — PASS
- Offline snapshot / simulated image failures / reduced motion — PASS
- Monitor click initiates zoom and points to expected article — PASS (external navigation not tested)

Browser navigation was blocked by administrator policy, so HTML, CSS and JS were injected into a local browser document with a mocked fetch. Actual WordPress API/CORS, real image delivery, Three.js module/WebGL rendering, real navigation, on-device performance and GitHub Pages deployment were not verified. Screenshot shows the offline fallback, not live artwork.

# Version 2.1 cover flow regression checks

Local Chromium, offline snapshot: 1440×900, 390×844, 320×740 and 873×393 — PASS: five items, arrow navigation, circular wraparound, dot selection, keyboard navigation, mouse drag, flat mode, no horizontal overflow, no uncaught JS errors. Simulated touchscreen at 390×844 — PASS: horizontal swipe, neighboring monitor tap, selected article zoom initiation with correct destination. A touch pointer-capture bug was found, fixed, and retested. Network, live artwork, external navigation, actual WebGL, Safari and physical-device behavior remain unverified. Prior 2.0 results above are historical, not 2.1 certification.

## 2.2 selection tests
Five mocked JavaScript API tests passed: current representative IDs, expansion, duplicate pagination, excluded posts, failed feed rejection. Live API/CORS and new-version browser tests remain unverified. Historical tests above are for earlier versions.
