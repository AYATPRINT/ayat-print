# 🎨 AyatStudio - L'alternative Open Source à Canva

[![GitHub stars](https://img.shields.io/github/stars/ayatprint/ayat-studio?style=social)](https://github.com/ayatprint/ayat-studio)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![pnpm workspace](https://img.shields.io/badge/pnpm-monorepo-orange.svg)](pnpm-workspace.yaml)

> *AyatStudio est un moteur de design canvas open-source, conçu pour la création d'art islamique et de posters, avec un routage POD (Print on Demand). 100% open-source, construit avec React, Fabric.js et Node.js.*

---

## 📸 Captures d'Écran & Démo

Live Demo: [https://ayatstudio.dev](https://ayatstudio.dev)

![Editor Screenshot]([SCREENSHOT_EDITOR])
*Éditeur Canvas Fabric.js haute performance avec typographies arabes vectorielles.*

![Mockup Engine Screenshot]([SCREENSHOT_MOCKUP])
*Prévisualisation 3D en temps réel dans des décors d'intérieur luxueux (Salon Marocain, Majlis de Dubaï).*

---

## ⚡ Démarrage Rapide (en 3 minutes)

```bash
git clone https://github.com/ayatprint/ayat-studio.git
cd ayat-studio
pnpm install && pnpm dev
```

---

## 📁 Architecture du Projet (pnpm Monorepo)

```text
ayat-studio/
├── apps/
│   ├── studio/          # Frontend React 18+ SPA (Vite + TailwindCSS + Fabric.js)
│   └── api/             # Backend API (Node.js + Express + Prisma ORM)
├── packages/
│   ├── ui/              # Composants UI React partagés
│   ├── studio-core/     # Moteur canvas Fabric.js & miniatures Konva.js
│   ├── mockup-engine/   # Générateur de mockups d'intérieur 3D
│   ├── backend/         # Couche ORM & base de données PostgreSQL
│   └── types/           # Interfaces & schémas TypeScript
├── docker-compose.yml   # Infrastructure microservices containerisée
├── pnpm-workspace.yaml  # Configuration du monorepo pnpm
└── LICENSE              # Licence AGPL-3.0
```

---

## 🛠️ Stack Technique

- **Frontend** : React 18+, TypeScript, Vite, TailwindCSS
- **Moteur Canvas** : Fabric.js (Éditeur lourd) & Konva.js (Miniatures ultra-rapides)
- **Backend** : Node.js, Express, Prisma ORM
- **Base de Données** : PostgreSQL
- **Orchestration** : pnpm Workspaces & Docker Compose

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez notre guide [CONTRIBUTING.md](CONTRIBUTING.md) pour démarrer.

---

## 📄 Licence

Licence sous [GNU Affero General Public License v3.0 (AGPL-3.0)](LICENSE).
