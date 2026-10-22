import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container">
        <p className="eyebrow">A small idea. A local beginning.</p>
        <h2>
          Better value stays
          <br />
          <em>closer to home.</em>
        </h2>
        <div className="actions">
          <Link prefetch={false} className="button" href="/marketplace">
            Explore the preview <span aria-hidden="true">→</span>
          </Link>
          <Link prefetch={false} className="text-link" href="/how-it-works">
            See how it works <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
