import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
import { gzipSync } from "node:zlib";
import assert from "node:assert/strict";

// Run after npm run build, with npm run start -- --port 3100 in another terminal.
const browser = await chromium.launch();
try {
  fs.mkdirSync("docs/screenshots", { recursive: true });
  const screenshotContext = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await screenshotContext.newPage();
  const scripts = new Map();
  const pending = [];
  page.on("response", (response) => {
    if (response.request().resourceType() === "script") {
      pending.push(
        response.body().then((body) =>
          scripts.set(new URL(response.url()).pathname, {
            raw: body.length,
            gzip: gzipSync(body).length,
          }),
        ),
      );
    }
  });
  await page.goto("http://127.0.0.1:3100/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await Promise.all(pending);
  const chunks = [...scripts.values()];
  const inlineScript = await page
    .locator("script:not([src])")
    .allTextContents();
  const inlineScriptText = inlineScript.join("\n");
  const javascript = {
    raw: chunks.reduce((n, c) => n + c.raw, 0),
    gzip: chunks.reduce((n, c) => n + c.gzip, 0),
    inlineRaw: Buffer.byteLength(inlineScriptText),
    inlineGzip: gzipSync(inlineScriptText).length,
    chunks: Object.fromEntries(scripts),
  };
  const inlineSvgBytes = await page
    .locator("svg")
    .evaluateAll((nodes) =>
      nodes.reduce(
        (n, svg) => n + new TextEncoder().encode(svg.outerHTML).length,
        0,
      ),
    );
  const axeResults = [];
  for (const width of [360, 390, 768, 1280, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://127.0.0.1:3100/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `docs/screenshots/home-${width}.jpg`,
      type: "jpeg",
      quality: 78,
      fullPage: true,
    });
    await page.locator(".hero").screenshot({
      path: `docs/screenshots/hero-${width}.jpg`,
      type: "jpeg",
      quality: 82,
    });
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    axeResults.push({
      width,
      violations: result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.length,
      })),
    });
  }
  await page.setViewportSize({ width: 360, height: 800 });
  await page.getByRole("button", { name: /Menu/ }).click();
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    "Mobile menu must not overflow",
  );
  await page.screenshot({
    path: "docs/screenshots/mobile-menu.jpg",
    type: "jpeg",
    quality: 80,
  });
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.getByRole("button", { name: "Fruit", exact: true }).click();
  await page.locator("#preview").screenshot({
    path: "docs/screenshots/preview-filtered.jpg",
    type: "jpeg",
    quality: 80,
  });
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 360, height: 800 },
  });
  const nojs = await context.newPage();
  await nojs.goto("http://127.0.0.1:3100/");
  const noJsContent =
    (await nojs.locator("h1").isVisible()) &&
    (await nojs.locator("#preview article").count()) === 8;
  const colors = {
    ivory: "F7F4EA",
    white: "FFFFFF",
    elevated: "EDE9DC",
    charcoal: "202D27",
    green: "164B35",
    muted: "536157",
    yellow: "F6BA49",
    border: "747D75",
    hover: "103B29",
  };
  const luminance = (hex) => {
    const c = hex
      .match(/../g)
      .map((x) => parseInt(x, 16) / 255)
      .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
    return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
  };
  const pairs = [
    ["charcoal", "ivory"],
    ["charcoal", "white"],
    ["charcoal", "elevated"],
    ["charcoal", "yellow"],
    ["green", "ivory"],
    ["green", "white"],
    ["green", "yellow"],
    ["muted", "ivory"],
    ["muted", "white"],
    ["muted", "elevated"],
    ["ivory", "green"],
    ["yellow", "green"],
    ["ivory", "hover"],
    ["border", "ivory"],
    ["border", "white"],
    ["border", "elevated"],
    ["green", "elevated"],
  ];
  const contrast = Object.fromEntries(
    pairs.map(([a, b]) => {
      const x = luminance(colors[a]),
        y = luminance(colors[b]);
      return [
        `${a}/${b}`,
        Number(((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(2)),
      ];
    }),
  );
  const report = {
    measuredAt: new Date().toISOString(),
    environment:
      "Local production build, Windows, Chromium; not deployed or field data",
    javascript,
    inlineSvgBytes,
    spriteBytes: fs.statSync("public/produce.svg").size,
    axeResults,
    noJsContent,
    contrast,
  };
  fs.writeFileSync(
    "docs/verification.json",
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
