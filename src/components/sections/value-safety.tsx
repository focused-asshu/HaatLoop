export function Value() {
  return (
    <section className="value-section dark-section">
      <div className="value-grid container">
        <div>
          <p className="eyebrow">04 / Why it could help</p>
          <h2>
            More possibilities.
            <br />
            <em>Right here.</em>
          </h2>
          <p className="lead">
            A local connection worth testing.
            <br />
            Not a promise of better outcomes.
          </p>
        </div>
        <div className="value-copy">
          <div>
            <span className="eyebrow">For the people behind the stall</span>
            <h3>Your produce. Your price.</h3>
            <p>
              An additional channel for late-day stock, with vendor-set prices
              and local pickup. A way to test whether incremental sales are
              possible.
            </p>
          </div>
          <div>
            <span className="eyebrow">For the people around the corner</span>
            <h3>Know before you go.</h3>
            <p>
              See the condition, pickup time and asking price before making the
              trip. Whether the journey is worthwhile is something we still need
              to learn.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Safety() {
  return (
    <section
      id="safety"
      className="section safety-grid container"
      aria-labelledby="safety-heading"
    >
      <div>
        <p className="eyebrow">05 / Care comes first</p>
        <h2 id="safety-heading">
          Another chance.
          <br />
          Never a compromise
          <br />
          <em>on suitability.</em>
        </h2>
        <span className="badge">Planned principles</span>
        <p className="safety-note">
          Verification, reporting and enforcement are not operational. These are
          the principles we intend to build around.
        </p>
      </div>
      <ol className="principles">
        <li>
          <span>01</span>
          <div>
            <h3>Edible means edible.</h3>
            <p>
              Only produce suitable to eat belongs here. A lower price must
              never excuse unsafe food.
            </p>
          </div>
        </li>
        <li>
          <span>02</span>
          <div>
            <h3>Show its honest side.</h3>
            <p>
              Clear condition notes and pickup instructions, so buyers can make
              an informed choice.
            </p>
          </div>
        </li>
        <li>
          <span>03</span>
          <div>
            <h3>Keep accountability local.</h3>
            <p>
              Vendor responsibility and a future way to report concerns. The
              operating policies still need to be developed.
            </p>
          </div>
        </li>
      </ol>
    </section>
  );
}
