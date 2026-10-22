export const faqs = [
  [
    "What is HaatLoop?",
    "HaatLoop is an early-stage idea for connecting small vegetable vendors with nearby buyers of suitable unsold produce in Odisha. The product hypothesis is unvalidated.",
  ],
  [
    "Is it available for real orders?",
    "No. This website is a concept and interactive demo. There is no live inventory, reservation service or announced launch date.",
  ],
  [
    "Who could list produce?",
    "The intended users are small vegetable vendors with suitable edible produce left to offer. Vendor onboarding is not available yet.",
  ],
  [
    "How would pickup work?",
    "A buyer would choose a listing and quantity, then collect from the vendor within the stated pickup window. The detailed pickup and cancellation policies are still to be developed.",
  ],
  [
    "How would payment work?",
    "Payment would happen directly between buyer and vendor at pickup. HaatLoop does not process payments on this website.",
  ],
  [
    "Would there be delivery?",
    "No delivery service is planned for the initial concept. The idea is local pickup from the vendor.",
  ],
  [
    "How would quality be handled?",
    "The intended principles are edible produce, honest condition descriptions and vendor accountability. Verification, reporting and enforcement are not yet operational; no quality guarantee is being offered.",
  ],
] as const;

export function FAQ() {
  return (
    <section
      id="faq"
      className="section faq-grid container"
      aria-labelledby="faq-heading"
    >
      <div>
        <p className="eyebrow">06 / A few good questions</p>
        <h2 id="faq-heading">
          Glad you
          <br />
          <em>asked.</em>
        </h2>
        <p>
          Here’s what we know.
          <br />
          And what’s still taking shape.
        </p>
      </div>
      <div className="faq-list">
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
