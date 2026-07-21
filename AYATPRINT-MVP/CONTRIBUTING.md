# Contributing to AyatStudio

Thank you for considering contributing to **AyatStudio**! We are building an open-source alternative to Canva & Printful for Islamic art and print-on-demand customizers.

---

## 🛠️ Development Setup

We use `pnpm` for monorepo workspace management.

1. **Clone & Install Dependencies**:
   ```bash
   git clone https://github.com/ayatprint/ayat-studio.git
   cd ayat-studio
   pnpm install
   ```

2. **Environment Variables**:
   ```bash
   cp .env.example .env
   ```

3. **Start Development Servers**:
   ```bash
   pnpm dev
   ```

---

## 📝 Commit Convention

We enforce [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation changes
- `style:` Formatting, missing semi colons, etc.
- `refactor:` Code restructuring without functional changes
- `test:` Adding or updating tests
- `chore:` Maintenance tasks or package updates

Example:
```bash
git commit -m "feat(studio-core): add gold inset frame generator to Fabric canvas"
```

---

## 🧪 Running Tests

*Note: Automated unit tests and end-to-end tests are currently being expanded. You can run available linter checks via:*

```bash
pnpm lint
```

---

## 🔀 Pull Request Process

1. Fork the repository and create your branch from `main`.
2. Ensure your code passes all linting rules (`pnpm lint`).
3. Push to your fork and submit a Pull Request targeting `main`.
4. Provide a clear description of your changes and reference any related issues.
