/**
 * Inclusive calendar-date comparison for ISO `YYYY-MM-DD` strings.
 *
 * Transaction dates in this app are date-only (no time). Comparing the
 * strings directly matches chronological order and avoids timezone shifts
 * from `new Date("YYYY-MM-DD")`, which parses as UTC midnight and can pull
 * the previous local day into (or out of) the selected range.
 */
export function isWithinDateRange(
  date: string,
  start: string,
  end: string,
): boolean {
  if (start && date < start) return false;
  if (end && date > end) return false;
  return true;
}
