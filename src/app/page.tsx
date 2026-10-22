import { SiteShell } from "@/components/layout/site-shell";
import { Hero } from "@/components/sections/hero";
import { Story } from "@/components/sections/story";
import { Journeys } from "@/components/sections/journeys";
import { MarketplacePreview } from "@/features/marketplace-preview/preview";
import { Value, Safety } from "@/components/sections/value-safety";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <SiteShell currentPath="/">
      <Hero />
      <Story />
      <Journeys />
      <MarketplacePreview />
      <Value />
      <Safety />
      <FAQ />
      <FinalCTA />
    </SiteShell>
  );
}
