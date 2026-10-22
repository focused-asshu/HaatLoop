import { describe, expect, it } from "vitest";
import { demoListings } from "@/features/marketplace-preview/data";
import { filterListings } from "@/features/marketplace-preview/filter";
import { navigation } from "@/config/site";
describe("demo discovery", () => {
  it("combines trimmed case-insensitive search and category", () => {
    expect(
      filterListings(demoListings, "  TOMATO  ", "Vegetables", "featured").map(
        (x) => x.id,
      ),
    ).toEqual(["demo-tomato"]);
    expect(filterListings(demoListings, "tomato", "Fruit", "featured")).toEqual(
      [],
    );
    expect(
      filterListings(demoListings, "nothing matches", "All produce", "pickup"),
    ).toEqual([]);
  });
  it("sorts by sample pickup end without mutating fixtures", () => {
    const original = demoListings.map((x) => x.id);
    const result = filterListings(demoListings, "", "All produce", "pickup");
    expect(result[0]?.name).toBe("Spinach");
    expect(result.map((x) => x.pickupEnd)).toEqual(
      result.map((x) => x.pickupEnd).toSorted(),
    );
    expect(demoListings.map((x) => x.id)).toEqual(original);
  });
  it("keeps fixtures explicitly demo, unique, positive, and same-day", () => {
    expect(demoListings.length).toBeGreaterThanOrEqual(8);
    expect(new Set(demoListings.map((x) => x.id)).size).toBe(
      demoListings.length,
    );
    for (const item of demoListings) {
      expect(item.demo).toBe(true);
      expect(item.vendor).toBe("Demo stall");
      expect(item.quantity).toBeGreaterThan(0);
      expect(item.pricePaise).toBeGreaterThan(0);
      expect(Number.isSafeInteger(item.pricePaise)).toBe(true);
      expect(item.pickupEnd > item.pickupStart).toBe(true);
    }
  });
  it("limits primary navigation to the four public routes", () => {
    expect(navigation.map((x) => x.href)).toEqual([
      "/",
      "/how-it-works",
      "/for-vendors",
      "/marketplace",
    ]);
    expect(new Set(navigation.map((x) => x.label)).size).toBe(
      navigation.length,
    );
  });
  it("sorts illustrative prices in both directions without mutating source", () => {
    const before = structuredClone(demoListings);
    for (const sort of ["price-asc", "price-desc"] as const) {
      const result = filterListings(demoListings, "", "All produce", sort);
      const prices = result.map((item) => item.pricePaise);
      expect(prices).toEqual(
        [...prices].sort((a, b) => (sort === "price-asc" ? a - b : b - a)),
      );
      expect(
        filterListings(demoListings, "", "Fruit", sort).map(
          (item) => item.name,
        ),
      ).toEqual(["Lemons"]);
    }
    expect(demoListings).toEqual(before);
  });
  it("treats unusual search input as literal text and handles empty sources", () => {
    for (const query of [
      "<script>alert(1)</script>",
      "[.*",
      "🥬",
      "ଟମାଟୋ",
      "x".repeat(10000),
    ]) {
      expect(
        filterListings(demoListings, query, "All produce", "price-asc"),
      ).toEqual([]);
    }
    expect(
      filterListings(demoListings, " \n\t ", "All produce", "featured"),
    ).toHaveLength(8);
    expect(filterListings([], "", "All produce", "pickup")).toEqual([]);
  });
});
