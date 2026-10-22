export function Story() {
  return (
    <section className="story dark-section scalloped">
      <div className="story-grid container">
        <div>
          <p className="eyebrow">01 / The gap we’re exploring</p>
          <h2>
            Same neighbourhood.
            <br />
            <em>A missed connection?</em>
          </h2>
        </div>
        <div>
          <p className="lead">
            A vendor may have good produce left. Someone nearby may want it. The
            missing piece could be finding each other before closing time.
          </p>
          <p className="hypothesis">
            Our hypothesis, not a proven finding. We haven’t conducted customer
            research yet.
          </p>
        </div>
        <div
          className="gap-diagram"
          aria-label="The idea: connect late-day vendor stock with nearby buyers within a short pickup window"
        >
          <span>
            At the stall
            <br />
            <strong>Suitable stock</strong>
          </span>
          <span className="gap-clock">
            <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M24 11v14l9 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            One short pickup window
          </span>
          <span>
            Just around the corner
            <br />
            <strong>A possible buyer</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
