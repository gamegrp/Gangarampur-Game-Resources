# Gangarampur Ka Ladka — PUBLIC resource repository

This repository is **public**. Put *only* redistributable game data here: `resources/audio/*.mp3`, `resources/models/*.glb`, `resources/maps/*.json`, `resources/textures/*.png`, etc.

Never publish game source, secrets, user saves, Firebase service-account JSON, or GitHub tokens. Only publish assets you own or have a licence to distribute. Per-file limit here is 90 MiB; very large files need separate storage/CDN.

## Automatic publishing
The private game repo's `publish-resources.yml` copies allowlisted files from its `game-resources/` directory and commits a verified manifest here. The private repo needs an Actions secret `RESOURCE_REPO_TOKEN` with **Contents: Read and write** limited to this public repo. If publishing directly to this repository, run **Actions → Update resource manifest** after uploading files to ensure an up-to-date manifest. A plain `git push` also runs it.

Manifest: https://raw.githubusercontent.com/gamegrp/Gangarampur-Game-Resources/main/manifest.json

Resource URL: `https://raw.githubusercontent.com/gamegrp/Gangarampur-Game-Resources/main/resources/` + manifest file ID.

The game's updater checks SHA-256 before caching and applying files. New names by themselves do not define gameplay: e.g., to play new audio add a matching audio trigger configuration; to replace existing game GLB use its existing model name. Adding completely new 3D placement or mechanics requires a compatible game loader/update.

**Important:** This package is source for a repository, not a claim that files have already been uploaded to GitHub.
