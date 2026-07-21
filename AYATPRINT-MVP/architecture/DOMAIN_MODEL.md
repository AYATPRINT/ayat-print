# Domain Model

This document maps the core business entities for the AyatPrint platform.

## 1. Core Art Domain
- **Artwork:** The master record of a digital design.
  - `id`, `title`, `surahId`, `arabicText`, `translationId`, `aspectRatio`, `vectorDataPath`
- **Collection:** Grouping of artworks for marketing.
  - `id`, `name`, `description`, `seoSlug`
- **Translation:** Verified textual translations.
  - `id`, `languageCode`, `text`, `tanzilVerified`

## 2. Commerce Domain
- **Product:** A sellable configuration of an Artwork.
  - `id`, `artworkId`, `materialId`, `frameId`, `sizeId`, `priceUSD`
- **Material (Substrate):**
  - `id`, `name` (e.g., Museum Canvas, Fine Art Paper), `costMultiplier`
- **Frame:**
  - `id`, `material`, `color`, `thicknessMm`, `costModifier`

## 3. Order & Fulfillment Domain
- **Order:** The customer's purchase.
  - `id`, `customerId`, `stripeChargeId`, `shippingAddress`, `status` (pending, paid, fulfilled, cancelled)
- **Print Job:** A localized manufacturing order dispatched to a POD provider.
  - `id`, `orderId`, `printPdfUrl`, `providerId`, `providerStatus`, `trackingNumber`
- **Supplier (POD Provider):**
  - `id`, `name` (e.g., Gelato, Sensaria), `regionCoverage`, `slaDays`

## 4. User Domain
- **Customer:**
  - `id`, `email`, `auth0Id`, `loyaltyTier`
- **Internal User (Operator/Admin):**
  - `id`, `email`, `role`
