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
  if (sort === "pickup")
    return matches.sort(
      (a, b) =>
        a.pickupEnd.localeCompare(b.pickupEnd) || a.id.localeCompare(b.id),
    );
  if (sort === "price-asc" || sort === "price-desc") {
    const direction = sort === "price-asc" ? 1 : -1;
    return matches.sort(
      (a, b) =>
        direction * (a.pricePaise - b.pricePaise) || a.id.localeCompare(b.id),
    );
  }
  return matches;
}
