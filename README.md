# HaatLoop

Fresh finds. Fairer prices. Less waste.

An unvalidated idea for a hyperlocal produce-rescue marketplace in Odisha, India, being developed for Innov-a-thon 2026, NIT Rourkela. Phase 0 contains only a repository foundation and an honest early-development screen. No research or commercial outcomes are claimed.

## Run locally

Use Node **24.22.1** (`.nvmrc`) and npm. The repository enforces Node 24 to match the test tooling. With nvm installed, run `nvm install 24.22.1` and `nvm use 24.22.1`.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No environment values are needed; `.env.example` is intentionally a comment only.

## Quality gates

```sh
npm run check
npx playwright install chromium
npm run test:e2e
```

`check` runs typecheck → lint → format:check → test → build and stops at the first failure. E2E uses the production build on port 3100, with Chromium at 360px and 1280px. Run `build` (or `check`) before E2E. CI installs Chromium with its Linux system dependencies.

| Script         | Purpose                                           |
| -------------- | ------------------------------------------------- |
| `dev`          | Next development server                           |
| `build`        | Production build                                  |
| `start`        | Serve an existing production build                |
| `lint`         | ESLint; warnings fail                             |
| `typecheck`    | Generate Next route types, then strict TypeScript |
| `format`       | Apply Prettier and Tailwind class ordering        |
| `format:check` | Check formatting without changing files           |
| `test`         | Run Vitest once; missing tests fail               |
| `test:e2e`     | Production Chromium smoke test at both widths     |
| `check`        | Sequential local/CI quality gate                  |

## Project guide

- [Product hypothesis](docs/PRODUCT.md)
- [Architecture and future backend requirements](docs/ARCHITECTURE.md)
- [Design tokens and contrast](docs/DESIGN_SYSTEM.md)
- [Roadmap](docs/ROADMAP.md)
- [Decisions](docs/DECISIONS.md)
- [Verified project status](docs/PROJECT_STATUS.md)
- [Empty research templates](docs/RESEARCH.md)

Do not add invented listings, customer evidence, impact figures, or fake functionality. Phase 1 has not started.
