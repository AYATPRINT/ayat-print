# Security Policy

## Supported Versions

Only the current major release receives active security updates.

| Version | Supported          |
| ------- | ------------------ |
| 6.x.x   | :white_check_mark: |
| 5.x.x   | :x:                |
| 4.x.x   | :x:                |

## Reporting a Vulnerability
We take the security of AyatPrint extremely seriously. 

If you discover a security vulnerability within AyatPrint, please **DO NOT** open a public issue. Instead, send an email to `security@ayatprint.com`.
We will respond within 48 hours to coordinate a fix and responsible disclosure.

### What to Include
- A description of the vulnerability.
- Steps to reproduce (including specific browsers or environments).
- Potential impact (e.g., XSS in Ayat Studio, bypassing Auth0).

## Dependency Updates
We utilize Dependabot to ensure all critical packages (Next.js, React, Express, Zod) are patched against known CVEs automatically. Merging these bumps is a P0 priority for maintainers.

## Secrets Management
- **Never** commit `.env` files or secrets (AWS keys, Stripe keys, Gemini keys) to the repository.
- Use the `.env.example` file strictly as a structural template.
- The CI/CD pipeline is configured to scan for exposed secrets before allowing a merge to `main`.
