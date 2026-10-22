import { expect, test } from "@playwright/test";

test("foundation home and custom not-found work at the configured viewport", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await expect(page).toHaveTitle("HaatLoop | Early development");
  await expect(page.getByRole("main")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "HaatLoop", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Early development", { exact: true }),
  ).toBeVisible();
  expect(await page.locator("html").getAttribute("lang")).toBe("en");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("home.png"),
    fullPage: true,
  });
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("main")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Return to HaatLoop" }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/");
});
