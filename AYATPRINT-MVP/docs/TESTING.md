# Testing Strategy

Quality is paramount at AyatPrint. We employ a multi-layered testing strategy to ensure our generated artwork and routing logic are flawless.

## 1. Unit Tests (Vitest)
Used for testing isolated business logic (e.g., pricing calculations, POD routing algorithms).
```bash
npm run test:unit
```
*Requirement: 80% coverage on all Core API services.*

## 2. Integration Tests (Vitest & Supertest)
Used for testing API endpoints against a test PostgreSQL database.
```bash
npm run test:integration
```

## 3. E2E & Visual Regression Tests (Playwright)
Crucial for the Ayat Studio. We use Playwright to simulate user interactions (selecting frames, applying AI themes) and taking screenshots to compare against known-good baselines to prevent visual regressions in the WebGL canvas.
```bash
npm run test:e2e
```

## 4. Accessibility Testing
Automated via `eslint-plugin-jsx-a11y` during the linting phase, ensuring the UI remains navigable for all users.

## 5. Release Checklist
Before tagging a major release, the following must pass:
- [ ] GitHub Actions CI Pipeline (All Tests Green).
- [ ] Docker Build success.
- [ ] Manual Smoke Test: Process a complete order from the WordPress POC -> Studio -> Checkout -> Gelato webhook.
