import type { ProduceKind } from "@/components/brand/produce";
export type Category = "All produce" | "Vegetables" | "Leafy greens" | "Fruit";
export type PreviewSort = "featured" | "pickup" | "price-asc" | "price-desc";
export type DemoListing = {
  id: string;
  demo: true;
  name: string;
  category: Exclude<Category, "All produce">;
  illustration: ProduceKind;
  quantity: number;
  unit: "kg" | "bunch";
  pricePaise: number;
  condition: string;
  pickupStart: string;
  pickupEnd: string;
  distanceKm: number;
  vendor: "Demo stall";
};
