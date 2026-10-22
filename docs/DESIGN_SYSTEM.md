# Foundation design system

Phase 0 is a quiet status screen, not the marketplace homepage. It uses a system font stack, generous spacing, solid colors, a modest border, and no imagery, gradients, or shadows. It contains no illustrative inventory. The tagline expresses the intended product direction, not measured outcomes.

Tokens live in `src/app/globals.css` and are exposed through Tailwind v4 `@theme inline`.

| Semantic token | Value   | Intended use                                   |
| -------------- | ------- | ---------------------------------------------- |
| background     | #F7F4EA | Warm ivory page                                |
| foreground     | #202D27 | Body text                                      |
| surface        | #FFFFFF | Development notice                             |
| primary        | #164B35 | Brand, labels, links                           |
| secondary      | #F6BA49 | Development badge background                   |
| border         | #747D75 | Notice boundary                                |
| focus-ring     | #164B35 | Keyboard focus                                 |
| success        | #164B35 | Reserved semantic token; no current success UI |
| warning        | #F6BA49 | Reserved semantic token                        |
| destructive    | #E56C50 | Reserved semantic token; not current text      |

Coral and marigold must not be assumed suitable for text on ivory or white. Future components need their own contrast checks and accessible state labels.

## Contrast verification

Calculated using WCAG sRGB linearization and `(lighter luminance + 0.05) / (darker luminance + 0.05)`. All text pairs exceed the 4.5:1 AA threshold for normal text, including pairs used for large text.

| Text / background       | Calculated ratio |
| ----------------------- | ---------------- |
| Primary / background    | 9.12:1           |
| Foreground / background | 13.02:1          |
| Foreground / surface    | 14.32:1          |
| Foreground / secondary  | 8.21:1           |

The border contrasts 4.26:1 against white and 3.87:1 against ivory. These calculations cover the defined colors, not a complete accessibility audit.

Current text pairs: primary/background, foreground/background, foreground/surface, and foreground/secondary. The not-found link uses primary/background. There is no opacity applied to text.

## Layout and accessibility

The content is capped at 64rem and uses 24px horizontal padding at 360px, increasing to 48px on larger screens. Text wraps naturally with no fixed content height. The notice is capped at 36rem. The page has one h1 and a main landmark. English is declared; the viewport permits zoom. The not-found page includes a functional home link and visible keyboard focus.

No motion is introduced. A reduced-motion rule disables future CSS transitions/animations for users who request it. Font selection, custom iconography, additional components, localization, and a full homepage are deferred to Phase 1 or later approved scope.
