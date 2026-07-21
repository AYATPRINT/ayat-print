# Troubleshooting

## Docker Issues

### `port is already allocated`
**Symptom:** `docker compose up` fails stating a port (e.g., 8080 or 3000) is in use.
**Solution:** Find the process using the port (`lsof -i :8080` on Mac/Linux) and kill it, or edit `docker/docker-compose.dev.yml` to map to a different host port (e.g., `"8081:80"`).

### Volume Sync Issues (Windows/WSL)
**Symptom:** Changes to React components aren't reflecting in the browser via Hot Module Reloading.
**Solution:** Ensure your code resides inside the WSL filesystem (`\\wsl$\Ubuntu\home\...`), not the mounted Windows file system (`/mnt/c/...`), as Docker Desktop file watchers do not propagate well across the Windows/Linux boundary.

## Node & Build Issues

### `esbuild` fails on deploy
**Symptom:** CI/CD pipeline fails during the build step.
**Solution:** Ensure you aren't importing devDependencies into the production server bundle. Check the imports in `server.ts`.

## Database Issues

### Prisma migration fails
**Symptom:** `npx prisma db push` throws a connection error.
**Solution:** Verify your `DATABASE_URL` in `.env`. If running locally, ensure the `postgres` Docker container has finished initializing.

## Uploads & Images

### 3D Room Mockup generates black images
**Symptom:** The Canvas `.toDataURL()` returns a black rectangle.
**Solution:** Ensure WebGL is enabled in your browser or headless test runner (Playwright). Some Linux CI environments require `--use-gl=swiftshader`.
