# Release Process

This document outlines the steps maintainers must take to publish a new version of AyatPrint.

## 1. Preparation Checklist
- [ ] All features merged into `develop`.
- [ ] CI Pipeline is green on `develop`.
- [ ] Verify `CHANGELOG.md` is updated and categorized correctly.
- [ ] Ensure `package.json` versions are bumped.

## 2. Version Bump
We strictly adhere to Semantic Versioning.
Create a release branch:
```bash
git checkout -b release/v6.6.0
npm version minor -m "chore: bump version to %s"
```

## 3. Git Tag & GitHub Release
Merge the release branch into `main`.
Tag the commit:
```bash
git tag v6.6.0
git push origin --tags
```
Navigate to GitHub and draft a new release pointing to this tag. Copy the contents of the latest version from the `CHANGELOG.md` into the release notes.

## 4. Docker Publishing
Once the GitHub Release is published, the CI/CD pipeline will automatically trigger the `docker-build` job to build and push the new images to the container registry, tagged as `latest` and `v6.6.0`.

## 5. Deployment Verification
- Monitor the production logs via Datadog/Pino.
- Perform a manual smoke test (Order a test print on the live storefront).

## 6. Rollback
If a critical flaw is detected post-release:
1. Revert the bad commit on `main`.
2. Tag a patch release (e.g., `v6.6.1`).
3. If immediate mitigation is needed, manually downgrade the Docker image tag in the production orchestration server from `latest` to the previous stable version (e.g., `v6.5.0`).
