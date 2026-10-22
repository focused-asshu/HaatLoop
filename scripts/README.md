# Optional local visual QA

This folder contains developer utilities, not application code. It is not required to build, start, deploy or run the repository's CI. Keep it to reproduce the visual and performance evidence; no new package dependencies are needed.

With the repository's supported Node runtime, first run `npm run build` and then `npm run start -- --hostname 127.0.0.1 --port 3100` in a separate terminal. Run these utilities sequentially:

```sh
node scripts/audit-repair.mjs
node scripts/verify-visuals.mjs
```

- `audit-repair.mjs` uses the already installed Playwright Chromium to capture every section and requested interactive state at 360/390/768px, plus hero widths through 1920px. It measures rendered control boxes, checks desktop headline lines/eyebrow/fold position, and renders the exact produce sprite at 48px and 135px. It writes `docs/repair-audit.json` and `docs/screenshots/repair-*.jpg`.
- `verify-visuals.mjs` uses existing Playwright and axe dependencies to capture full pages/hero/menu/filter states, scan WCAG A/AA tags, check no-JS content, calculate token contrast and measure initial script bodies with Node's gzip. It writes `docs/verification.json` and screenshots. Its compression figures are estimates from actual decoded responses, not HTTP wire sizes or Next's build-output First Load JS metric.

Both launch a temporary browser, visit only the local server, and close the browser on completion. They overwrite their own documentation evidence. They do not deploy, change app data, access credentials, install packages or send messages. Their browser-only DOM changes are confined to the produce contact sheet and screenshot capture. Chromium incorrectly composites an offscreen fixed skip link into some tall element captures; the repair capture hides only the unfocused skip link while taking those images. A normal viewport capture confirmed it remains offscreen, and keyboard behavior is covered by the app tests.

The test runner starts its own server on port 3100; stop the manual server before `npm run test:e2e`. These utilities supplement tests and require actual image inspection; generating screenshots alone is not a visual review.
