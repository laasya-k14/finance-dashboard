import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecurringBills from "../pages/RecurringBills";
import {
  recurringBills,
  formatCurrency,
  getBillStatus,
  monthlyRecurringTotal,
} from "../data/seed";

describe("RecurringBills", () => {
  it("renders the page heading and every seeded bill", () => {
    render(<RecurringBills />);
    expect(screen.getByRole("heading", { name: "Recurring Bills" })).toBeInTheDocument();
    for (const bill of recurringBills) {
      expect(screen.getByText(bill.name)).toBeInTheDocument();
    }
    expect(screen.getAllByRole("row")).toHaveLength(recurringBills.length + 1);
  });

  it("shows monthly recurring spend and reminder totals", () => {
    render(<RecurringBills />);
    const dueSoon = recurringBills.filter((b) => getBillStatus(b.nextDue) === "Due soon");
    const overdue = recurringBills.filter((b) => getBillStatus(b.nextDue) === "Overdue");
    const dueSoonAmount = dueSoon.reduce((sum, b) => sum + b.amount, 0);
    const overdueAmount = overdue.reduce((sum, b) => sum + b.amount, 0);

    expect(screen.getByText("Monthly recurring")).toBeInTheDocument();
    expect(screen.getByText(formatCurrency(monthlyRecurringTotal()))).toBeInTheDocument();
    expect(screen.getByText(`${dueSoon.length} bills in the next 7 days`)).toBeInTheDocument();
    expect(screen.getByText(`${overdue.length} bill past due`)).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      `Reminder: ${overdue.length} overdue (${formatCurrency(overdueAmount)}) and ${dueSoon.length} due soon (${formatCurrency(dueSoonAmount)}).`,
    );
  });

  it("defaults to soonest due date first", () => {
    render(<RecurringBills />);
    const firstDataRow = screen.getAllByRole("row")[1];
    expect(firstDataRow).toHaveTextContent("New York Times");
    expect(firstDataRow).toHaveTextContent("2026-08-10");
    expect(firstDataRow).toHaveTextContent("Overdue");
  });

  it("filters rows by bill name", async () => {
    render(<RecurringBills />);
    await userEvent.type(screen.getByRole("searchbox"), "netflix");
    expect(screen.getByText("Netflix")).toBeInTheDocument();
    expect(screen.queryByText("Spotify")).not.toBeInTheDocument();
  });

  it("filters rows by cadence", async () => {
    render(<RecurringBills />);
    await userEvent.type(screen.getByRole("searchbox"), "yearly");
    expect(screen.getByText("Amazon Prime")).toBeInTheDocument();
    expect(screen.queryByText("Netflix")).not.toBeInTheDocument();
  });

  it("filters rows by reminder status", async () => {
    render(<RecurringBills />);
    await userEvent.type(screen.getByRole("searchbox"), "overdue");
    expect(screen.getByText("New York Times")).toBeInTheDocument();
    expect(screen.queryByText("Netflix")).not.toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    render(<RecurringBills />);
    await userEvent.type(screen.getByRole("searchbox"), "zzzz");
    expect(screen.getByText(/no bills match/i)).toBeInTheDocument();
  });

  it("sorts by amount when the Amount header is clicked", async () => {
    render(<RecurringBills />);
    await userEvent.click(screen.getByRole("button", { name: /amount/i }));
    const first = screen.getAllByRole("row")[1];
    expect(first).toHaveTextContent("Spotify");
  });

  it("sorts by name when the Name header is clicked", async () => {
    render(<RecurringBills />);
    await userEvent.click(screen.getByRole("button", { name: /name/i }));
    const first = screen.getAllByRole("row")[1];
    expect(first).toHaveTextContent("Amazon Prime");
  });

  it("labels due-soon bills for reminder scanning", () => {
    render(<RecurringBills />);
    const pge = screen.getByText("Pacific Gas & Electric").closest("tr");
    expect(pge).not.toBeNull();
    expect(within(pge as HTMLElement).getByText("Due soon")).toBeInTheDocument();
    expect(within(pge as HTMLElement).getByText("In 2 days")).toBeInTheDocument();
  });
});
