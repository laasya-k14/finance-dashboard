import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { transactions } from "../data/seed";
import Transactions from "../pages/Transactions";

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
});
