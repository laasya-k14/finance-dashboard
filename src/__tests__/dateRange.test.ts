import { describe, expect, it } from "vitest";
import { isWithinDateRange } from "../utils/dateRange";

describe("isWithinDateRange", () => {
  it("includes the start and end dates", () => {
    expect(isWithinDateRange("2026-08-01", "2026-08-01", "2026-08-05")).toBe(true);
    expect(isWithinDateRange("2026-08-05", "2026-08-01", "2026-08-05")).toBe(true);
  });

  it("excludes dates before the start or after the end", () => {
    expect(isWithinDateRange("2026-07-31", "2026-08-01", "2026-08-05")).toBe(false);
    expect(isWithinDateRange("2026-08-06", "2026-08-01", "2026-08-05")).toBe(false);
  });

  it("treats an empty bound as open-ended", () => {
    expect(isWithinDateRange("2026-07-22", "", "2026-07-31")).toBe(true);
    expect(isWithinDateRange("2026-08-01", "", "2026-07-31")).toBe(false);
    expect(isWithinDateRange("2026-08-07", "2026-08-01", "")).toBe(true);
    expect(isWithinDateRange("2026-07-31", "2026-08-01", "")).toBe(false);
  });

  it("keeps adjacent calendar days out of the range", () => {
    // Seeded data includes 2026-07-31 (Amazon) immediately before August.
    // A From of 2026-08-01 must not include that July row.
    expect(isWithinDateRange("2026-07-31", "2026-08-01", "2026-08-07")).toBe(
      false,
    );
    expect(isWithinDateRange("2026-08-01", "2026-08-01", "2026-08-07")).toBe(
      true,
    );
  });
});
