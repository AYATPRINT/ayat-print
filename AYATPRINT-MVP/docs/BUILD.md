# Build Process

This document outlines the build pipelines for AyatPrint.

## Development Build
During development, we rely on Vite's HMR (Hot Module Replacement) and `tsx` (Node.js) for instantaneous feedback.
- **Studio:** `npm run dev` (Runs Vite)
- **API:** `npm run dev` (Runs `tsx watch`)

## Production Build
To prepare the applications for deployment, the code must be minified and bundled.

### Ayat Studio (React SPA)
```bash
cd ayat-studio
npm run build
```
*Outputs static HTML/JS/CSS assets to the `/dist` directory, optimized for CDN delivery.*

### Core API (Node.js)
```bash
cd api
npm run build
```
*Transpiles TypeScript to CommonJS via `esbuild` into the `/dist` directory.*

## Docker Build (Release)
The official release mechanism is via multi-stage Docker builds, ensuring reproducible artifacts.
```bash
docker build -t ayatprint/studio:latest ./ayat-studio
docker build -t ayatprint/api:latest ./api
```

## Versioning
We use **Semantic Versioning (SemVer)** (MAJOR.MINOR.PATCH).
- Bumping the version is handled automatically by GitHub Actions upon merging a Release PR, which tags the commit and generates the `CHANGELOG.md`.
