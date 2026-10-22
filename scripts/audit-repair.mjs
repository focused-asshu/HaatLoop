import { chromium } from "@playwright/test";
import fs from "node:fs";
import assert from "node:assert/strict";

// Optional local QA only. Requires an existing production server on port 3100.
const browser = await chromium.launch();
const evidence = [];
try {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  const shot = async (name, locator) => {
    // Chromium can composite the translated, offscreen fixed skip link into tall
    // element captures. Hide only its unfocused state during capture, not in the app.
    await locator.screenshot({
      path: `docs/screenshots/repair-${name}.jpg`,
      quality: 80,
      style: ".skip-link:not(:focus) { visibility: hidden; }",
    });
  };
  for (const width of [360, 390, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://127.0.0.1:3100/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    for (const [name, selector] of Object.entries({
      header: ".site-header",
      problem: ".story",
      buyer: "#how",
      preview: "#preview",
      value: ".value-section",
      safety: "#safety",
      faq: "#faq",
      final: ".final-cta",
      footer: ".site-footer",
    }))
      await shot(`${name}-${width}`, page.locator(selector));
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole("button", { name: /Menu/ }).click();
    await shot(`menu-${width}`, page.locator(".site-header"));
    // The absolute menu is outside the header's box, so also capture its full viewport.
    await page.screenshot({
      path: `docs/screenshots/repair-menu-${width}.jpg`,
      quality: 80,
    });
    await page.keyboard.press("Escape");
    await page.getByRole("tab", { name: "I’m a vendor" }).click();
    await shot(`vendor-${width}`, page.locator("#how"));
    await page.getByRole("button", { name: "Fruit", exact: true }).click();
    await shot(`filtered-${width}`, page.locator("#preview"));
    await page.getByRole("searchbox").fill("tomato");
    await shot(`empty-${width}`, page.locator("#preview"));
    await page.getByRole("button", { name: "Reset filters" }).click();
    await page.getByRole("searchbox").fill("tomato");
    await shot(`search-${width}`, page.locator("#preview"));
    await page.locator("summary").first().click();
    await shot(`faq-open-${width}`, page.locator("#faq"));
    const undersized = await page
      .locator("a, button, input, select, summary")
      .evaluateAll((nodes) =>
        nodes
          .filter(
            (n) =>
              n.getClientRects().length &&
              getComputedStyle(n).visibility !== "hidden",
          )
          .filter((n) => {
            const r = n.getBoundingClientRect();
            return r.height < 44 || r.width < 44;
          })
          .map((n) => ({
            text: n.textContent.trim(),
            width: n.getBoundingClientRect().width,
            height: n.getBoundingClientRect().height,
          })),
      );
    evidence.push({ width, undersized });
  }
  for (const [width, height] of [
    [360, 900],
    [768, 900],
    [1280, 900],
    [1440, 900],
    [1920, 1080],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto("http://127.0.0.1:3100/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await shot(`hero-${width}`, page.locator(".hero"));
    if (width >= 1280) {
      const layout = await page.locator(".hero").evaluate((hero) => {
        const h1 = hero.querySelector("h1");
        const eyebrow = hero.querySelector(".eyebrow");
        return {
          lines:
            h1.getBoundingClientRect().height /
            parseFloat(getComputedStyle(h1).lineHeight),
          eyebrowLines:
            eyebrow.getBoundingClientRect().height /
            parseFloat(getComputedStyle(eyebrow).lineHeight),
          ctaBottom: hero.querySelector(".actions").getBoundingClientRect()
            .bottom,
        };
      });
      assert.ok(
        Math.abs(layout.lines - 3) < 0.1,
        `Three-line desktop headline at ${width}`,
      );
      assert.ok(layout.eyebrowLines < 1.1);
      assert.ok(layout.ctaBottom < height);
      evidence.push({ width, height, ...layout });
    }
  }
  // Render the exact sprite at both small and card sizes for a visual clipping/style audit.
  await page.evaluate(() => {
    const kinds = [
      "tomato",
      "chilli",
      "brinjal",
      "greens",
      "lemon",
      "onion",
      "potato",
    ];
    document.body.innerHTML = `<main style="padding:24px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px">${kinds.map((kind) => `<figure><figcaption>${kind}</figcaption>${[48, 135].map((size) => `<svg style="width:${size}px;height:${size}px" viewBox="0 0 160 140"><use href="/produce.svg#${kind}" /></svg>`).join("")}</figure>`).join("")}</main>`;
  });
  await page.setViewportSize({ width: 1000, height: 600 });
  await page.screenshot({
    path: "docs/screenshots/repair-produce.jpg",
    quality: 85,
  });
  fs.writeFileSync(
    "docs/repair-audit.json",
    JSON.stringify(evidence, null, 2) + "\n",
  );
  console.log(JSON.stringify(evidence, null, 2));
} finally {
  await browser.close();
}
