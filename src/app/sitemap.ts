import type { MetadataRoute } from "next";
import { site, navigation } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return navigation.map(({ href }) => ({
    url: href === "/" ? site.url : `${site.url}${href}`,
  }));
}
