"use client";
import { useEffect, useRef } from "react";
import { Produce } from "@/components/brand/produce";
import { formatINR } from "@/lib/currency";
import type { DemoListing } from "./types";

export function ListingDialog({
  listing,
  onClose,
}: {
  listing: DemoListing | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (listing && dialog.current && !dialog.current.open) {
      dialog.current.showModal();
      close.current?.focus();
    }
  }, [listing]);
  return (
    <dialog
      ref={dialog}
      className="listing-dialog"
      aria-labelledby="detail-title"
      aria-describedby="detail-notice"
      onClose={onClose}
    >
      {listing && (
        <>
          <div className="dialog-top">
            <span className="eyebrow">Demo listing · Illustrative</span>
            <button
              ref={close}
              type="button"
              className="dialog-close"
              onClick={() => dialog.current?.close()}
            >
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="detail-layout">
            <div className="detail-art">
              <Produce kind={listing.illustration} />
              <p>
                {listing.vendor} · Demo distance {listing.distanceKm} km
              </p>
            </div>
            <div>
              <h2 id="detail-title">{listing.name}</h2>
              <p className="detail-condition">{listing.condition}</p>
              <p className="detail-price">
                {formatINR(listing.pricePaise)} <span>/ {listing.unit}</span>
              </p>
              <p className="safety-note">
                Illustrative asking price, not a market rate.
              </p>
              <dl className="detail-facts">
                <div>
                  <dt>Demo quantity</dt>
                  <dd>
                    {listing.quantity} {listing.unit}
                  </dd>
                </div>
                <div>
                  <dt>Sample pickup window</dt>
                  <dd>
                    {listing.pickupStart}–{listing.pickupEnd}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="detail-pickup">
            <h3>What pickup would look like</h3>
            <p>
              In the intended service, you would review the details, reserve an
              available quantity, visit the vendor during the pickup window,
              then pay them directly and collect. There is no delivery.
            </p>
          </div>
          <p id="detail-notice" className="demo-notice">
            This is demo content, not live stock. No real vendor or pickup
            address is provided. Nothing can be reserved or paid for here.
          </p>
        </>
      )}
    </dialog>
  );
}
