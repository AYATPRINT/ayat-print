# AyatPrint Design System (ADS)

## Core Philosophy
The AyatPrint Design System is built on the principles of **Luxurious Minimalism, Sacred Authenticity, and Editorial Elegance**. Every interface must feel like an exclusive art gallery.

## Typography
- **Primary Serif (Headings):** `Playfair Display` or `Cormorant Garamond`. Used for titles, collections, and editorial storytelling.
- **Primary Sans (UI & Body):** `Inter` or `Outfit`. Used for dense data (OMS), navigation, buttons, and captions.
- **Arabic Script:** Traditional scripts (Thuluth, Diwani, Naskh) strictly controlled via the FontEngine. Not to be mixed arbitrarily.

## Color System
Our palette relies on high-contrast luxury, entirely avoiding generic web colors.

### Base (The Gallery)
- **Alabaster White:** `#FAFAFA` (Backgrounds)
- **Charcoal Obsidian:** `#1C1917` (Text, Primary Buttons)
- **Warm Sand:** `#F5F5F4` (Secondary Backgrounds, Borders)

### Accents (The Art)
- **Ayat Gold:** `#C5A059` (Calls to Action, Highlights, Borders)
- **Imperial Emerald:** `#064E3B` (Success states, Premium Badges)
- **Terracotta / Amber:** `#92400E` (Warnings, Warm Accents)

## Spacing & Grid
- **Base Unit:** 4px (0.25rem).
- **Grid:** 12-column responsive grid.
- **Spacing Principle:** "Let the art breathe." Use generous whitespace (margins of 64px to 128px between major editorial sections).

## Components

### Buttons
- **Primary:** Solid Charcoal background, Alabaster text, sharp corners (0-2px border-radius), subtle scale on hover.
- **Secondary:** Transparent background, 1px solid border (Charcoal or Gold), uppercase, wide tracking (letter-spacing).

### Cards & Surfaces
- No heavy drop shadows. Use delicate 1px borders (`border-art-sand`) or very soft, diffused shadows (`shadow-sm`, opacity 5%).
- **Glassmorphism:** Used sparingly for sticky headers and overlay controls (e.g., in the Studio) to maintain context without obscuring art.

### Icons & Motion
- **Icons:** `lucide-react` with 1px or 1.5px stroke weight. Sharp, unrounded edges preferred.
- **Motion:** Cinematic and slow. Use `framer-motion`. Transitions should take 0.5s - 1.2s using `easeInOut` easing. Avoid bouncy or frantic spring animations. Fade-ins and subtle upward glides only.

## Photography & Editorial Rules
- **Rule 1:** The artwork is the hero. UI elements must never compete with the art.
- **Rule 2:** Photography must feature cinematic lighting, rich textures (marble, wood, linen), and flawless composition.
- **Rule 3:** No promotional badges (e.g., "SALE", "20% OFF") overlaying artwork.
- **Brand Voice:** Reverent, authoritative, exclusive, and poetic. 

## Theming
- **Storefront:** "Light Gallery" (Alabaster base) to allow artwork colors to pop.
- **Studio & OMS:** "Dark Room" (Charcoal base) to reduce eye strain for operators and focus attention on the canvas being edited.
