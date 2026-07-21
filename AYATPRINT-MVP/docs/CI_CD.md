# CI/CD Pipeline

We utilize **GitHub Actions** for Continuous Integration and Continuous Deployment.
The workflow definition is located at `.github/workflows/ci.yml`.

## The Pipeline

On every Push and Pull Request to `main` or `develop`, the following jobs execute sequentially:

### 1. Build & Test Job
1. **Checkout:** Clones the repository.
2. **Setup Node:** Configures Node.js 20 and caches `npm` modules.
3. **Install:** Runs `npm ci`.
4. **Typecheck:** Runs `tsc --noEmit` to catch TypeScript errors.
5. **Lint:** Runs ESLint to enforce coding standards.
6. **Unit Tests:** Executes Vitest suites.
7. **Build:** Compiles the applications to ensure there are no build-time errors.

### 2. E2E Tests Job
Depends on the Build job passing.
1. Installs Playwright browsers.
2. Runs the visual regression and end-to-end user flows.

### 3. Docker Build Job
Depends on all tests passing.
1. Builds the Docker images (`ayatprint/studio` and `ayatprint/api`).
2. *(Future)* Pushes the images to a container registry (e.g., GitHub Packages or AWS ECR).

## Release & Deployment Workflow
When a Git Tag (e.g., `v6.5.0`) is pushed, a separate Release workflow triggers. This workflow runs the pipeline, drafts a GitHub Release, attaches the Changelog, and triggers a webhook to the production orchestration server to pull the new Docker images and gracefully restart the containers.
