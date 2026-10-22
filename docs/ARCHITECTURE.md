# Architecture

Next.js App Router, React, strict TypeScript, and Tailwind CSS. The current app is static presentation with no backend, authentication, storage, or external data calls. Server components are the default; there is no need for client component state in Phase 0.

## Responsibilities

| Directory               | Responsibility                                                          |
| ----------------------- | ----------------------------------------------------------------------- |
| `src/app`               | Routes, root layout, metadata, not-found handling, global design tokens |
| `src/components/ui`     | Future reusable presentation primitives                                 |
| `src/components/layout` | Future shared layout components                                         |
| `src/features`          | Future domain modules and feature-specific logic                        |
| `src/lib`               | Shared logic and utilities; exported INR formatter                      |
| `src/config`            | Future validated configuration                                          |
| `src/types`             | Future genuinely shared types                                           |
| `tests/unit`            | Utility and foundation-page tests                                       |
| `tests/e2e`             | Chromium production smoke test                                          |
| `public`                | Future static assets; currently empty                                   |
| `docs`                  | Hypotheses, constraints, decisions, verification                        |

Empty directories are tracked with `.gitkeep`; they contain no speculative implementations. Business logic never belongs in components. Avoid shared abstractions until actual reuse is established.

## Conceptual domain model — documentation only

| Entity              | Proposed key fields                                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Vendor              | id, owner_user_id, display_name, pickup_location, pickup_instructions, created_at                                                                            |
| Listing             | id, vendor_id, produce_name, unit, total_quantity, available_quantity, price_paise_per_unit, pickup_start, pickup_end, status, version, created_at           |
| Buyer               | id, user_id, minimal display/contact details only if necessary, created_at                                                                                   |
| Reservation         | id, listing_id, buyer_id, quantity, unit_price_paise_snapshot, status, expires_at, idempotency_key, created_at, completed_at                                 |
| Transaction outcome | id, reservation_id (unique), recorded_by, pickup_outcome, recorded_at; external payment remains unverified unless a future evidence policy defines otherwise |

Amounts use integer paise. Quantity precision, permitted units, location precision, retention periods, and outcome taxonomy require later decisions. Transaction outcome is a record of an observed/attested result, not a payment processor record.

## Required state machines

- Listing: draft → active → sold_out | expired | withdrawn
- Reservation: reserved → completed | cancelled | expired | no_show

Terminal states cannot transition further.

### Open model issues

If `sold_out` means all stock is reserved, a later cancellation or expiry can restore stock, but the terminal listing cannot become active again. Before implementation, decide whether sold_out is only final after collection, whether restored stock needs a new listing, or whether the model needs an explicitly approved revision. Do not silently add a transition.

The model has no draft deletion/withdrawal transition. Draft cleanup needs a policy. Expired versus no_show requires a precise deadline and actor policy, including races between expiry and completion. These questions are unresolved; the specified states remain unchanged.

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

No Supabase dependency, schema, credentials, auth flow, or backend code is included in Phase 0.
