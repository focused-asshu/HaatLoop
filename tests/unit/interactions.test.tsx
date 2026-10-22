import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Journeys } from "@/components/sections/journeys";
import { FAQ } from "@/components/sections/faq";
import { MarketplacePreview } from "@/features/marketplace-preview/preview";
afterEach(() => vi.unstubAllGlobals());
it("moves focus into the menu, closes on Escape/navigation and returns focus", async () => {
  vi.stubGlobal("matchMedia", () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  const user = userEvent.setup();
  render(<MobileNavigation />);
  const trigger = screen.getByRole("button", { name: /menu/i });
  await user.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("link", { name: /how it works/i })).toHaveFocus();
  await user.keyboard("{Escape}");
  expect(trigger).toHaveFocus();
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  await user.click(trigger);
  await user.click(screen.getByRole("link", { name: /the preview/i }));
  expect(trigger).toHaveFocus();
  expect(trigger).toHaveAttribute("aria-expanded", "false");
});
it("journey tabs support arrows, Home and End with roving focus", async () => {
  const user = userEvent.setup();
  render(<Journeys />);
  screen.getByRole("tab", { name: "I’m a buyer" }).focus();
  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tab", { name: "I’m a vendor" })).toHaveFocus();
  expect(screen.getByRole("tabpanel")).toHaveTextContent(
    "List suitable produce.",
  );
  await user.keyboard("{Home}");
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Find a local offer.");
  await user.keyboard("{End}");
  expect(screen.getByRole("tab", { name: "I’m a vendor" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});
it("FAQ opens and closes its native disclosure", async () => {
  const user = userEvent.setup();
  render(<FAQ />);
  const summary = screen.getByText("Is it available for real orders?");
  const details = summary.closest("details");
  expect(details).not.toHaveAttribute("open");
  await user.click(summary);
  expect(details).toHaveAttribute("open");
  expect(details).toHaveTextContent("no live inventory");
  await user.click(summary);
  expect(details).not.toHaveAttribute("open");
});
it("empty search can reset all filters and restores search focus", async () => {
  const user = userEvent.setup();
  render(<MarketplacePreview />);
  const search = screen.getByRole("searchbox");
  await user.type(search, "nope");
  expect(screen.getByRole("status")).toHaveTextContent("0 demo listings");
  await user.click(screen.getByRole("button", { name: "Reset filters" }));
  expect(screen.getByRole("status")).toHaveTextContent("8 demo listings");
  expect(search).toHaveValue("");
  expect(search).toHaveFocus();
});
