# Design system — Phase 1A

## Direction and construction

Modern local-market warmth with an editorial reading rhythm. Green and ivory carry the page; marigold marks the hero, selected notices and closing section. Coral is used only in produce artwork. No stock imagery, raster hero, gradients, heavy shadows or animation library.

The original mark uses a 48-unit square: a trapezoidal stall canopy with scalloped lobes over an open rectangular counter. The lockup pairs this with a compact Instrument Sans wordmark. Logo supports full/compact and light/dark variants; icon.svg uses the same canopy/counter geometry. It contains no leaf or borrowed icon. The hero and section edge repeat the awning motif. Listing corners are cut with a CSS polygon to suggest tickets, with a dashed pickup-information tear line.

Seven original flat produce drawings share simple filled shapes and a few highlights. public/produce.svg is a cacheable same-origin symbol sprite; the reusable Produce component references it. Artwork is decorative when the produce name is already visible. The basket illustration has one descriptive accessible label and an explicit non-live caption.

## Typography

Fraunces variable normal for h1/h2 only; Instrument Sans variable normal for body, labels, controls and wordmark. Both were verified in the installed next/font/google catalog. Latin subset, display swap, fallback size adjustment and Next self-hosting; no browser requests to Google. Build-time network access is needed on a cold build. Fluid clamp sizes, balanced headings and body measures generally below 70ch. Two families only; no additional italic font file.

Odia plan: add Noto Sans Oriya only when actual Odia content is introduced; scope it to that content and test shaping, line-height, fallback and localized controls. No Odia font is currently loaded.

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

## Evidence and limits

Screenshots and measured ratios are in docs/screenshots and docs/verification.json. Lighthouse is a local simulated mobile lab run, not field evidence. See PROJECT_STATUS for performance, JavaScript target variance, test results and remaining limitations. Full accessibility conformance cannot be established by automated scans alone.
