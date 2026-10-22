export type ProduceKind =
  "tomato" | "chilli" | "brinjal" | "greens" | "lemon" | "onion" | "potato";

/** Original decorative artwork, shared as a cacheable same-origin SVG sprite. */
export function Produce({
  kind,
  className = "",
}: {
  kind: ProduceKind;
  className?: string;
}) {
  return (
    <svg
      className={`produce ${className}`}
      viewBox="0 0 160 140"
      aria-hidden="true"
      focusable="false"
    >
      <use href={`/produce.svg#${kind}`} />
    </svg>
  );
}
