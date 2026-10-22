import { render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";
import Home from "@/app/page";
it("presents the concept and demo without transactional actions", () => {
  render(<Home />);
  const main = within(screen.getByRole("main"));
  expect(main.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Good food deserves another chance.",
  );
  expect(main.getByText("Preview with demo data — not live")).toBeVisible();
  expect(main.getAllByText("Demo", { exact: true })).toHaveLength(8);
  expect(
    main.queryByRole("button", { name: /reserve|buy|login/i }),
  ).not.toBeInTheDocument();
  expect(main.getByText(/haven’t conducted customer research/)).toBeVisible();
});
