# Development Guide

Welcome to the AyatPrint engineering team! This guide explains our conventions and workflows.

## 1. Project Structure
We utilize a Monorepo pattern (turborepo) for logical separation:
- `/api`: The Node.js core business logic.
- `/ayat-studio`: The React Single Page Application for canvas editing.
- `/poc`: Architectural experiments (e.g., WordPress headless shop).
- `/docker`: Global orchestration.

## 2. Coding Standards
- **TypeScript:** Strict mode is enabled. No explicit `any`.
- **Formatting:** Prettier is enforced. Run `npm run format`.
- **Linting:** ESLint rules are strictly enforced. Run `npm run lint`.
- **Validation:** All external inputs (API payloads, ENV variables) must be validated using `Zod`.

## 3. Branching & Commits
- We use the GitFlow model (`develop` -> `main`).
- Commit messages must follow Conventional Commits (e.g., `feat(studio): add new frame color`).

## 4. How to Add a Feature (Example)
1. Branch off `develop`: `git checkout -b feat/my-new-feature`
2. Write your feature code (e.g., in `/ayat-studio/src/components`).
3. Write unit tests (Vitest) in the adjacent `__tests__` folder.
4. Run `npm run test` and `npm run lint`.
5. Push to GitHub and open a Pull Request against `develop`.

## 5. How to Debug
- **VS Code:** Use the provided `.vscode/launch.json` to attach a debugger to the API or Studio processes.
- **Docker:** If running via Docker Compose, use `docker logs -f ayat_studio` to tail output. The API uses `pino-http`, producing clean JSON logs.
