# Docker Infrastructure

Our ecosystem is "Docker-First". This document explains the container architecture.

## One-Command Startup
To start the entire platform (WordPress Shop, Ayat Studio, Core API, Database):
```bash
cd docker
docker compose up
```

## Dockerfiles
We utilize multi-stage Dockerfiles to keep production images minimal and secure.
- **Stage 1 (deps):** Installs all dependencies (including devDependencies).
- **Stage 2 (builder):** Compiles TypeScript and builds the React SPA.
- **Stage 3 (runner):** Copies only the compiled `/dist` and production `node_modules`. Runs as a non-root user.

## Docker Compose
We split compose files by environment:
- **`docker-compose.yml`**: The base definition of services, networks, and environment variables.
- **`docker-compose.dev.yml`**: Development overrides, injecting bind-mount volumes to allow live-reloading of code without rebuilding the container.
- **`docker-compose.prod.yml`**: Production overrides, setting restart policies (`always`), resource limits, and persistent volume claims for databases.

## Volumes & Networks
- **Network:** `ayat_network` (Bridge network allowing containers to resolve each other by service name, e.g., `http://api:3002`).
- **Volumes:** Database data (`wp_db_data`, `pg_data`) is mapped to named volumes to persist across container restarts.
