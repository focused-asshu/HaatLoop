const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Format integer paise for display without changing the underlying amount. */
export function formatINR(paise: number): string {
  if (!Number.isSafeInteger(paise)) {
    throw new RangeError("Amount must be a safe integer number of paise.");
  }
  return inrFormatter.format(paise / 100);
}
