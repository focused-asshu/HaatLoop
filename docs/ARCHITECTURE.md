# Architecture

Next.js App Router, React, strict TypeScript, and Tailwind CSS. The Phase 1A homepage is prerendered with no backend, authentication, persistence or external data calls. Server components compose the page. Only mobile navigation, journey tabs and demo discovery need client state.

## Responsibilities

| Directory               | Responsibility                                                |
| ----------------------- | ------------------------------------------------------------- |
| `src/app`               | Root route, layout, metadata endpoints and not-found handling |
| `src/components/ui`     | Reserved for future reusable presentation primitives          |
| `src/components/layout` | Header, mobile navigation and footer                          |
| `src/features`          | Demo marketplace preview and pure fixture filtering           |
| `src/lib`               | Shared logic and utilities; exported INR formatter            |
| `src/config`            | Site metadata and anchor navigation                           |
| `src/types`             | Future genuinely shared types                                 |
| `tests/unit`            | Utility, fixture, navigation and component interaction tests  |
| `tests/e2e`             | Chromium behavior, responsive and axe tests                   |
| `public`                | Future static assets; currently empty                         |
| `docs`                  | Hypotheses, constraints, decisions, verification              |

Empty directories are tracked with `.gitkeep`; they contain no speculative implementations. Business logic never belongs in components. Avoid shared abstractions until actual reuse is established.

## Conceptual domain model — documentation only

| Entity              | Proposed key fields                                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Vendor              | id, owner_user_id, display_name, pickup_location, pickup_instructions, created_at                                                                            |
| Listing             | id, vendor_id, produce_name, unit, quantity_total, price_paise_per_unit, pickup_start, pickup_end, status, version, created_at                               |
| Buyer               | id, user_id, minimal display/contact details only if necessary, created_at                                                                                   |
| Reservation         | id, listing_id, buyer_id, quantity, unit_price_paise_snapshot, status, expires_at, idempotency_key, created_at, completed_at                                 |
| Transaction outcome | id, reservation_id (unique), recorded_by, pickup_outcome, recorded_at; external payment remains unverified unless a future evidence policy defines otherwise |

Amounts use integer paise. Quantity precision, permitted units, location precision, retention periods, and outcome taxonomy require later decisions. Transaction outcome is a record of an observed/attested result, not a payment processor record.

## Inventory model — supersedes Phase 0, documentation only

Stored listing statuses: **draft, active, withdrawn**. Expired is derived from the pickup-window end time. sold_out is derived from available = 0; it is not a stored terminal state and does not necessarily mean that every unit has been collected.

- A listing stores quantity_total.
- quantity_held is the sum of quantities in active reserved reservations.
- quantity_sold is the sum of completed reservation quantities.
- available = quantity_total − quantity_held − quantity_sold.
- Cancelled, expired and no_show reservations release their hold. This restores calculated availability, but does not reopen a withdrawn listing or extend its pickup window.
- Reservation: reserved → completed | cancelled | expired | no_show. All destination states are terminal.
- Completion atomically moves quantity from held to sold, leaving availability unchanged. Completion is idempotent and cannot occur twice.
- Invariant: 0 ≤ held + sold ≤ total at all times. All quantity changes are atomic; all transitions are validated and authorized server-side.

Expiry workers and completion must share guarded transactions. A hold is released once, even on retries; a stale client cannot complete a released reservation. Listing withdrawal, draft cleanup, fractional unit precision, and the exact boundary between expired and no_show still need operating policies. This phase implements no inventory engine.

## Phase 1A presentation boundaries

- src/components/brand: original SVG mark, basket/awning and seven produce illustrations.
- src/components/layout: header, mobile menu and footer; nav destinations are centralized in src/config/site.ts.
- src/components/sections: meaningful homepage sections; FAQ uses native details and needs no custom client component.
- src/features/marketplace-preview: typed invented fixtures, pure filter/search/sort function, and interactive presentation. Values never represent availability or observed prices. Same-day HH:mm values sort lexically; this is deliberately not a production date/time model.
- src/styles: foundation tokens, shell, hero, journeys, preview, content and responsive styles, imported by the small app stylesheet.
- src/app: only the root page and existing not-found UI; icon.svg, robots.ts and sitemap.ts are metadata assets/endpoints, not new product pages.

All eight examples show Demo and Demo stall. Prices are integer paise per stated unit; quantities, distances, condition notes and pickup times are invented. Search matches name/category; filters intersect; sorting copies the list without mutating fixtures. No backend adapter or fake transaction flow is introduced. Phase 1B can replace or reuse presentation after its scope is approved.

## Future Supabase strategy — not implemented

Use Supabase Postgres, Auth, and Storage only in later phases after validating scope and resolving state semantics. Define version-controlled migrations, ownership relationships, and deny-by-default row-level security before exposing tables. Test policies with multiple users and unauthorized requests. Backend integrations and secrets must remain server-side where appropriate; never place a service-role key in browser code.

Required later controls:

- Atomic stock reservation and quantity conservation in a database transaction; define available, held, collected, and released quantities explicitly. Never implement stock changes as client read-then-write.
- Concurrency-safe requests using row locks or guarded atomic updates, database constraints, and race tests.
- Idempotent operations with durable request keys and repeatable results; reservation expiry must safely release stock once.
- Double-completion prevention via guarded state transitions and a unique reservation outcome.
- Vendor-controlled price changes with authorization and a reservation price snapshot; define how existing reservations are protected.
- Unsafe-produce reporting with an operational review policy and controlled access.
- Audit trail for stock changes, actor, timestamps, state transitions, and outcomes, with minimal sensitive data.
- Server-side validation and authorization for every mutation; never trust client-supplied ownership or status.
- Safe image uploads: ownership checks, size/type limits, file-content validation, safe object names, and controlled serving/access policies.
- Collect minimal personal data; decide consent, retention, deletion, contact visibility, and location precision before collection.

No Supabase dependency, schema, credentials, auth flow, or backend code is included in Phase 1A.
