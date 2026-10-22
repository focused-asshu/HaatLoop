import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import { MarketplacePreview } from "@/features/marketplace-preview/preview";
import { SiteHeader } from "@/components/layout/site-header";

afterEach(() => vi.restoreAllMocks());

it("marks the current route in the header", () => {
  render(<SiteHeader currentPath="/for-vendors" />);
  expect(screen.getByRole("link", { name: "For vendors" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
    "aria-current",
  );
});

it("clears only search, then resets category and price sorting together", async () => {
  const user = userEvent.setup();
  render(<MarketplacePreview standalone />);
  await user.selectOptions(screen.getByRole("combobox"), "price-desc");
  await user.click(screen.getByRole("button", { name: "Fruit" }));
  await user.type(screen.getByRole("searchbox"), "tomato");
  expect(screen.getByRole("status")).toHaveTextContent("0 demo listings");
  await user.click(screen.getByRole("button", { name: "Clear search" }));
  expect(screen.getByRole("status")).toHaveTextContent("1 demo listing");
  expect(screen.getByRole("combobox")).toHaveValue("price-desc");
  await user.click(screen.getByRole("button", { name: "Reset all" }));
  expect(screen.getByRole("status")).toHaveTextContent("8 demo listings");
  expect(screen.getByRole("combobox")).toHaveValue("featured");
  expect(screen.getByRole("searchbox")).toHaveFocus();
});

it("opens demo details with initial focus and restores the trigger on native close", async () => {
  // jsdom does not implement the modal top layer. Browser tests exercise real Escape/inertness.
  vi.spyOn(HTMLDialogElement.prototype, "showModal").mockImplementation(
    function (this: HTMLDialogElement) {
      this.open = true;
    },
  );
  vi.spyOn(HTMLDialogElement.prototype, "close").mockImplementation(function (
    this: HTMLDialogElement,
  ) {
    this.open = false;
    fireEvent(this, new Event("close"));
  });
  const user = userEvent.setup();
  render(<MarketplacePreview standalone />);
  const trigger = screen.getByRole("button", {
    name: "View Tomatoes demo details",
  });
  await user.click(trigger);
  expect(screen.getByRole("dialog", { name: "Tomatoes" })).toHaveTextContent(
    "Nothing can be reserved or paid for here",
  );
  expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
  await user.click(screen.getByRole("button", { name: "Close" }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});
