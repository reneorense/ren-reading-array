# REN Afterhours Reading Array 2.2 — category-balanced cover flow

Static, zero-cost, responsive article gallery. CSS perspective monitors and optional Three.js WebGL decorative geometry. The actual articles remain accessible HTML links, not textures on WebGL meshes. Live feed uses the public WordPress.com REST API; four representative links form a dated fallback. No API keys or credentials.

## Deploy
Create a public repository `ren-reading-array` in your GitHub account. Upload the contents of this directory (not the enclosing directory). In Settings > Pages select Deploy from a branch, `main`, `/ (root)`, Save. Test the resulting URL before linking from WordPress. WordPress Free does not normally allow arbitrary JavaScript or iframe embedding; keep the native Query Loop on the homepage and link to this separate prototype unless a supported native integration is verified. This package does not change WordPress.

## Dependencies
Three.js r180 / npm 0.180.0, including RoundedBoxGeometry, MIT: https://github.com/mrdoob/three.js/tree/r180. Version-pinned jsDelivr ES module imports; no paid assets. The optional WebGL background is deliberately progressive enhancement. See THIRD-PARTY-LICENSE.txt. Existing WordPress images are linked, not redistributed as open-source assets.

## Verification
Run `python -m http.server 8000` here, then visit `http://localhost:8000`. The local browser test uses mocked fixture data and simulated image failures (network unavailable). It does not certify live API CORS, actual external images, WebGL dependency loading, device GPU performance, or deployment. See QA.md for executed results. Preview is noindex to avoid competing with WordPress in search.

## 2.1 interaction
Manual circular carousel, drag and touch swipe, side tap to select, center tap to open, arrow and dot controls, keyboard navigation, and flat list fallback. No auto-advance. The carousel uses CSS 3D transforms and optional Three.js decoration. See QA.md for current local checks. The older test_browser.py targets 2.0; its assertions about grid layout and reduced-motion transform are not current.

## 2.2 selection
Discover all ren-*-lab categories; select the newest unique public story per populated Lab. On API failure retain last successful edition or dated snapshot. WordPress refreshes hourly, GitHub on page load or Refresh, so temporary differences are possible. No new dependencies.
