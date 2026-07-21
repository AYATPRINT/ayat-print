# AyatPrint Quickstart Guide

Get the complete AyatPrint Headless Commerce & Print Job Platform up and running in under 5 minutes using Docker.

---

## 1. Prerequisites
- Docker Engine & Docker Compose (v2+)
- Git

---

## 2. Quick Launch

To build and start all microservices (WordPress, WooCommerce, MySQL, Core API, Ayat Studio SPA, and phpMyAdmin):

```bash
docker compose up --build
```

*(Alternatively, run `docker compose up` from inside the `/docker` folder)*

---

## 3. Microservice Endpoints

| Service | Local URL | Role |
| :--- | :--- | :--- |
| **WordPress Storefront** | [http://localhost:8080](http://localhost:8080) | E-commerce Storefront (WooCommerce) |
| **Ayat Studio SPA** | [http://localhost:5173](http://localhost:5173) | Headless Artwork Customizer |
| **Core Orchestration API** | [http://localhost:3002](http://localhost:3002) | Designs & Print Job Lifecycle API |
| **phpMyAdmin** | [http://localhost:8081](http://localhost:8081) | Database Management |

---

## 4. End-to-End POC Verification Flow

Follow this exact 10-step verification to demonstrate the headless commerce pipeline:

1. **Start Platform**: Run `docker compose up`.
2. **Open Storefront**: Navigate to `http://localhost:8080`.
3. **Browse Product**: Click on the featured product (*Surah An-Nas - Premium Framed Canvas*).
4. **Launch Customizer**: Click the **Customize in Ayat Studio** button. You will be redirected to Ayat Studio SPA (`http://localhost:5173/?mode=headless&product_id=...`).
5. **Personalize Artwork**: Select frame (e.g. Walnut), material (e.g. Premium Canvas), and size (e.g. 80x120cm).
6. **Finish Design**: Click **Finish Design & Add to Cart**.
7. **Automated Return**: Studio posts design parameters to `/api/designs` and returns to WordPress (`http://localhost:8080/?ayat-return=1&design_id=...`).
8. **Cart Verification**: The custom design with selected options and dynamic price calculation will appear in your WooCommerce cart.
9. **Checkout**: Proceed through WooCommerce checkout and complete the order.
10. **Print Job Creation**: WooCommerce triggers a webhook to `http://api:3002/api/print-jobs`, creating a formal Print Job linked to the `design_id`.

---

## 5. Checking System Health

Verify API status:
```bash
curl http://localhost:3002/api/health
```

List active print jobs:
```bash
curl http://localhost:3002/api/print-jobs
```
