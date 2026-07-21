# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Phase 1 of Headless Commerce separation (WordPress / Magento POC).
- Complete Open Source documentation Wiki suite.

### Changed
- Converted monolithic Express app into decoupled routing architecture.
- Upgraded Tailwind to v4.

---

## [6.5.0] - 2026-07-21

### Added
- **Ayat Studio:** Extracted internal canvas engine into a standalone React SPA.
- **Docker Support:** Full multi-stage `Dockerfile` and `docker-compose` orchestration for local and production.
- **GitHub Actions:** CI/CD pipeline integrated for automated testing and linting.
- **Observability:** Integrated Pino for JSON structured logging and Helmet/CORS for API security.

### Removed
- Legacy static React UI components in favor of the new Ayat Studio architecture.

---

## [6.0.0] - 2026-06-15

### Added
- **Operations Command Center (OMS):** Real-time dashboard for factory routing and approval tracking.
- **AI Trend Analysis:** Gemini API integration for localized interior design trends.
- **Provider Routing:** Gelato & Sensaria API integrations.

### Fixed
- Memory leak in WebGL 3D Room Mockup generator.
