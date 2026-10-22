# Design system — Phase 1A

## Direction and construction

Modern local-market warmth with an editorial reading rhythm. Green and ivory carry the page; marigold marks the hero, selected notices and closing section. Coral is used only in produce artwork. No stock imagery, raster hero, gradients, heavy shadows or animation library.

The original mark uses a 48-unit square: a trapezoidal stall canopy with scalloped lobes over an open rectangular counter. The lockup pairs this with a compact Instrument Sans wordmark. Logo supports full/compact and light/dark variants; icon.svg uses the same canopy/counter geometry. It contains no leaf or borrowed icon. The hero and section edge repeat the awning motif. Listing corners are cut with a CSS polygon to suggest tickets, with a dashed pickup-information tear line.

Seven original flat produce drawings share simple filled shapes and a few highlights. public/produce.svg is a cacheable same-origin symbol sprite; the reusable Produce component references it. Artwork is decorative when the produce name is already visible. The basket illustration has one descriptive accessible label and an explicit non-live caption.

Phase 1A repair: the hero awning uses six equal 80-unit stripes in a 480 × 110 viewBox, each ending in a radius-40 semicircle. Its 84% width and 8% inset keep both edges inside the marigold arch. The whole arch remains visible, with 24px lower corners and a counter line giving the illustration a base. Removed the two illustration slogans; the ticket now reads “Tomatoes / Demo · ₹40 / kg”. This is illustrative demo content, not an offer. All seven existing produce symbols were inspected at 48px and 135px; their fills, highlights and bounds remain unchanged.

## Typography

Fraunces variable normal for h1/h2 only; Instrument Sans variable normal for body, labels, controls and wordmark. Both were verified in the installed next/font/google catalog. Latin subset, display swap, fallback size adjustment and Next self-hosting; no browser requests to Google. Build-time network access is needed on a cold build. Fluid clamp sizes, balanced headings and body measures generally below 70ch. Two families only; no additional italic font file.

Odia plan: add Noto Sans Oriya only when actual Odia content is introduced; scope it to that content and test shaping, line-height, fallback and localized controls. No Odia font is currently loaded.

The hero alone uses clamp(2.8rem, 5.2vw, 4.7rem), with three explicit line groups: “Good food”, “deserves”, “another chance.” Tablet uses clamp(2.4rem, 5.2vw, 3rem); narrow mobile uses clamp(2.3rem, 11vw, 3.6rem). Only “another” receives one marigold underline. The compact eyebrow wraps between location and concept status on mobile and stays on one line at ≥1024px. The tagline sits in a full-width, ruled hero footer. At 1440×900 and 1920×1080, the heading, description and both CTAs end above the fold.

## Semantic tokens

Tokens and Tailwind mappings live in src/styles/foundation.css, imported by src/app/globals.css. Related styles are split into shell, hero, journey, preview, content and responsive files.

| Token               | Value   | Use                                                   |
| ------------------- | ------- | ----------------------------------------------------- |
| background          | #F7F4EA | Page, inverse text                                    |
| surface / input     | #FFFFFF | Tickets, form controls                                |
| elevated            | #EDE9DC | Preview section                                       |
| foreground          | #202D27 | Main text                                             |
| muted               | #536157 | Secondary copy                                        |
| primary / success   | #164B35 | Brand and primary controls; success reserved          |
| secondary / warning | #F6BA49 | Highlights; warning reserved                          |
| border              | #747D75 | Control and section boundaries                        |
| focus-ring          | #164B35 | Focus on light surfaces; marigold on dark surfaces    |
| destructive         | #A63126 | Reserved accessible dark red; no destructive controls |
| hover               | #103B29 | Primary-button hover                                  |

Artwork-only colors: coral #E56C50, aubergine #65405C, onion #B97182, earth #C49B64. These are not used as text or meaningful control boundaries.

## Measured contrast

WCAG sRGB relative luminance calculation, rounded to two decimal places. All used text pairs exceed 4.5:1. Boundary and focus pairs exceed 3:1. The verification script recalculates these values; axe separately scans rendered states.

| Pair              | Ratio   |
| ----------------- | ------- |
| charcoal/ivory    | 13.02:1 |
| charcoal/white    | 14.32:1 |
| charcoal/elevated | 11.79:1 |
| charcoal/yellow   | 8.21:1  |
| green/ivory       | 9.12:1  |
| green/white       | 10.04:1 |
| green/yellow      | 5.75:1  |
| muted/ivory       | 5.94:1  |
| muted/white       | 6.53:1  |
| muted/elevated    | 5.38:1  |
| ivory/green       | 9.12:1  |
| yellow/green      | 5.75:1  |
| ivory/hover       | 11.36:1 |
| border/ivory      | 3.87:1  |
| border/white      | 4.26:1  |
| border/elevated   | 3.51:1  |
| green/elevated    | 8.26:1  |

## Layout, interaction and motion

The page composes asymmetric hero, full-width problem band, segmented journeys, ticket grid, split value/principles sections, native FAQ and a color-block closing section. Mobile stacks the composition intentionally; desktop uses four preview columns, intermediate widths two, mobile one. All eight cards remain visible by default and are explicitly marked Demo.

Minimum control/link target height is 44px. The menu is a non-modal absolute overlay: focus enters the first link, Escape returns to the trigger, navigation closes it, and tabbing outside dismisses it without trapping focus. Crossing the desktop breakpoint also closes it. Journey tabs use roving tabindex with arrows/Home/End. FAQ uses native details/summary. Filter results announce through a polite atomic status region; reset restores focus to search. Anchor target selection has a CSS active indication. Main content is reachable through a skip link.

CSS hover/press transitions only; global reduced-motion disables transitions and smooth scrolling. No content depends on a reveal effect. The no-JavaScript browser check confirms the headline and all demo cards are present. There is no claim that interactive filters work without JavaScript.

Anchor arrows indicate page direction: header/menu and the hero primary CTA point down; final-section CTAs point up. The hero secondary preview link retains its neutral right arrow. No on-page link uses an external-link arrow. The repair audit inspected all sections and interactive states at 360/390/768px, found no rendered control boxes smaller than 44px, and preserved the existing section layouts. This measurement covers element boxes, not browser-native subcontrols such as the search clear icon.

## Evidence and limits

Screenshots and measured ratios are in docs/screenshots and docs/verification.json. Lighthouse is a local simulated mobile lab run, not field evidence. See PROJECT_STATUS for performance, JavaScript target variance, test results and remaining limitations. Full accessibility conformance cannot be established by automated scans alone.
