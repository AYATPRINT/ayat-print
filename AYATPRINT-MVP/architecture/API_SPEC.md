# Ayat Core API Specification

## Base URL
`https://api.ayatprint.com/v1`

## Authentication
All protected endpoints require a Bearer token issued by Auth0 in the `Authorization` header.

---

## 1. Orders API

### `POST /orders/webhook/stripe`
Handles successful payment events from Stripe.
- **Request:** Stripe Event Payload.
- **Response:** `200 OK` (Acknowledged).
- **Action:** Validates signature, creates internal `Order`, and queues `Print Job` generation.

### `GET /orders` (OMS Access)
Retrieves a paginated list of all orders.
- **Query Params:** `status`, `page`, `limit`.
- **Response:**
  ```json
  {
    "data": [
      {
        "id": "ord_123",
        "customer": "tariq@example.com",
        "total": 199.00,
        "status": "in_production"
      }
    ],
    "meta": { "totalCount": 1420 }
  }
  ```

---

## 2. Print & POD Routing API

### `POST /print-jobs/route` (Internal)
Forces the routing engine to select a provider for a given order.
- **Request Payload:**
  ```json
  {
    "orderId": "ord_123",
    "overrideProviderId": null 
  }
  ```
- **Response:**
  ```json
  {
    "jobId": "job_456",
    "selectedProvider": "gelato",
    "estimatedCost": 24.50,
    "routingReason": "Lowest SLA for AE destination"
  }
  ```

---

## 3. Studio & AI API

### `POST /ai/typography-check`
Analyzes a canvas configuration to ensure no sacred text is cut off by bleed margins.
- **Request:** Canvas state (dimensions, font size, padding).
- **Response:** 
  ```json
  {
    "isSafe": true,
    "score": 98,
    "recommendations": []
  }
  ```
