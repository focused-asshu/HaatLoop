import { MarketArt } from "@/components/brand/market-art";

export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="eyebrow">
          <span>
            <span className="status-dot" /> Built for local markets in Odisha
          </span>
          <span>· Early concept</span>
        </p>
        <h1 id="hero-heading">
          <span className="hero-line">Good food</span>{" "}
          <span className="hero-line">deserves</span>{" "}
          <span className="hero-line">
            <em>another</em> chance.
          </span>
        </h1>
        <p className="hero-description">
          An idea to connect neighbourhood vendors with nearby buyers for
          suitable unsold produce and a simple local pickup.
        </p>
        <div className="actions">
          <a className="button" href="#how">
            See how it works <span aria-hidden="true">↓</span>
          </a>
          <a className="text-link" href="#preview">
            Explore the preview <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <MarketArt />
      <p className="hero-note">Fresh finds. Fairer prices. Less waste.</p>
    </section>
  );
}
