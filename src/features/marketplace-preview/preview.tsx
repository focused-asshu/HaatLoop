"use client";
import { useRef, useState } from "react";
import { Produce } from "@/components/brand/produce";
import { formatINR } from "@/lib/currency";
import { categories, demoListings } from "./data";
import { filterListings } from "./filter";
import type { Category, PreviewSort } from "./types";

export function MarketplacePreview() {
  const [category, setCategory] = useState<Category>("All produce");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<PreviewSort>("featured");
  const search = useRef<HTMLInputElement>(null);
  const listings = filterListings(demoListings, query, category, sort);
  function reset() {
    setCategory("All produce");
    setQuery("");
    setSort("featured");
    search.current?.focus();
  }
  return (
    <section
      id="preview"
      className="preview-section"
      aria-labelledby="preview-heading"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / Take a look around</p>
            <h2 id="preview-heading">
              A taste of
              <br />
              <em>what could be.</em>
            </h2>
          </div>
          <p className="preview-disclaimer">
            <span className="badge">Preview with demo data — not live</span>All
            produce, prices, quantities, distances and times below are invented
            examples. Nothing here can be reserved or bought.
          </p>
        </div>
        <div className="preview-controls">
          <fieldset className="filter-chips">
            <legend className="sr-only">Produce category</legend>
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </fieldset>
          <div className="search-sort">
            <label>
              Search demo produce
              <input
                ref={search}
                type="search"
                value={query}
                placeholder="Try tomatoes…"
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <label>
              Sort examples
              <select
                value={sort}
                onChange={(event) =>
                  setSort(
                    event.target.value === "pickup" ? "pickup" : "featured",
                  )
                }
              >
                <option value="featured">Featured examples</option>
                <option value="pickup">Pickup ending soonest</option>
              </select>
            </label>
          </div>
        </div>
        <p
          className="result-count"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {listings.length} demo{" "}
          {listings.length === 1 ? "listing" : "listings"} · Sample times only,
          not today’s availability
        </p>
        {listings.length ? (
          <div className="listing-grid">
            {listings.map((item) => (
              <article className="listing-ticket" key={item.id}>
                <div className="listing-art">
                  <span className="demo-badge">Demo</span>
                  <Produce kind={item.illustration} />
                  <span className="demo-distance">
                    Demo distance · {item.distanceKm} km
                  </span>
                </div>
                <div className="listing-body">
                  <p className="listing-vendor">
                    {item.vendor} <span>Illustrative</span>
                  </p>
                  <h3>{item.name}</h3>
                  <p className="condition">{item.condition}</p>
                  <div className="listing-price">
                    <strong>
                      {formatINR(item.pricePaise)}
                      <small> / {item.unit}</small>
                    </strong>
                    <span>Demo asking price</span>
                  </div>
                  <dl>
                    <div>
                      <dt>Sample quantity</dt>
                      <dd>
                        {item.quantity} {item.unit}
                      </dd>
                    </div>
                    <div>
                      <dt>Demo pickup</dt>
                      <dd>
                        {item.pickupStart}–{item.pickupEnd}
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No demo produce matches.</h3>
            <p>Try another search or start with all the examples.</p>
            <button className="button" onClick={reset}>
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
