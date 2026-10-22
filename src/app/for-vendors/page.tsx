import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Produce } from "@/components/brand/produce";
import { getDemoListings } from "@/features/marketplace-preview/source";
import { formatINR } from "@/lib/currency";
import { pageMetadata } from "@/config/page-metadata";

export const metadata = pageMetadata(
  "For vendors",
  "A practical look at HaatLoop’s proposed produce listings, vendor-set prices and local pickup. Vendor onboarding and live reservations are not available.",
  "/for-vendors",
);

export default function ForVendors() {
  const example = getDemoListings().find((item) => item.id === "demo-tomato");
  return (
    <SiteShell currentPath="/for-vendors">
      <section className="vendor-opening container">
        <div className="vendor-opening-copy">
          <p className="eyebrow">For the people behind the stall</p>
          <h1>
            Your produce.
            <br />
            Your prices.
            <br />
            <em>One more opportunity.</em>
          </h1>
          <p className="lead">
            We’re exploring a simple way to offer suitable unsold produce to
            nearby buyers before your pickup window ends.
          </p>
          <p className="concept-note">
            An early idea to test together. No guaranteed sales or earnings.
          </p>
          <a className="text-link" href="#vendor-example">
            See an illustrative listing <span aria-hidden="true">↓</span>
          </a>
        </div>
        {example && (
          <figure id="vendor-example" className="vendor-example">
            <figcaption>Illustrative — no listing is submitted</figcaption>
            <div className="phone-example">
              <div className="phone-speaker" aria-hidden="true" />
              <p className="eyebrow">HaatLoop / Demo listing</p>
              <div className="phone-produce">
                <Produce kind={example.illustration} />
                <span>
                  Suitable produce.
                  <br />
                  Clear details.
                </span>
              </div>
              <h2>A listing could look like this.</h2>
              <dl className="example-fields">
                {[
                  ["Produce", example.name],
                  ["Quantity", String(example.quantity)],
                  ["Unit", example.unit],
                  [
                    "Asking price",
                    `${formatINR(example.pricePaise)} / ${example.unit}`,
                  ],
                  ["Condition", example.condition],
                  ["Pickup start", example.pickupStart],
                  ["Pickup end", example.pickupEnd],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="example-caption">
                Demo values, not live stock or market rates. This illustration
                has no editable fields.
              </p>
            </div>
          </figure>
        )}
      </section>
      <section
        className="section vendor-benefits"
        aria-labelledby="benefits-title"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / A possibility worth testing</p>
              <h2 id="benefits-title">
                Another channel.
                <br />
                Still your stall.
              </h2>
            </div>
            <p className="journey-intro">
              A possible addition to how you already sell. The commercial model
              and demand are still unvalidated.
            </p>
          </div>
          <div className="benefit-row">
            <div>
              <span aria-hidden="true">01</span>
              <h3>You choose the price.</h3>
              <p>
                Set your asking price and describe the produce honestly. Any
                extra sales would need to be tested, not assumed.
              </p>
            </div>
            <div>
              <span aria-hidden="true">02</span>
              <h3>You set the window.</h3>
              <p>
                Short-window listings could help nearby buyers plan a pickup
                before your stated time ends.
              </p>
            </div>
            <div>
              <span aria-hidden="true">03</span>
              <h3>You hand it over.</h3>
              <p>
                Direct collection at your stall, with payment to you. No
                platform-operated delivery fleet in the initial model.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section practical-grid container"
        aria-labelledby="handling-title"
      >
        <div>
          <p className="eyebrow">02 / From a hold to a handover</p>
          <h2 id="handling-title">
            Know what’s held.
            <br />
            Know what’s left.
          </h2>
          <p className="lead">
            What handling reservations could look like. None of these actions
            are live yet.
          </p>
          <Link prefetch={false} className="text-link" href="/how-it-works">
            Understand the planned workflow <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ol className="handling-list">
          <li>
            <h3>View the reservation.</h3>
            <p>
              See the quantity held for a buyer and their pickup window. Held
              stock would be separate from available stock.
            </p>
          </li>
          <li>
            <h3>Keep quantities clear.</h3>
            <p>
              Available would mean total minus held minus sold. A cancellation,
              expiry or no-show releases the hold, without extending the pickup
              window.
            </p>
          </li>
          <li>
            <h3>Confirm the pickup.</h3>
            <p>
              When the buyer collects and pays you directly, mark the handover
              completed. Quantity moves from held to sold once; an external
              payment is not independently verified.
            </p>
          </li>
        </ol>
      </section>
      <section className="vendor-priority dark-section">
        <div className="practical-grid container">
          <div>
            <p className="eyebrow">03 / Less to manage</p>
            <h2>
              Built around
              <br />
              <em>a busy day.</em>
            </h2>
          </div>
          <div>
            <p className="lead">
              The design goal is simple forms, clear units and readable screens
              on budget Android phones and slow connections.
            </p>
            <p>
              Those needs still need testing with vendors. Odia and voice
              support are possible future enhancements, not implemented
              features.
            </p>
          </div>
        </div>
      </section>
      <section
        className="section vendor-status container"
        aria-labelledby="vendor-status-title"
      >
        <span className="badge">Where things stand</span>
        <h2 id="vendor-status-title">
          An idea taking shape.
          <br />
          No sign-up needed.
        </h2>
        <p className="lead">
          HaatLoop is under development. Vendor onboarding and live reservations
          are not available. The commercial model is unvalidated, and
          verification and safety enforcement remain future work.
        </p>
        <Link prefetch={false} className="button" href="/marketplace">
          Explore the marketplace preview <span aria-hidden="true">→</span>
        </Link>
      </section>
    </SiteShell>
  );
}
