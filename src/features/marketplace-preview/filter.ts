import type { Category, DemoListing, PreviewSort } from "./types";
export function filterListings(
  listings: readonly DemoListing[],
  query: string,
  category: Category,
  sort: PreviewSort,
): DemoListing[] {
  const search = query.trim().toLocaleLowerCase("en-IN");
  const matches = listings.filter(
    (item) =>
      (category === "All produce" || item.category === category) &&
      `${item.name} ${item.category}`
        .toLocaleLowerCase("en-IN")
        .includes(search),
  );
  return sort === "pickup"
    ? matches.sort(
        (a, b) =>
          a.pickupEnd.localeCompare(b.pickupEnd) || a.id.localeCompare(b.id),
      )
    : matches;
}
