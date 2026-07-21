# MIGRATION PLAN: Vision 6.5

## Executive Summary
This document outlines the strategic migration of AyatPrint from a monolithic prototype (MVP) into a highly scalable, distributed enterprise platform composed of 5 distinct sub-systems. This migration will enable distinct operational ownership, scalable architecture, and longevity over the next 10 years.

## Current Architecture (MVP)
The current MVP is a single repository built on React 19, Vite, and Express, containing:
- Frontend E-commerce components
- Canvas Studio (Design Engine)
- Operations Command Center (OMS)
- Room Simulator and AI Integrations
- Mocked Data Stores

**Issues:** High coupling, large bundle sizes, conflicting operational concerns (e.g., Marketing vs. Manufacturing), and difficult independent scaling.

## Target Architecture (Vision 6.5)
The target architecture strictly decouples responsibilities into bounded contexts:
1. **Luxury Commerce (Headless CMS + E-commerce):** Pure marketing, discovery, and checkout. Recommended: Shopify Headless (Storefront API) + Sanity CMS for rich storytelling.
2. **Ayat Studio:** A standalone React SPA dedicated to canvas design, AI generation, and room simulation.
3. **Ayat Core API:** The central business logic tier (Node.js/Go) handling orders, customers, printing logic, and AI routing.
4. **Operations Command Center (OMS):** A dedicated internal enterprise app for factory routing, provider monitoring, and approvals.
5. **PIM (Product Information Management):** Master data management for artwork, translations, licenses, and materials.

## Migration Phases

### Phase 1: Preparation & Decoupling (Months 1-2)
- **Action:** Extract the Canvas Studio and Room Mockup components from the storefront into a separate package (`@ayatprint/studio`).
- **Action:** Establish the Ayat Core API as a standalone service with a PostgreSQL database. 
- **Risk:** High refactoring effort. 
- **Rollback:** Retain the MVP monolith in production while the new API is built and tested in parallel.

### Phase 2: Core API & PIM Implementation (Months 3-4)
- **Action:** Migrate mocked data (Artwork, Materials, Collections) to the new PostgreSQL database via the new PIM interface.
- **Action:** Implement secure authentication (Auth0) across the new Core API.

### Phase 3: Operations Command Center (Months 5-6)
- **Action:** Build the standalone OMS dashboard connecting to the Core API.
- **Action:** Migrate existing POD routing logic (Gelato/Sensaria) to the Core API.

### Phase 4: Headless E-commerce Migration (Months 7-8)
- **Action:** Launch the Shopify Headless storefront using a modern framework (e.g., Next.js).
- **Action:** Integrate the standalone Ayat Studio via iframe or web component into the Shopify product pages.

### Phase 5: Cutover & Sunsetting (Month 9)
- **Action:** Perform data sync. Switch DNS.
- **Rollback:** Instant DNS rollback to the legacy MVP if critical failures occur in checkout or order routing.

## Dependencies & Breaking Changes
- **Dependencies:** Auth0 (Identity), PostgreSQL (Data), Shopify (Commerce Engine), Stripe (Payments), S3 (Storage).
- **Breaking Changes:** User sessions from the MVP will not migrate seamlessly. A password reset or silent migration strategy will be required upon transitioning to Auth0.
