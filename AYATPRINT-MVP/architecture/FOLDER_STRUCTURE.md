# Target Folder Structure (Monorepo)

The future state of AyatPrint will utilize a modern monorepo tool (e.g., Turborepo or Nx) to manage the distributed systems efficiently while sharing core types and UI components.

```text
ayatprint-platform/
├── apps/
│   ├── storefront/             # Next.js Headless Shopify App
│   │   ├── src/app/
│   │   └── package.json
│   ├── studio/                 # React SPA (Canvas Engine)
│   │   ├── src/components/
│   │   └── package.json
│   ├── oms/                    # React SPA (Operations Command Center)
│   │   ├── src/pages/
│   │   └── package.json
│   ├── pim/                    # React SPA (Master Data Management)
│   │   ├── src/pages/
│   │   └── package.json
│   └── api/                    # Node.js Core Business Logic API
│       ├── src/
│       │   ├── controllers/
│       │   ├── services/
│       │   ├── models/
│       │   └── routes/
│       └── package.json
├── packages/
│   ├── ui/                     # Shared Design System (Buttons, Cards)
│   │   ├── src/
│   │   └── package.json
│   ├── core-types/             # Shared TypeScript Interfaces (Order, Artwork)
│   │   ├── src/index.ts
│   │   └── package.json
│   ├── eslint-config/          # Shared linting rules
│   └── tsconfig/               # Shared TS base configurations
├── .github/
│   └── workflows/
│       └── ci.yml
├── package.json
└── turbo.json                  # Monorepo build orchestration
```
