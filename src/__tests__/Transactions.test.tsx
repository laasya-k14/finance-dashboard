import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router-dom";
import Transactions from "../pages/Transactions";
import { transactions } from "../data/seed";

function renderPage(initialEntries: string[] = ["/transactions"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Transactions />
    </MemoryRouter>,
  );
}

describe("Transactions", () => {
  it("renders every seeded transaction", () => {
    renderPage();
    // 1 header row + one row per transaction
    expect(screen.getAllByRole("row")).toHaveLength(transactions.length + 1);
  });

  it("filters rows by merchant search", async () => {
    renderPage();
    await userEvent.type(screen.getByRole("searchbox"), "netflix");
    expect(screen.getByText("Netflix")).toBeInTheDocument();
    expect(screen.queryByText("Uber")).not.toBeInTheDocument();
  });

  it("filters rows by category search", async () => {
    renderPage();
    await userEvent.type(screen.getByRole("searchbox"), "groceries");
    expect(screen.getByText("Whole Foods Market")).toBeInTheDocument();
    expect(screen.getByText("Trader Joe's")).toBeInTheDocument();
    expect(screen.queryByText("Netflix")).not.toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    renderPage();
    await userEvent.type(screen.getByRole("searchbox"), "zzzz");
    expect(screen.getByText(/no transactions match search “zzzz”/i)).toBeInTheDocument();
  });

  it("sorts by amount when the Amount header is clicked", async () => {
    renderPage();
    await userEvent.click(screen.getByText(/^Amount/));
    const cells = screen.getAllByRole("row").slice(1);
    const first = cells[0];
    // Ascending by amount: the biggest spend (One Medical -150.00) comes first
    expect(first).toHaveTextContent("One Medical");
  });

  it("defaults to newest-first by date", () => {
    renderPage();
    const firstDataRow = screen.getAllByRole("row")[1];
    expect(firstDataRow).toHaveTextContent("2026-08-07");
  });

  it("filters rows by category select", async () => {
    renderPage();
    await userEvent.selectOptions(screen.getByLabelText("Filter by category"), "Dining");
    expect(screen.getByText("Chipotle")).toBeInTheDocument();
    expect(screen.getByText("Blue Bottle Coffee")).toBeInTheDocument();
    expect(screen.queryByText("Netflix")).not.toBeInTheDocument();
  });

  it("initializes category filter from URL", () => {
    renderPage(["/transactions?category=Groceries"]);
    expect(screen.getByLabelText("Filter by category")).toHaveValue("Groceries");
    expect(screen.getByText("Whole Foods Market")).toBeInTheDocument();
    expect(screen.getByText("Trader Joe's")).toBeInTheDocument();
    expect(screen.queryByText("Netflix")).not.toBeInTheDocument();
  });

  it("ignores unknown category in URL", () => {
    renderPage(["/transactions?category=Unknown"]);
    expect(screen.getByLabelText("Filter by category")).toHaveValue("");
    expect(screen.getAllByRole("row")).toHaveLength(transactions.length + 1);
  });

  it("shows empty state for category-only filter", async () => {
    renderPage();
    await userEvent.selectOptions(screen.getByLabelText("Filter by category"), "Income");
    await userEvent.type(screen.getByRole("searchbox"), "netflix");
    expect(screen.getByText(/no transactions match category “Income” and search “netflix”/i)).toBeInTheDocument();
  });

  it("combines category filter with search", async () => {
    renderPage();
    await userEvent.selectOptions(screen.getByLabelText("Filter by category"), "Groceries");
    await userEvent.type(screen.getByRole("searchbox"), "whole");
    expect(screen.getByText("Whole Foods Market")).toBeInTheDocument();
    expect(screen.queryByText("Trader Joe's")).not.toBeInTheDocument();
  });

  it("preserves unrelated URL params when changing category", async () => {
    const router = createMemoryRouter(
      [{ path: "/transactions", element: <Transactions /> }],
      { initialEntries: ["/transactions?foo=bar"] },
    );
    render(<RouterProvider router={router} />);
    await userEvent.selectOptions(screen.getByLabelText("Filter by category"), "Dining");
    const search = router.state.location.search;
    expect(search).toContain("foo=bar");
    expect(search).toContain("category=Dining");
  });
});
