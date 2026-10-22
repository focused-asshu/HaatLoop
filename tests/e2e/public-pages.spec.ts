import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { navigation, site } from "../../src/config/site";

test("all public routes: metadata, navigation, responsiveness and accessibility", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const titles = new Set<string>();
  for (const route of navigation) {
    await page.goto(route.href);
    await expect(page.locator("h1")).toHaveCount(1);
    titles.add(await page.title());
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      route.href === "/" ? site.url : `${site.url}${route.href}`,
    );
    for (const width of [320, 360, 390, 430, 768, 1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route.href} at ${width}`,
      ).toBe(true);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("button", { name: "Menu" }).click();
    const mobile = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(mobile.locator('[aria-current="page"]')).toHaveAttribute(
      "href",
      route.href,
    );
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      axe.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      ),
    ).toEqual([]);
  }
  expect(titles.size).toBe(4);
  expect(errors).toEqual([]);
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of navigation) {
      if (width === 390)
        await page.getByRole("button", { name: "Menu" }).click();
      const nav = page.getByRole("navigation", {
        name: width === 390 ? "Mobile navigation" : "Main navigation",
        exact: true,
      });
      await nav.getByRole("link", { name: route.label, exact: true }).click();
      await expect(page).toHaveURL(route.href);
      if (width === 390)
        await expect(
          page.getByRole("button", { name: "Menu" }),
        ).toHaveAttribute("aria-expanded", "false");
    }
  }
});

test("marketplace controls, native dialog, inert background and focus return", async ({
  page,
}) => {
  await page.goto("/marketplace");
  const search = page.getByRole("searchbox");
  await page.getByRole("combobox").selectOption("price-asc");
  await expect(page.locator("article h3").first()).toHaveText("Leafy greens");
  await page.getByRole("combobox").selectOption("price-desc");
  await expect(page.locator("article h3").first()).toHaveText("Lemons");
  await page.getByRole("combobox").selectOption("pickup");
  await expect(page.locator("article h3").first()).toHaveText("Spinach");
  await page.getByRole("button", { name: "Fruit", exact: true }).click();
  await search.fill("[.*<script>");
  await expect(page.getByRole("status")).toContainText("0 demo listings");
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(search).toBeFocused();
  await expect(page.locator("article")).toHaveCount(1);
  await page.getByRole("button", { name: "Reset all", exact: true }).click();
  await expect(page.locator("article")).toHaveCount(8);
  await expect(page.getByRole("combobox")).toHaveValue("featured");
  await search.fill("  TOMATO  ");
  const trigger = page.getByRole("button", {
    name: "View Tomatoes demo details",
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Tomatoes" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();
  await expect(dialog).toContainText("No real vendor or pickup address");
  expect(
    await page.locator("dialog").evaluate((d) => d.matches(":modal")),
  ).toBe(true);
  await page
    .locator("header a")
    .first()
    .evaluate((a: HTMLAnchorElement) => a.focus());
  expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(
    true,
  );
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    axe.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    ),
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("button", { name: "Close" }).click();
  await expect(trigger).toBeFocused();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});
