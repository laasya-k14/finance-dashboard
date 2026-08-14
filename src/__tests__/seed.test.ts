import {
  BILL_AS_OF_DATE,
  daysUntilDue,
  getBillStatus,
  monthlyEquivalent,
} from "../data/seed";

describe("recurring bill reminders", () => {
  it("classifies past due dates as overdue", () => {
    expect(getBillStatus("2026-08-13")).toBe("Overdue");
    expect(daysUntilDue("2026-08-13")).toBe(-1);
  });

  it("classifies today through 7 days as due soon", () => {
    expect(getBillStatus(BILL_AS_OF_DATE)).toBe("Due soon");
    expect(getBillStatus("2026-08-21")).toBe("Due soon");
    expect(daysUntilDue("2026-08-21")).toBe(7);
  });

  it("classifies dates more than 7 days out as upcoming", () => {
    expect(getBillStatus("2026-08-22")).toBe("Upcoming");
  });

  it("converts billing cadence into monthly spend", () => {
    expect(monthlyEquivalent(40, "Weekly")).toBeCloseTo((40 * 52) / 12);
    expect(monthlyEquivalent(100, "Monthly")).toBe(100);
    expect(monthlyEquivalent(300, "Quarterly")).toBe(100);
    expect(monthlyEquivalent(120, "Yearly")).toBe(10);
  });
});
