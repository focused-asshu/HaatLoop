import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { Story } from "@/components/sections/story";
import { Journeys } from "@/components/sections/journeys";
import { MarketplacePreview } from "@/features/marketplace-preview/preview";
import { Value, Safety } from "@/components/sections/value-safety";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Story />
        <Journeys />
        <MarketplacePreview />
        <Value />
        <Safety />
        <FAQ />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
