import { Produce } from "./produce";

export function MarketArt() {
  return (
    <div
      className="market-art"
      role="img"
      aria-label="Original illustration of a market basket filled with vegetables beneath a striped awning"
    >
      <svg className="awning" viewBox="0 0 480 110" aria-hidden="true">
        {[0, 80, 160, 240, 320, 400].map((x, index) => (
          <path
            key={x}
            fill={index % 2 === 0 ? "var(--primary)" : "var(--background)"}
            d={`M${x} 0h80v70a40 40 0 0 1-80 0Z`}
          />
        ))}
      </svg>
      <div className="basket-produce" aria-hidden="true">
        <Produce kind="greens" />
        <Produce kind="brinjal" />
        <Produce kind="tomato" />
        <Produce kind="lemon" />
      </div>
      <svg className="basket" viewBox="0 0 400 180" aria-hidden="true">
        <path d="M20 20h360l-34 140H54Z" fill="var(--primary)" />
        <g stroke="var(--secondary)" strokeWidth="5">
          <path d="m76 30 16 118m42-118 8 118m58-118v118m65-118-8 118m65-118-16 118M40 65h320M49 111h302" />
        </g>
        <path d="M12 13h376v22H12Z" fill="var(--primary)" />
      </svg>
      <div className="art-ticket" aria-hidden="true">
        Tomatoes
        <br />
        <strong>Demo · ₹40 / kg</strong>
      </div>
      <span className="art-caption">
        An illustration of the idea, not live stock.
      </span>
    </div>
  );
}
