import { SiteShell } from "@/components/layout/site-shell";
import { MarketplacePreview } from "@/features/marketplace-preview/preview";
import { pageMetadata } from "@/config/page-metadata";

export const metadata = pageMetadata(
  "Marketplace preview",
  "Explore clearly labeled demo produce listings. Try search, category filters, price sorting and illustrative listing details. No live stock or reservations.",
  "/marketplace",
);

export default function Marketplace() {
  return (
    <SiteShell currentPath="/marketplace">
      <section className="marketplace-opening">
        <div className="container">
          <p className="eyebrow">The marketplace / An interactive preview</p>
          <div className="marketplace-intro">
            <h1 id="marketplace-heading">
              A little look
              <br />
              <em>around the market.</em>
            </h1>
            <div>
              <span className="badge">Preview with demo data — not live</span>
              <p>
                All produce, prices, quantities, distances and times are
                invented examples. No real vendors or live inventory. Nothing
                here can be reserved or bought.
              </p>
            </div>
          </div>
        </div>
      </section>
      <MarketplacePreview standalone />
    </SiteShell>
  );
}
