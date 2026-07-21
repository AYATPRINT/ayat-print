# Installation Guide

This guide covers the manual and Docker installation processes for AyatPrint across different operating systems.

## Docker Installation (Recommended)
This is the standard approach for both Linux/macOS and Windows (via WSL2).
Please refer to the [Quickstart Guide](QUICKSTART.md) for the 4-step Docker process.

---

## Manual Installation (Development Environment)

If you need to run the applications bare-metal for deep debugging:

### Prerequisites
- Node.js (v20 LTS recommended)
- PostgreSQL (v14+)
- Redis

### 1. Database Setup
Ensure PostgreSQL is running and create the databases.
```bash
createdb ayat_core
```

### 2. Core API Setup
```bash
cd api
npm install
cp .env.example .env # Configure DATABASE_URL
npx prisma generate
npx prisma db push
npm run dev
```

### 3. Ayat Studio Setup
```bash
cd ayat-studio
npm install
npm run dev
```
The studio will run on `http://localhost:3001`.

### Windows Considerations
If running manually on Windows, we highly recommend using Git Bash or WSL2, as certain build scripts (like native Canvas rendering modules) may require Python and C++ build tools.
