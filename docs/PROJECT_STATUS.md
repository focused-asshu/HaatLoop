# Project status — Phase 1A repair

Verified locally on 2026-10-22 (Asia/Calcutta), starting from clean main at 31d3c31077b7284c8330594eb9486ebd76a1243f. This is a targeted Phase 1A design repair. Phase 1B has not started. Changes are local and uncommitted; no deployment was performed.

## Defects fixed

| Before                                                                                    | After                                                                                                                                  |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Skewed, uneven awning paths; 104% width overhung the panel and obscured the marigold arch | Six equal-width alternating green/ivory stripes with true semicircular scallops; 84% width centered inside the complete arch           |
| Two generic slogans inside the illustration                                               | Awning slogan removed; price ticket reads “Tomatoes / Demo · ₹40 / kg”, with the existing non-live illustration caption retained       |
| Desktop eyebrow constrained to 42ch and awkwardly wrapped                                 | Compact size/tracking, wrapping only between location and concept status; one line at tested desktop widths ≥1024px                    |
| Oversized headline and underline across the wrapped phrase                                | Smaller hero-specific clamps; three desktop lines; one underline only on “another”; both CTAs above the fold at 1440×900 and 1920×1080 |
| Square panel base and loose tagline                                                       | Rounded lower corners, counter line, and full-width ruled hero footer for the tagline                                                  |
| Hero primary CTA suggested an external link                                               | Down arrow for its #how anchor; secondary preview arrow remains neutral/right                                                          |
| Same misleading arrows in header, open mobile menu and final CTA                          | Header/menu arrows point down; final CTAs point up to earlier sections                                                                 |
| Tablet illustration caption shrank to 0.55rem                                             | 0.65rem caption, consistent with mobile and readable inside the base                                                                   |

Tokens, fonts, logo, all seven produce symbols, demo fixtures, labels and existing functional behavior remain intact. No routes, dependencies, live-stock implications, claims or reserve controls were added. Only existing E2E checks were extended for the changed hero/anchor behavior.

## Whole-page review and remaining limits

Actually inspected production-build screenshots at 360, 390 and 768px: header, open menu, problem diagram, both journey tabs, preview default/filter/search/empty, value, safety, FAQ closed/open, final CTA and footer. Inspected hero captures at 360/768/1280/1920px and all produce drawings at 48px/135px. No additional clipping, inconsistent colors/radii/shadows, layout defects or low-contrast text were found. Existing section layouts were retained.

Rendered visible control boxes at the three mobile/tablet widths were at least 44×44px. This measures element boxes, not browser-native subcontrols. Full accessibility conformance and real-device/browser coverage are not established by this Chromium review.

One screenshot-only artifact was diagnosed: Chromium composited the unfocused, translated offscreen fixed skip link into tall element screenshots. Its actual viewport rectangle was above the screen (bottom −21.76px), and a normal viewport screenshot confirmed no visible intrusion. The capture helper suppresses only the unfocused skip link during element captures; application behavior was not changed to fix a screenshot artifact.

The pre-existing ≲120 kB JavaScript target remains unmet; reducing framework weight is outside this focused repair. No other observed product defect was left unresolved. The earlier development-only tooling advisory is historical context below; this pass re-ran the requested production audit only.

## Verification commands

Run with the documented portable Node 24.22.1 runtime. The first five commands below executed through npm run check; each completed successfully.

| Command / check                 | Result  | Evidence                                                                                             |
| ------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| npm run typecheck               | PASS    | Next route types and TypeScript                                                                      |
| npm run lint                    | PASS    | Zero warnings                                                                                        |
| npm run format:check            | PASS    | Prettier; checked again after documentation updates                                                  |
| npm run test                    | PASS    | 4 files, 14 tests                                                                                    |
| npm run build                   | PASS    | Static homepage, existing 404 and metadata endpoints                                                 |
| npm run test:e2e                | PASS    | 10 tests across mobile/desktop projects                                                              |
| npm run check                   | PASS    | Complete sequential quality gate                                                                     |
| npm audit --omit=dev            | PASS    | 0 vulnerabilities                                                                                    |
| node scripts/audit-repair.mjs   | PASS    | Section/state images, target sizes, headline and fold measurements                                   |
| node scripts/verify-visuals.mjs | PASS    | Five-width axe, screenshots, script-size and no-JS checks                                            |
| Nine-width overflow check       | PASS    | 320, 360, 390, 430, 768, 1024, 1280, 1440, 1920px                                                    |
| Axe                             | PASS    | Zero selected WCAG A/AA violations at 360/390/768/1280/1920; E2E also scans menu/vendor/empty states |
| Lighthouse mobile               | PASS    | Local production lab run, details below                                                              |
| Hosted CI for local repair      | NOT RUN | Repair is uncommitted/unpushed                                                                       |

At 1280px the headline measures 3 lines and CTA bottom 652.81px. At 1440×900 it ends at 666.03px; at 1920×1080 it ends at 666.55px. Eyebrow measures one line. See repair-audit.json.

## Performance

Next 16.4.2 build output contains no First Load JS column: **build-output First Load JS is NOT AVAILABLE**. The actual initial external script responses measured from the production browser total **473,797 bytes raw / 142,080 bytes gzip (138.75 KiB)**, exactly unchanged from the pre-repair measurement. This is a reproducible gzip estimate, not actual wire compression. Inline script/serialized payload is 21,497 bytes raw / 5,110 bytes independently gzipped (+13 gzip bytes). The shared sprite is unchanged at 2,697 bytes. The repair does not meaningfully increase initial JavaScript.

Lighthouse 13.5.0, mobile simulation against localhost, 2026-10-22T10:16:35.826Z: **Performance 100 / Accessibility 100 / Best Practices 100 / SEO 100**. FCP 0.946s, LCP 1.846s, TBT 54.5ms, CLS 0, Speed Index 0.946s; no warnings. One lab run, not field or hosted Vercel measurements. Full transient report: test-results/lighthouse.json; durable summary: docs/lighthouse-summary.json. Existing Lighthouse tooling was invoked from its cache without adding a repo dependency.

## Screenshot evidence

All paths below are relative to the repository. These images were generated from the repaired production build and visually inspected.

- docs/screenshots/repair-hero-360.jpg
- docs/screenshots/repair-hero-768.jpg
- docs/screenshots/repair-hero-1280.jpg
- docs/screenshots/repair-hero-1440.jpg
- docs/screenshots/repair-hero-1920.jpg
- docs/screenshots/repair-header-360.jpg and repair-menu-360.jpg
- docs/screenshots/repair-problem-360.jpg
- docs/screenshots/repair-buyer-360.jpg and repair-vendor-360.jpg
- docs/screenshots/repair-preview-360.jpg, repair-filtered-360.jpg, repair-search-360.jpg, repair-empty-360.jpg
- docs/screenshots/repair-value-360.jpg and repair-safety-360.jpg
- docs/screenshots/repair-faq-360.jpg and repair-faq-open-360.jpg
- docs/screenshots/repair-final-360.jpg and repair-footer-360.jpg
- Matching section/state files with -390.jpg and -768.jpg suffixes
- docs/screenshots/repair-produce.jpg (seven symbols at two sizes)
- docs/screenshots/repair-preview-viewport-360.jpg (normal viewport diagnostic)
- Refreshed home/hero/menu/filter captures from verify-visuals.mjs are also retained.

## Why scripts/ exists

scripts/verify-visuals.mjs is the existing optional developer QA utility; scripts/audit-repair.mjs adds repeatable coverage for this repair. scripts/README.md documents exact use and limitations. They use already-installed Playwright/axe plus Node built-ins, launch a temporary browser against localhost, and overwrite only screenshot/metric evidence under docs/. The produce sheet temporarily changes a QA browser DOM, never source or app data. They do not deploy, install packages, access credentials or send data externally.

They are safe to retain for repeatable visual review, but **not required by the application, build, deployment or CI**. They add no client JavaScript. Stop the manually started server before test:e2e, which starts its own server.

## Observed GitHub Actions status

GitHub's Actions API was queried for the current committed HEAD, 31d3c31077b7284c8330594eb9486ebd76a1243f. Its CI run was observed as completed/success: https://github.com/focused-asshu/HaatLoop/actions/runs/39758924754. This confirms the existing committed baseline only. It does not claim hosted verification of the uncommitted repair.

---

## Archived implementation report — before this repair

The following is retained as historical Phase 1A implementation evidence. Its measurements and local/uncommitted/hosted-status statements describe that earlier pass; the repair report above supersedes them.

Verified locally on 2026-10-22 (Asia/Calcutta). Phase 1A implementation is delivered with a disclosed JavaScript-budget exception and the pre-existing development-tooling advisory. Phase 1B has not started and is not approved by this report. No live deployment was performed or claimed.

### Starting point and scope

Started at 038ab5475dbd6b73f2c234047bbb5368e35d9737, on main, with a clean working tree tracking origin/main. Retained Next 16.4.2, React 19.3.1, Tailwind 4.3.3, TypeScript 6.0.3, Node 24.22.1, npm 11.19.1, strict typing, INR utility, test tooling and custom 404. History and remotes were not changed. The founder clarified that Phase 1A should be completed fully, with the master brief informing design basics; extra public pages remain deferred.

Baseline npm ci and npm run check passed after stopping the previous dev server, which held a Windows native-library lock. An npm ls attempt during reinstall saw a transient incomplete tree; subsequent final npm ls is clean. Existing research templates are byte-for-byte unchanged.

### Implemented routes and behavior

- /: complete brand/homepage, desktop anchor navigation, accessible mobile menu, buyer/vendor journey tabs, eight labeled demo listings, category/search/pickup-end sorting, empty/reset state, principles, FAQ and footer.
- Existing not-found UI: real HTTP 404, functional home link with a 44px minimum target.
- /icon.svg, /robots.txt, /sitemap.xml: metadata assets/endpoints; canonical https://haatloop.vercel.app, title template and description. No invented OG image or structured claims.

No auth, live stock, real reservation, payment processing, geolocation, personal-data collection, analytics, waitlist, database, or supporting product routes. Demo times are same-day HH:mm examples without a real date; distances and prices are invented, not local observations. All cards display Demo and Demo stall. No reserve/buy action exists.

### Phase 0 repairs

CI already had npm caching and Chromium system-dependency installation. Added a 15-minute timeout, then parsed/asserted the local YAML and step order. Hosted CI was NOT RUN. Inventory documentation now separates held and sold quantity, derives available/sold_out/expiry, and preserves terminal reservation transitions. No inventory code was implemented.

Known audit: GHSA-vfj7-8cjw-p6xm (high) in braces → micromatch → fast-glob → Next ESLint tooling. Upstream was checked once; braces latest remains 3.0.3. npm proposes an incompatible Next lint-config downgrade. No force, downgrade or peer override was applied. Exposure is development tooling processing malicious glob patterns, not a production dependency. Keep untrusted patterns out of tooling; revisit the upstream fix later. ESLint 9 remains upstream-deprecated but peer-compatible with the installed Next lint stack.

### Executed verification

Commands use the portable Node 24 runtime documented in README/DECISIONS, not the machine-wide Node 20 shim. The check script invokes each listed quality command sequentially and fails on the first error.

| Exact command / check                                                                                                                        | Result  | Evidence                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| npm ci                                                                                                                                       | PASS    | Final lockfile installed 449 packages; advisory remains disclosed                                               |
| npm run typecheck                                                                                                                            | PASS    | Generated route types and strict tsc                                                                            |
| npm run lint                                                                                                                                 | PASS    | Zero errors/warnings; no suppressions                                                                           |
| npm run format:check                                                                                                                         | PASS    | Prettier/Tailwind formatting checked                                                                            |
| npm run test                                                                                                                                 | PASS    | 14 tests in 4 files: utility, fixture/filter integrity, navigation, menu focus/Escape, journey keys, FAQ, reset |
| npm run build                                                                                                                                | PASS    | Root, not-found and metadata assets prerender successfully                                                      |
| npm run test:e2e                                                                                                                             | PASS    | 10 tests across Chromium 360px/1280px projects                                                                  |
| npm run check                                                                                                                                | PASS    | Complete typecheck → lint → format:check → test → build chain                                                   |
| npm audit --omit=dev                                                                                                                         | PASS    | Zero production vulnerabilities                                                                                 |
| npm audit                                                                                                                                    | FAIL    | Five high findings in the single known dev-tooling dependency chain                                             |
| npm ls --depth=0                                                                                                                             | PASS    | Direct dependencies resolve without invalid peers                                                               |
| node scripts/verify-visuals.mjs                                                                                                              | PASS    | Screenshots, requested-script gzip sizes, SVG weights, no-JS content and axe scans                              |
| npx --yes lighthouse http://127.0.0.1:3100 --port=9222 --hostname=127.0.0.1 --output=json --output-path=test-results/lighthouse.json --quiet | PASS    | Local simulated mobile run via Playwright-launched Chromium debugging port                                      |
| CI YAML review/assertions                                                                                                                    | PASS    | push/PR, Node pin, npm cache, timeout and Chromium --with-deps verified                                         |
| Hosted CI / Vercel deployment                                                                                                                | NOT RUN | No push or deployment performed                                                                                 |

The initial Lighthouse Chrome launcher failed with spawn UNKNOWN; connecting to Chromium launched by Playwright resolved it. Development test iterations caught and fixed plain home anchors, a test helper type error, formatting changes, and the screenshot runner’s required explicit browser context. The final menu regression test also asserts the desktop CTA is hidden and the open menu does not overflow.

### Accessibility and responsive evidence

Playwright verifies 320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920px without horizontal overflow. Tests cover anchors, metadata, custom 404, menu entry/Escape/return focus, keyboard tabs, native FAQ Enter/Space, filtering/search/sort/reset, reduced motion and console/page errors. Axe scans default and interactive states with no serious/critical findings. Separate final scans at 360/768/1280 returned zero violations across the selected WCAG A/AA tags.

Manual keyboard reasoning: the menu is non-modal and does not trap Tab; focus moves into it on open and returns on Escape/navigation; tabbing away dismisses it. Tabs use a single tab stop with arrows/Home/End. Search/select/chips use native controls. FAQ uses native details/summary. The screenshot audit confirmed readable wrapping, focus targets and section composition. This is not a claim of a full screen-reader or WCAG conformance audit.

Used text contrast ranges from 5.38:1 to 14.32:1. Used boundary contrast ranges from 3.51:1 to 4.26:1; focus pairs exceed 3:1. Exact pairs are in DESIGN_SYSTEM and verification.json. A no-JavaScript browser check confirmed the headline and all eight cards remain visible; filters require JavaScript.

### Measured performance — target exception

Next 16.4.2's build output does not print a First Load JS column, so that build-output metric is NOT AVAILABLE, not invented. The repeatable browser measurement captures actual initial script responses from the local production page, gzips each decoded body and sums their sizes. It is a comparable estimate, not a claim of actual HTTP wire compression.

- External initial JavaScript: **1,42,080 bytes gzip (138.75 KiB)**, 4,73,797 bytes uncompressed.
- Inline script/serialized payload: 21,135 bytes raw; 5,097 bytes when independently gzipped. Inline payload normally compresses as part of HTML; do not treat this isolated estimate as measured wire bytes.
- The ≲120 kB total JavaScript target is **NOT MET**. The original measurement was 142,790 external gzip bytes; a static SVG sprite and plain in-page logo anchors reduced it to 142,080 bytes. The two largest shared framework chunks account for 118,336 gzip bytes. No animation library or runtime dependency was added. Further reduction requires deliberate framework/client-boundary work; it is not silently waived or pursued through a major rewrite.
- Inline SVG on the default page: 3067 bytes; shared produce sprite: 2697 bytes. No raster image is served by the app. Compressed JPEG screenshots exist only as documentation artifacts.
- Lighthouse 13.5.0, simulated mobile, final local run: performance 96, accessibility 100, best practices 100, SEO 100. FCP 0.95s; LCP 2.48s; TBT 155ms; CLS 0. No run warnings. These are one machine’s lab numbers, not field Core Web Vitals or the live Vercel site. An earlier run was 97 performance; final measured run is reported rather than the best run.

### Screenshots actually inspected

Saved under docs/screenshots: home-360.jpg, home-768.jpg, home-1280.jpg, hero-360.jpg, hero-768.jpg, hero-1280.jpg, mobile-menu.jpg and preview-filtered.jpg. Full-page captures use 900px viewport height; the menu uses 360×800. The three hero captures provide readable detail alongside tall full-page shots. Total saved size is modest (under 2 MB).

Fixed visible defects: mobile illustration caption overlap, produce hidden too far behind the basket, and a CSS-specificity regression exposing the desktop CTA on mobile. Re-captured and inspected after repair. Screenshot generation resets navigation between widths so axe’s focus probing does not leave a skip link visible in the default-page capture. No clipping/overflow defect remains observed in the checked layouts. Long mobile scrolling is intentional because all eight examples are shown; future pagination would need a separate product decision.

### Acceptance verdict and handoff

Met locally: original identity and fonts/tokens; complete homepage and honest demo; working navigation/menu/tabs/filters/FAQ; original SVGs; strict TypeScript and preserved architecture; passing required engineering tests except the disclosed full audit; inspected screenshots and responsive/a11y evidence. **Unmet target: initial JavaScript size.** Unverified: hosted CI, live deployment, real-device/assistive-technology coverage and all product hypotheses. This report does not claim an unconditional all-criteria PASS.

Phase 1B may reuse the Logo, shell, section components, tokens, fixture presentation and tests only after founder approval. Keep demo labels and no-transaction constraints, resolve remaining operational policies before backend development, and retain the documented quantity invariants. No Phase 1B or later approval is granted here.

### File change inventory

Modified tracked files:

- .github/workflows/ci.yml
- README.md
- docs/ARCHITECTURE.md
- docs/DECISIONS.md
- docs/DESIGN_SYSTEM.md
- docs/PRODUCT.md
- docs/PROJECT_STATUS.md
- docs/ROADMAP.md
- package-lock.json
- package.json
- src/app/globals.css
- src/app/layout.tsx
- src/app/not-found.tsx
- src/app/page.tsx
- tests/e2e/smoke.spec.ts
- tests/unit/home.test.tsx

Added files:

- docs/lighthouse-summary.json
- docs/screenshots/hero-1280.jpg
- docs/screenshots/hero-360.jpg
- docs/screenshots/hero-768.jpg
- docs/screenshots/home-1280.jpg
- docs/screenshots/home-360.jpg
- docs/screenshots/home-768.jpg
- docs/screenshots/mobile-menu.jpg
- docs/screenshots/preview-filtered.jpg
- docs/verification.json
- public/produce.svg
- scripts/verify-visuals.mjs
- src/app/icon.svg
- src/app/robots.ts
- src/app/sitemap.ts
- src/components/brand/logo.tsx
- src/components/brand/market-art.tsx
- src/components/brand/produce.tsx
- src/components/layout/mobile-navigation.tsx
- src/components/layout/site-footer.tsx
- src/components/layout/site-header.tsx
- src/components/sections/faq.tsx
- src/components/sections/final-cta.tsx
- src/components/sections/hero.tsx
- src/components/sections/journeys.tsx
- src/components/sections/story.tsx
- src/components/sections/value-safety.tsx
- src/config/site.ts
- src/features/marketplace-preview/data.ts
- src/features/marketplace-preview/filter.ts
- src/features/marketplace-preview/preview.tsx
- src/features/marketplace-preview/types.ts
- src/styles/content.css
- src/styles/foundation.css
- src/styles/hero.css
- src/styles/journey.css
- src/styles/preview.css
- src/styles/responsive.css
- src/styles/shell.css
- tests/unit/interactions.test.tsx
- tests/unit/preview.test.ts

No files deleted. Changes remain local and uncommitted for review.
