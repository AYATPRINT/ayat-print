# System Architecture (Vision 6.5)

## Overview
AyatPrint operates as a distributed system composed of 5 bounded contexts, communicating primarily through the `Ayat Core API`.

## 1. Luxury Commerce (Storefront)
- **Responsibility:** Marketing, catalog browsing, SEO, editorial storytelling, checkout, and customer accounts.
- **Ownership:** Growth & E-commerce Team.
- **Dependencies:** Shopify (Storefront API), Sanity CMS, Core API (for retrieving custom studio configurations).
- **Data Flow:** Reads product data from Shopify. Hands off to Shopify checkout.

## 2. Ayat Studio
- **Responsibility:** The interactive engine for creating, visualizing, and configuring Islamic wall art. Handles typography rendering, canvas layout, and 3D room simulation.
- **Ownership:** Frontend Engineering & Graphics Team.
- **Dependencies:** Core API (for saving designs), WebGL/Canvas APIs.
- **Data Flow:** Sends highly structured JSON configurations (the "Print Spec") to the Core API upon user approval.

## 3. Ayat Core API
- **Responsibility:** The brain of the operation. Handles business logic not suited for Shopify (e.g., complex POD routing, AI generation, deep validations, order processing webhooks).
- **Ownership:** Backend Engineering.
- **Dependencies:** PostgreSQL (Main Data), Redis (Caching/Queues), Gelato/Sensaria (POD Providers), Google Gemini (AI).
- **Data Flow:** Receives webhooks from Shopify upon successful payment. Queues print jobs. Routes orders to the OMS.

## 4. Operations Command Center (OMS)
- **Responsibility:** Internal dashboard for managing the factory pipeline. Provider monitoring, order triage, manual approvals, and financial analytics.
- **Ownership:** Operations & Logistics Team.
- **Dependencies:** Core API.
- **Data Flow:** Subscribes to order statuses. Pushes manual overrides and provider re-routing commands to the Core API.

## 5. PIM (Product Information Management)
- **Responsibility:** Master repository for artwork metadata. Manages Surah text, translations, licencing, frame dimensions, and pricing rules.
- **Ownership:** Content & Curation Team.
- **Dependencies:** Core API, S3 (Media Storage).
- **Data Flow:** Pushes validated catalog updates to the Core API, which syncs them downstream to Shopify and the Studio.

## Folder Structure (Logical)
The architecture dictates strict separation. In a monorepo setup:
```
apps/
  storefront/      # Shopify Headless Next.js App
  studio/          # React SPA
  oms/             # React Internal Dashboard
  pim/             # React Admin App
  api/             # Node.js Core API Services
packages/
  ui/              # Shared Design System Components
  config/          # Shared ESLint/TSConfig
  core-types/      # Shared Domain Interfaces (Order, Artwork)
```
