# Technical Specification (Vision 6.5)

## 1. Frontend Architecture
- **Framework:** Next.js (Storefront) & React 19 SPA (Ayat Studio / OMS / PIM).
- **Styling:** TailwindCSS v4 with strict adherence to `DESIGN_SYSTEM.md`.
- **State Management:** Zustand (for complex client-side Studio state) and React Query (for API data fetching).
- **Animation:** Framer Motion for cinematic UI transitions.

## 2. Backend Architecture
- **Core API:** Node.js using Express or Fastify for maximum throughput.
- **Language:** TypeScript with strict type checking.
- **Validation:** Zod for all API boundaries and environment variables.
- **Architecture Pattern:** Domain-Driven Design (DDD) with clear separation of Controllers, Services, and Repositories.

## 3. Storage & Database
- **Primary Database:** PostgreSQL (managed, e.g., AWS RDS or Supabase).
- **ORM:** Prisma or Drizzle ORM for type-safe database access.
- **Object Storage:** AWS S3 (or Cloudflare R2) for storing generated PDF print files and high-res imagery.

## 4. Authentication & Security
- **Provider:** Auth0 for robust B2B and B2C identity management.
- **Authorization:** Role-Based Access Control (RBAC). 
  - `admin`: Full access to PIM and OMS.
  - `operator`: Access to OMS only.
  - `customer`: Access to Storefront account.
- **API Security:** Helmet, CORS strict origins, Rate Limiting (Redis-backed).

## 5. Third-Party Integrations
- **Payments:** Stripe API (Webhooks processed securely by Core API).
- **Fulfillment (POD):** Gelato API & Sensaria API.
- **AI Engine:** Google Gemini API for Trend Analysis and Typography Inspection.

## 6. Infrastructure & Deployment
- **Containerization:** Docker multi-stage builds.
- **Orchestration:** Kubernetes or AWS ECS for the Core API to handle spike traffic during Eid/Ramadan.
- **CI/CD:** GitHub Actions (Lint -> Test -> Build -> Deploy).
- **CDN:** Cloudflare for edge caching of heavy visual assets.
