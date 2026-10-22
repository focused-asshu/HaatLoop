import { describe, expect, it } from "vitest";
import { formatINR } from "@/lib/currency";

describe("formatINR", () => {
  it("converts paise to rupees with Indian grouping and preserves cents", () => {
    expect(formatINR(12345678)).toBe("₹1,23,456.78");
    expect(formatINR(0)).toBe("₹0.00");
    expect(formatINR(1)).toBe("₹0.01");
    expect(formatINR(-150)).toBe("-₹1.50");
  });

  it.each([1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1])(
    "rejects invalid paise: %s",
    (amount) => {
      expect(() => formatINR(amount)).toThrow(RangeError);
    },
  );
});
