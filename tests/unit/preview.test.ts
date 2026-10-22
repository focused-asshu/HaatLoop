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
  it("limits navigation to the four implemented section anchors", () => {
    expect(navigation.map((x) => x.href)).toEqual([
      "#how",
      "#preview",
      "#safety",
      "#faq",
    ]);
    expect(new Set(navigation.map((x) => x.label)).size).toBe(
      navigation.length,
    );
  });
});
