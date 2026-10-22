import { demoListings } from "./data";
import type { DemoListing } from "./types";

/** Server presentation boundary. No network, persistence or availability claims. */
export function getDemoListings(): readonly DemoListing[] {
  return demoListings;
}
