import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Produce } from "@/components/brand/produce";
import { pageMetadata } from "@/config/page-metadata";

export const metadata = pageMetadata(
  "How it works",
  "Explore HaatLoop’s intended buyer and vendor journeys, local pickup and direct payment. An early concept, not a live reservation service.",
  "/how-it-works",
);

const buyer = [
  [
    "Find something nearby.",
    "Discover suitable produce offered by a neighbourhood vendor.",
  ],
  [
    "Take a closer look.",
    "Review the condition, asking price, quantity and pickup window before deciding.",
  ],
  [
    "Choose a quantity.",
    "In the intended service, a reservation would temporarily hold an available quantity for you.",
  ],
  ["Make the short trip.", "Visit the vendor within the stated pickup window."],
  [
    "Pay directly. Take it home.",
    "Pay the vendor directly and collect the produce. The platform would record the handover, not verify an external payment.",
  ],
];
const vendor = [
  [
    "Start with suitable produce.",
    "Identify edible unsold produce that is still suitable to offer.",
  ],
  [
    "Create a quick listing.",
    "Give the produce a clear name so nearby buyers can find it.",
  ],
  [
    "Set the details.",
    "Choose quantity, unit and asking price. Describe the condition and set a pickup start and end.",
  ],
  [
    "Receive a reservation.",
    "See the quantity held for a buyer and what remains available.",
  ],
  [
    "Confirm the handover.",
    "After collection and direct payment, mark the handover complete. A completed record would not independently verify payment.",
  ],
];

export default function HowItWorks() {
  return (
    <SiteShell currentPath="/how-it-works">
      <section className="page-opening how-opening container">
        <p className="eyebrow">The idea / How it works</p>
        <h1>
          From the neighbourhood market,
          <br />
          <em>back to the neighbourhood.</em>
        </h1>
        <div className="opening-bottom">
          <p className="lead">
            A local loop for suitable unsold produce. A clear price, a little
            planning, and a pickup at the stall.
          </p>
          <p className="concept-note">
            Early-stage concept. These are intended workflows, not a service
            accepting real reservations.
          </p>
        </div>
        <div className="local-loop" aria-hidden="true">
          <span>At the stall</span>
          <Produce kind="tomato" />
          <span className="loop-line">→</span>
          <Produce kind="greens" />
          <span>Back in the neighbourhood</span>
        </div>
      </section>
      <section className="section container" aria-labelledby="journeys-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Two sides. One pickup.</p>
            <h2 id="journeys-title">
              A simple plan,
              <br />
              from both sides.
            </h2>
          </div>
          <p className="journey-intro">
            Intended workflow — not live. No listing or reservation is created
            by this page.
          </p>
        </div>
        <div className="workflow-columns">
          {[
            { title: "For buyers", steps: buyer },
            { title: "For vendors", steps: vendor },
          ].map(({ title, steps }) => (
            <div className="workflow" key={title}>
              <h3>{title}</h3>
              <ol>
                {steps.map(([heading, copy], index) => (
                  <li key={heading}>
                    <span className="workflow-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <div>
                      <h4>{heading}</h4>
                      <p>{copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>
      <section
        className="lifecycle-band dark-section"
        aria-labelledby="lifecycle-title"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / A hold, not a sale</p>
              <h2 id="lifecycle-title">Keep the quantity clear.</h2>
            </div>
            <p className="journey-intro">
              Planned reservation model. This diagram explains the idea; it does
              not manage stock.
            </p>
          </div>
          <p className="stock-equation">
            Available <span>=</span> total <span>−</span> held <span>−</span>{" "}
            sold
          </p>
          <div className="reservation-flow">
            <div className="held-state">
              <span className="eyebrow">A temporary hold</span>
              <h3>Reserved</h3>
              <p>Quantity moves from available to held.</p>
            </div>
            <span className="flow-arrow" aria-hidden="true">
              →
            </span>
            <div className="outcome-list">
              <div>
                <h3>Completed</h3>
                <p>Held quantity becomes sold. Availability stays the same.</p>
              </div>
              <div>
                <h3>Cancelled · Expired · No-show</h3>
                <p>
                  The hold is released and that quantity returns to calculated
                  availability.
                </p>
              </div>
            </div>
          </div>
          <div className="lifecycle-notes">
            <p>
              These outcomes are final:{" "}
              <code>reserved → completed | cancelled | expired | no_show</code>.
            </p>
            <p>
              “Sold out” means available = 0. It can include held stock, not
              just collected produce. Releasing a hold does not reopen a
              withdrawn listing or extend its pickup window.
            </p>
          </div>
        </div>
      </section>
      <section
        className="section practical-grid container"
        aria-labelledby="pickup-title"
      >
        <div>
          <p className="eyebrow">03 / Meet at the market</p>
          <h2 id="pickup-title">
            Local pickup.
            <br />
            Direct payment.
          </h2>
        </div>
        <div className="plain-notes">
          <div>
            <h3>Collect from the vendor.</h3>
            <p>
              The intended model is pickup at the vendor’s location during the
              agreed window. There is no delivery fleet.
            </p>
          </div>
          <div>
            <h3>Pay the person behind the stall.</h3>
            <p>
              Payment would happen directly between buyer and vendor. HaatLoop
              does not process payments in this preview.
            </p>
          </div>
        </div>
      </section>
      <section
        className="planned-safety section"
        aria-labelledby="planned-safety-title"
      >
        <div className="practical-grid container">
          <div>
            <span className="badge">Planned principles · not enforced yet</span>
            <h2 id="planned-safety-title">
              Care comes before
              <br />a second chance.
            </h2>
            <p className="lead">
              Verification, reporting and safety enforcement are future work.
              None are operational.
            </p>
          </div>
          <ul className="principle-list">
            <li>Only suitable, edible produce.</li>
            <li>Honest descriptions of its condition.</li>
            <li>Clear quantities, prices and pickup windows.</li>
            <li>Vendor accountability for what they offer.</li>
            <li>A future way to report and review concerns.</li>
          </ul>
        </div>
      </section>
      <section className="route-next container">
        <p className="eyebrow">Keep exploring the idea</p>
        <div className="actions">
          <Link prefetch={false} className="button" href="/marketplace">
            Explore the marketplace preview <span aria-hidden="true">→</span>
          </Link>
          <Link prefetch={false} className="text-link" href="/for-vendors">
            A closer look for vendors <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
