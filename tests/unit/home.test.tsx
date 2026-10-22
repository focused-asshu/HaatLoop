import { render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";
import Home from "@/app/page";

it("explains the idea and its early status without offering marketplace actions", () => {
  render(<Home />);
  const main = within(screen.getByRole("main"));
  expect(
    main.getByRole("heading", { name: "HaatLoop", level: 1 }),
  ).toBeVisible();
  expect(
    main.getByText("Fresh finds. Fairer prices. Less waste."),
  ).toBeVisible();
  expect(main.getByText("Early development")).toBeVisible();
  expect(main.getByText(/idea is unvalidated/)).toBeVisible();
  expect(main.queryByRole("button")).not.toBeInTheDocument();
  expect(main.queryByRole("link")).not.toBeInTheDocument();
});
