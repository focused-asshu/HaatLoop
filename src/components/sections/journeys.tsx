"use client";

import { useRef, useState } from "react";
const journeys = {
  buyer: [
    {
      title: "Find a local offer.",
      text: "See the produce, condition, asking price and pickup window before travelling.",
    },
    {
      title: "Reserve your quantity.",
      text: "The proposed service would hold your quantity for a limited pickup window.",
    },
    {
      title: "Pick up. Pay directly.",
      text: "Collect from the vendor and pay them directly at pickup. No delivery fleet.",
    },
  ],
  vendor: [
    {
      title: "List suitable produce.",
      text: "Describe its condition, set your asking price and choose a pickup window.",
    },
    {
      title: "Receive a local reservation.",
      text: "The proposed service would show the quantity held for a nearby buyer.",
    },
    {
      title: "Hand over at pickup.",
      text: "Meet the buyer at your stall and receive payment directly from them.",
    },
  ],
};
export function Journeys() {
  const [selected, setSelected] = useState<"buyer" | "vendor">("buyer");
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  return (
    <section
      id="how"
      className="section container"
      aria-labelledby="how-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / A simple local loop</p>
          <h2 id="how-heading">
            From the stall.
            <br />
            <em>To your kitchen.</em>
          </h2>
        </div>
        <div className="journey-intro">
          <p>A proposed journey, not a service you can use yet.</p>
          <div className="tabs" role="tablist" aria-label="Choose a journey">
            {(["buyer", "vendor"] as const).map((role, index) => (
              <button
                key={role}
                ref={(element) => {
                  refs.current[index] = element;
                }}
                id={`${role}-tab`}
                role="tab"
                aria-selected={selected === role}
                aria-controls={`${role}-panel`}
                tabIndex={selected === role ? 0 : -1}
                onClick={() => setSelected(role)}
                onKeyDown={(event) => {
                  if (
                    !["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                      event.key,
                    )
                  )
                    return;
                  event.preventDefault();
                  const next =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? 1
                        : 1 - index;
                  setSelected(next === 0 ? "buyer" : "vendor");
                  refs.current[next]?.focus();
                }}
              >
                {role === "buyer" ? "I’m a buyer" : "I’m a vendor"}
              </button>
            ))}
          </div>
        </div>
      </div>
      {(["buyer", "vendor"] as const).map((role) => (
        <div
          key={role}
          id={`${role}-panel`}
          role="tabpanel"
          aria-labelledby={`${role}-tab`}
          tabIndex={0}
          hidden={selected !== role}
          className={`journey-panel journey-${role}`}
        >
          <ol>
            {journeys[role].map((step, index) => (
              <li key={step.title}>
                <span className="step-number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
}
