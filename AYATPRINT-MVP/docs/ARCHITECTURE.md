# AyatPrint System Architecture

## Overview
AyatPrint is an enterprise-grade luxury e-commerce and operations platform designed specifically for premium Islamic art and canvas prints.

## Core Stack
- **Frontend:** React 19, Vite, TailwindCSS (v4), Framer Motion
- **Backend:** Node.js, Express (Modular Architecture)
- **AI Integrations:** Google Gemini via `@google/genai`
- **Validation:** Zod
- **Observability:** Pino, Pino-Http

## System Components
1. **Storefront:** The consumer-facing gallery experience (Marketplace, Room Mockups).
2. **Operations Command Center (OMS):** Real-time internal dashboard for order routing, provider health, and AI trend generation.
3. **Canvas Studio:** A sophisticated design tool allowing users to preview materials, verses, frames, and DPI requirements before purchasing.

## Data Flow (Future State)
Currently, AyatPrint utilizes high-fidelity mock data and in-memory stores for orders (`IN_MEMORY_ORDERS`). 
In production, the backend will interface with:
- **Relational Database** (PostgreSQL) for user data, orders, and products.
- **Redis Cache** for session state and rate limiting.
- **S3-compatible Object Storage** for storing generated high-res print packages (PDF/TIF).
