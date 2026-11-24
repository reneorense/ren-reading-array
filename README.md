# REN Afterhours Reading Array 2.0 — prototype

Static, zero-cost, responsive article gallery. CSS perspective monitors and optional Three.js WebGL decorative geometry. The actual articles remain accessible HTML links, not textures on WebGL meshes. Live feed uses the public WordPress.com REST API; five verified article links are included as an explicitly dated fallback snapshot. The Scrib snapshot has a neutral placeholder because the media filename returned by WordPress appears to belong to a different tool; editorial review is needed. No API keys or credentials.

## Deploy
Create a public repository `ren-reading-array` in your GitHub account. Upload the contents of this directory (not the enclosing directory). In Settings > Pages select Deploy from a branch, `main`, `/ (root)`, Save. Test the resulting URL before linking from WordPress. WordPress Free does not normally allow arbitrary JavaScript or iframe embedding; keep the native Query Loop on the homepage and link to this separate prototype unless a supported native integration is verified. This package does not change WordPress.

## Dependencies
Three.js r180 / npm 0.180.0, including RoundedBoxGeometry, MIT: https://github.com/mrdoob/three.js/tree/r180. Version-pinned jsDelivr ES module imports; no paid assets. The optional WebGL background is deliberately progressive enhancement. See THIRD-PARTY-LICENSE.txt. Existing WordPress images are linked, not redistributed as open-source assets.

## Verification
Run `python -m http.server 8000` here, then visit `http://localhost:8000`. The local browser test uses mocked fixture data and simulated image failures (network unavailable). It does not certify live API CORS, actual external images, WebGL dependency loading, device GPU performance, or deployment. See QA.md for executed results. Preview is noindex to avoid competing with WordPress in search.
