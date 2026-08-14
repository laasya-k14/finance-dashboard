import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Transactions from "../pages/Transactions";
import { transactions } from "../data/seed";

function setDateRange(start: string, end: string) {
  fireEvent.change(screen.getByLabelText("Start date"), {
    target: { value: start },
  });
  fireEvent.change(screen.getByLabelText("End date"), {
    target: { value: end },
  });
}

describe("Transactions", () => {
  it("renders every seeded transaction", () => {
    render(<Transactions />);
    // 1 header row + one row per transaction
    expect(screen.getAllByRole("row")).toHaveLength(transactions.length + 1);
  });

  it("filters rows by merchant search", async () => {
    render(<Transactions />);
    await userEvent.type(screen.getByRole("searchbox"), "netflix");
    expect(screen.getByText("Netflix")).toBeInTheDocument();
    expect(screen.queryByText("Uber")).not.toBeInTheDocument();
  });

  it("filters rows by category search", async () => {
    render(<Transactions />);
    await userEvent.type(screen.getByRole("searchbox"), "groceries");
    expect(screen.getByText("Whole Foods Market")).toBeInTheDocument();
    expect(screen.getByText("Trader Joe's")).toBeInTheDocument();
    expect(screen.queryByText("Netflix")).not.toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    render(<Transactions />);
    await userEvent.type(screen.getByRole("searchbox"), "zzzz");
    expect(screen.getByText(/no transactions match/i)).toBeInTheDocument();
  });

  it("sorts by amount when the Amount header is clicked", async () => {
    render(<Transactions />);
    await userEvent.click(screen.getByText(/^Amount/));
    const cells = screen.getAllByRole("row").slice(1);
    const first = cells[0];
    // Ascending by amount: the biggest spend (One Medical -150.00) comes first
    expect(first).toHaveTextContent("One Medical");
  });

  it("defaults to newest-first by date", () => {
    render(<Transactions />);
    const firstDataRow = screen.getAllByRole("row")[1];
    expect(firstDataRow).toHaveTextContent("2026-08-07");
  });

  it("keeps transactions outside a custom date range out of the table", () => {
    render(<Transactions />);
    setDateRange("2026-08-01", "2026-08-05");

    expect(screen.getByText("CVS Pharmacy")).toBeInTheDocument();
    expect(screen.getByText("Uber")).toBeInTheDocument();
    expect(screen.getByText("Netflix")).toBeInTheDocument();
    expect(screen.queryByText("Amazon")).not.toBeInTheDocument();
    expect(screen.queryByText("Blue Bottle Coffee")).not.toBeInTheDocument();
    expect(screen.queryByText("Whole Foods Market")).not.toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(8);
  });

  it("includes transactions on the start and end dates", () => {
    render(<Transactions />);
    setDateRange("2026-07-31", "2026-08-01");

    expect(screen.getByText("Amazon")).toBeInTheDocument();
    expect(screen.getByText("CVS Pharmacy")).toBeInTheDocument();
    expect(screen.queryByText("Spotify")).not.toBeInTheDocument();
    expect(screen.queryByText("Shell Gas Station")).not.toBeInTheDocument();
  });

  it("filters with only a start date or only an end date", () => {
    render(<Transactions />);
    fireEvent.change(screen.getByLabelText("Start date"), {
      target: { value: "2026-08-06" },
    });
    expect(screen.getByText("Whole Foods Market")).toBeInTheDocument();
    expect(screen.getByText("Blue Bottle Coffee")).toBeInTheDocument();
    expect(screen.queryByText("Uber")).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Start date"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText("End date"), {
      target: { value: "2026-07-23" },
    });
    expect(screen.getByText("AMC Theatres")).toBeInTheDocument();
    expect(screen.getByText("Target")).toBeInTheDocument();
    expect(screen.queryByText("Acme Corp Payroll")).not.toBeInTheDocument();
  });

  it("combines search with the date range", async () => {
    render(<Transactions />);
    setDateRange("2026-08-01", "2026-08-07");
    await userEvent.type(screen.getByRole("searchbox"), "groceries");
    expect(screen.getByText("Whole Foods Market")).toBeInTheDocument();
    expect(screen.getByText("Trader Joe's")).toBeInTheDocument();
    expect(screen.queryByText("Safeway")).not.toBeInTheDocument();
  });

  it("clears the date range and shows every transaction again", async () => {
    render(<Transactions />);
    setDateRange("2026-08-01", "2026-08-05");
    expect(screen.queryByText("Amazon")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /clear dates/i }));
    expect(screen.getByText("Amazon")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(transactions.length + 1);
  });

  it("shows an empty state when the date range has no matches", () => {
    render(<Transactions />);
    setDateRange("2026-01-01", "2026-01-31");
    expect(
      screen.getByText(/no transactions in the selected date range/i),
    ).toBeInTheDocument();
  });
});
