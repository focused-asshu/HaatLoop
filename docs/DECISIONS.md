# Decisions

## ADR 001 — stack (2026-10-22)

Accepted: current stable Next.js App Router, React, TypeScript, and Tailwind CSS with `src/` and `@/*`. Alternative: a client-only React app or an older framework major. The selected stack supports future server-side boundaries and metadata, at the cost of framework conventions. Strict TypeScript and unchecked-index protection are mandatory. ESLint runs separately because Next 16 builds do not perform linting.

Compatibility exception: use the latest ESLint 9 release because Next's React and JSX accessibility plugins declare peer support only through ESLint 9. Choosing the newer ESLint major generated peer conflicts; no peer override or lint-rule suppression is used.

Use TypeScript 6.0.3 because the current typescript-eslint peer range is `>=4.8.4 <6.1.0`; the registry's newer TypeScript 7 is not supported by that parser. ESLint 9 is upstream-deprecated; revisit these compatibility pins when Next's plugins support the newer majors.

## ADR 002 — npm and runtime (2026-10-22)

Accepted: npm and its committed lockfile; Node 24.22.1 LTS pinned in `.nvmrc` and consumed by CI. Alternatives: pnpm/yarn, or retaining the installed Node 20.18.0. No prior package manager existed; npm minimizes setup changes. Current Vitest requires a newer runtime, so Node 20 cannot be retained for this toolchain. A checksum-verified portable Node was installed outside the repository for local verification; the machine-wide installation was not modified. The engine guard makes a runtime mismatch explicit.

## ADR 003 — defer Supabase (2026-10-22)

Accepted: document future Supabase responsibilities only. Alternative: preinstall SDKs and scaffold schema/auth now. Deferral prevents unused dependencies and premature data/ownership decisions, while requiring explicit backend work later. No backend integration is implemented.

## ADR 004 — defer fonts (2026-10-22)

Accepted: system fonts in Phase 0. Alternatives: bundled or remotely fetched brand fonts. This avoids network/build dependencies and premature visual decisions; rendering varies slightly across operating systems. Font selection belongs to Phase 1.

## ADR 005 — simplified states (2026-10-22)

Accepted: preserve exactly the supplied state machines and terminal-state rule. Alternative: add reopening, payment, or intermediate pickup states now. Simplicity helps discussion but does not resolve stock restoration or expiry/no-show races. ARCHITECTURE records those issues for a decision before implementation.

## ADR 006 — foundation scope and verification (2026-10-22)

Accepted: one static root page, custom not-found, exported integer-paise utility, unit/page tests, and production Chromium smoke tests at two widths. Alternative: a full marketing homepage or simulated marketplace. The foundation avoids false functionality and invented evidence. Blank future directories use `.gitkeep` rather than unused abstractions. History and remote configuration are preserved; the existing `.gitattributes` auto-detection rule is extended with `eol=lf` for consistent Windows checkouts. A new local foundation commit is added without pushing.

## Tooling references

- [Next installation](https://nextjs.org/docs/app/getting-started/installation): current installation and separate lint requirements.
- [Next Vitest guide](https://nextjs.org/docs/app/guides/testing/vitest): synchronous component testing; async server components need a different strategy.
- [Vitest guide](https://vitest.dev/guide/): current runtime/tooling requirements.
- [Tailwind Next integration](https://tailwindcss.com/docs/installation/framework-guides/nextjs): v4 PostCSS setup.
- [Playwright web server](https://playwright.dev/docs/test-webserver): managed production server for smoke tests.

Exact dependency versions are in `package.json` and `package-lock.json`; verification runtime and results are in PROJECT_STATUS.

## ADR 007 — Phase 1A scope (2026-10-22)

The founder clarified that Phase 1A should be completed in full, using the master Phase 1 brief for basic direction. Only the homepage and existing not-found product route are in scope. Supporting pages, extra routes, Motion, auth and backend behavior remain deferred. The alternative was the full master brief; its extra routes would exceed the narrower approved phase.

## ADR 008 — inventory availability (2026-10-22)

Supersedes ADR 005: store draft/active/withdrawn only; derive sold_out from zero availability and expiry from pickup-window end. Separate held from completed quantities. Cancelled/expired/no_show holds release stock. Preserve the reservation terminal transitions. This avoids making temporary reservation exhaustion irreversible. See ARCHITECTURE for invariants and remaining policies. Documentation only.

## ADR 009 — brand, fonts and interaction (2026-10-22)

Fraunces and Instrument Sans exist in the installed next/font/google catalog. Use variable normal styles, latin subset, display swap, and Next fallback adjustment/self-hosting. Supersedes ADR 004 for Phase 1A. Odia will use Noto Sans Oriya only when actual Odia content exists. Original inline geometric SVGs avoid stock-image licensing, raster downloads and layout uncertainty. No motion library or reveal hook: all content is immediately visible, with CSS hover/press feedback only. Native details avoids extra accordion JavaScript.

## ADR 010 — tools and remaining audit (2026-10-22)

No runtime dependencies added. Add only @axe-core/playwright for real browser accessibility scans and @testing-library/user-event for keyboard/focus tests. CI already caches npm; add a 15-minute job timeout and retain Chromium --with-deps installation. Hosted CI is not inferred from local results. The known GHSA-vfj7-8cjw-p6xm chain was rechecked once: braces latest remains 3.0.3, no compatible fix. No force operation, major downgrade or rule suppression applied.
