export function Logo({
  compact = false,
  light = false,
}: {
  compact?: boolean;
  light?: boolean;
}) {
  return (
    <span className={`brand ${light ? "brand-light" : ""}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        width="40"
        height="40"
        fill="none"
      >
        <path
          d="M8 19 13 8h22l5 11v3a6 6 0 0 1-8 5 6 6 0 0 1-8 0 6 6 0 0 1-8 0 6 6 0 0 1-8-5Z"
          fill="currentColor"
        />
        <path
          d="M12 29v10h24V29M19 17l2-9m8 9-2-9"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      {compact ? (
        <span className="sr-only">HaatLoop</span>
      ) : (
        <span>
          HaatLoop<span className="brand-dot">.</span>
        </span>
      )}
    </span>
  );
}
