import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { site } from "../../src/config/site";

test("homepage, anchors, metadata and custom 404", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto("/");
  await expect(page).toHaveTitle(site.title);
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    site.url,
  );
  for (const id of ["how", "preview", "safety", "faq"]) {
    await page.locator(`footer a[href="#${id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
  const links = await page
    .locator('a[href^="#"]')
    .evaluateAll((elements) => elements.map((e) => e.getAttribute("href")));
  for (const href of links) {
    expect(href).not.toBeNull();
    await expect(page.locator(href ?? "#main")).toHaveCount(1);
  }
  expect(errors).toEqual([]);
  const missing = await page.goto("/not-a-real-page");
  expect(missing?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Return to HaatLoop" }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/");
});

test("keyboard menu, journey and FAQ", async ({ page }) => {
  await page.goto("/");
  if (await page.getByRole("button", { name: /Menu/ }).isVisible()) {
    const trigger = page.getByRole("button", { name: /Menu/ });
    await trigger.click();
    const nav = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(page.locator(".header-cta")).toBeHidden();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(nav.getByRole("link").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(nav).toBeHidden();
    await expect(trigger).toBeFocused();
    await trigger.click();
    await nav.getByRole("link", { name: /The preview/ }).click();
    await expect(nav).toBeHidden();
  }
  await page.getByRole("tab", { name: "I’m a buyer" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tabpanel")).toContainText(
    "List suitable produce.",
  );
  await page.keyboard.press("Home");
  await expect(page.getByRole("tabpanel")).toContainText("Find a local offer.");
  const summary = page
    .locator("summary")
    .filter({ hasText: "Is it available for real orders?" });
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(summary.locator("..")).toHaveAttribute("open", "");
  await page.keyboard.press("Space");
  await expect(summary.locator("..")).not.toHaveAttribute("open", "");
});

test("preview filters, search, sort and reset genuinely operate on demo data", async ({
  page,
}) => {
  await page.goto("/");
  const preview = page.locator("#preview");
  await preview.getByRole("button", { name: "Fruit", exact: true }).click();
  await expect(preview.locator("article")).toHaveCount(1);
  await expect(preview.locator("article h3")).toHaveText("Lemons");
  await preview.getByRole("searchbox").fill("tomato");
  await expect(preview.getByRole("status")).toContainText("0 demo listings");
  await preview.getByRole("button", { name: "Reset filters" }).click();
  await expect(preview.locator("article")).toHaveCount(8);
  await preview.getByRole("combobox").selectOption("pickup");
  await expect(preview.locator("article h3").first()).toHaveText("Spinach");
  await preview.getByRole("searchbox").fill("  TOMATO  ");
  await expect(preview.locator("article h3")).toHaveText("Tomatoes");
});

test("responsive layout and reduced motion", async ({ page }) => {
  await page.goto("/");
  for (const width of [320, 360, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}`,
    ).toBe(true);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page.getByRole("tab", { name: "I’m a vendor" }).click();
  await expect(page.getByRole("tabpanel")).toBeVisible();
});

test("axe finds no serious or critical issues in default and interactive states", async ({
  page,
}) => {
  await page.goto("/");
  const scan = async () => {
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      result.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      ),
    ).toEqual([]);
  };
  await scan();
  if (await page.getByRole("button", { name: /Menu/ }).isVisible()) {
    await page.getByRole("button", { name: /Menu/ }).click();
    await scan();
    await page.keyboard.press("Escape");
  }
  await page.getByRole("tab", { name: "I’m a vendor" }).click();
  await page.getByRole("searchbox").fill("unmatched");
  await scan();
});
