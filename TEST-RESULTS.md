# Validation notes (2026-11-07)

- `node tools/build-manifest.mjs` PASS on empty starter resources (0 files, deterministic hash).
- Action workflow source prepared. Cross-repo push NOT tested; requires private repo secret RESOURCE_REPO_TOKEN and source deployed to both repos.
- Source code / executable files are excluded from publication by allowlist; publishing is deliberate data-only.
- Starter public resource archive includes no MP3/GLB binaries. Upload licensed assets to enable content delivery.
