# API Reference

This document catalogs the REST endpoints available on the Ayat Core API.

## Base URL
`https://api.ayatprint.com/v1`

## Authentication
Protected endpoints require an Auth0 JWT Bearer token.
`Authorization: Bearer <token>`

---

## 1. Designs

### `POST /designs`
Saves a customization payload from Ayat Studio.
- **Request (JSON):**
  ```json
  {
    "artworkId": "art_123",
    "material": "premium_canvas",
    "frame": "walnut_floating",
    "size": "50x70cm"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "designId": "dsn_abc890",
    "previewUrl": "https://s3.aws.com/.../preview.jpg",
    "price": 149.00
  }
  ```
- **Errors:**
  - `400 Bad Request`: Invalid payload (Zod validation failure).

---

## 2. Orders

### `POST /orders/webhook/stripe`
Receives payment confirmation from Stripe.
- **Authentication:** Requires Stripe Signature Header.
- **Response:** `200 OK`

---

## 3. System

### `GET /health`
Liveness probe.
- **Response (200 OK):**
  ```json
  { "status": "healthy", "uptime": 3600, "geminiApi": "connected" }
  ```
