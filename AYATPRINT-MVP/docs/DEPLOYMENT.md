# Deployment Guide

This document outlines the deployment strategies for AyatPrint across different environments.

## Development Deployment
For local development, we exclusively use Docker Compose to ensure parity with production.
```bash
docker compose -f docker-compose.dev.yml up
```
This mounts local volumes for hot-reloading.

## Production Deployment
The production architecture is designed to run on a container orchestration platform (e.g., AWS ECS, Kubernetes, or a robust VPS via Docker Swarm).

### 1. Reverse Proxy & HTTPS
We mandate the use of a Reverse Proxy (Nginx or Traefik) in front of the application containers to handle SSL termination (via Let's Encrypt) and load balancing.
- The Node.js API should **never** be exposed directly to port 80/443.

### 2. Environment Variables
Production environments must inject secrets securely (e.g., via AWS Secrets Manager or GitHub Secrets during deployment). See `.env.example` for the required schema.

### 3. Scaling
- **Storefront (WordPress):** Can be cached heavily via Cloudflare Edge.
- **Ayat Studio:** Being an SPA, it is served statically via CDN. Infinite horizontal scaling.
- **Core API:** Designed statelessly. Scale horizontally based on CPU utilization during peak traffic.

### 4. Rollback Strategy
If a deployment fails the health checks (`/api/health`), the orchestration layer (e.g., ECS) will automatically halt the rollout and maintain the previous container version.
Manual rollback involves deploying the previously tagged Docker image.
