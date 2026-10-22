"use client";
import { useRef, useState } from "react";
import { Produce } from "@/components/brand/produce";
import { formatINR } from "@/lib/currency";
import { categories } from "./data";
import { filterListings } from "./filter";
import type { Category, DemoListing, PreviewSort } from "./types";
import { ListingDialog } from "./listing-dialog";
import Link from "next/link";

export function PreviewBrowser({
  source,
  standalone = false,
}: {
  source: readonly DemoListing[];
  standalone?: boolean;
}) {
  const [category, setCategory] = useState<Category>("All produce");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<PreviewSort>("featured");
  const search = useRef<HTMLInputElement>(null);
  const listings = filterListings(source, query, category, sort);
  const [selected, setSelected] = useState<DemoListing | null>(null);
  const detailTrigger = useRef<HTMLButtonElement | null>(null);
  function reset() {
    setCategory("All produce");
    setQuery("");
    setSort("featured");
    search.current?.focus();
  }
  return (
    <section
      id="preview"
      className={`preview-section${standalone ? "marketplace-browser" : ""}`}
      aria-labelledby={standalone ? "marketplace-heading" : "preview-heading"}
    >
      <div className="container">
        {!standalone && (
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
              <span className="badge">Preview with demo data — not live</span>
              All produce, prices, quantities, distances and times below are
              invented examples. Nothing here can be reserved or bought.
            </p>
          </div>
        )}
        <div className="preview-controls">
          <div className="search-sort">
            <div className="search-control">
              <label htmlFor="demo-search">Search demo produce</label>
              <span className="search-field">
                <input
                  ref={search}
                  id="demo-search"
                  type="search"
                  value={query}
                  placeholder="Try tomatoes…"
                  onChange={(event) => setQuery(event.target.value)}
                />
                <button
                  type="button"
                  className="clear-search"
                  disabled={!query}
                  onClick={() => {
                    setQuery("");
                    search.current?.focus();
                  }}
                >
                  Clear<span className="sr-only"> search</span>
                </button>
              </span>
            </div>
            <label>
              Sort examples
              <select
                value={sort}
                onChange={(event) =>
                  setSort(
                    ["pickup", "price-asc", "price-desc"].includes(
                      event.target.value,
                    )
                      ? (event.target.value as PreviewSort)
                      : "featured",
                  )
                }
              >
                <option value="featured">Featured examples</option>
                <option value="pickup">Pickup ending soonest</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </label>
          </div>
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
          <div className="filter-help">
            <p>
              Illustrative prices per stated unit, not market rates. Kg and
              bunch prices are not directly comparable.
            </p>
            <button
              type="button"
              className="text-link reset-link"
              onClick={reset}
            >
              Reset all
            </button>
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
                  {standalone && (
                    <button
                      type="button"
                      className="detail-trigger"
                      aria-haspopup="dialog"
                      aria-label={`View ${item.name} demo details`}
                      onClick={(event) => {
                        detailTrigger.current = event.currentTarget;
                        setSelected(item);
                      }}
                    >
                      View demo details <span aria-hidden="true">→</span>
                    </button>
                  )}
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
        {!standalone && (
          <Link
            prefetch={false}
            className="text-link preview-more"
            href="/marketplace"
          >
            Explore the full marketplace preview{" "}
            <span aria-hidden="true">→</span>
          </Link>
        )}
        {standalone && (
          <ListingDialog
            listing={selected}
            onClose={() => {
              setSelected(null);
              detailTrigger.current?.focus();
            }}
          />
        )}
      </div>
    </section>
  );
}
