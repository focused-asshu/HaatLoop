import { getDemoListings } from "./source";
import { PreviewBrowser } from "./browser";

export function MarketplacePreview({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  return <PreviewBrowser source={getDemoListings()} standalone={standalone} />;
}
