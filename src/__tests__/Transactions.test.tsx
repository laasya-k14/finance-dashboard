import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import Transactions from "../pages/Transactions";
import { transactions } from "../data/seed";

function LocationProbe() {
  const { search } = useLocation();
  return <div data-testid="location-search">{search}</div>;
}

function renderPage(initialEntries: string[] = ["/transactions"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Transactions />
      <LocationProbe />
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
    expect(screen.getByRole("searchbox")).toHaveValue("netflix");
    expect(screen.getByText("Netflix")).toBeInTheDocument();
    expect(screen.queryByText("Uber")).not.toBeInTheDocument();
  });

  it("keeps the typed search text when the result count changes", async () => {
    renderPage();
    const input = screen.getByRole("searchbox");
    await userEvent.type(input, "netflix");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("netflix");
    expect(screen.getAllByRole("row")).toHaveLength(2); // header + Netflix
  });

  it("filters rows by category search", async () => {
    renderPage();
    await userEvent.type(screen.getByRole("searchbox"), "groceries");
    expect(screen.getByText("Whole Foods Market")).toBeInTheDocument();
    expect(screen.getByText("Trader Joe's")).toBeInTheDocument();
    expect(screen.queryByText("Netflix")).not.toBeInTheDocument();
  });

  it("filters rows by category select", async () => {
    renderPage();
    await userEvent.selectOptions(screen.getByRole("combobox"), "Dining");
    expect(screen.getByText("Blue Bottle Coffee")).toBeInTheDocument();
    expect(screen.getByText("Chipotle")).toBeInTheDocument();
    expect(screen.queryByText("Netflix")).not.toBeInTheDocument();
  });

  it("combines category filter with search", async () => {
    renderPage();
    await userEvent.selectOptions(screen.getByRole("combobox"), "Dining");
    await userEvent.type(screen.getByRole("searchbox"), "chipotle");
    expect(screen.getByText("Chipotle")).toBeInTheDocument();
    expect(screen.queryByText("Blue Bottle Coffee")).not.toBeInTheDocument();
  });

  it("initializes category filter from the URL", () => {
    renderPage(["/transactions?category=Entertainment"]);
    expect(screen.getByRole("combobox")).toHaveValue("Entertainment");
    expect(screen.getByText("Netflix")).toBeInTheDocument();
    expect(screen.queryByText("Uber")).not.toBeInTheDocument();
  });

  it("ignores an unknown category in the URL", () => {
    renderPage(["/transactions?category=Bogus"]);
    expect(screen.getByRole("combobox")).toHaveValue("");
    expect(screen.getAllByRole("row")).toHaveLength(transactions.length + 1);
  });

  it("preserves unrelated URL params when updating filters", async () => {
    renderPage(["/transactions?utm_source=email"]);
    await userEvent.selectOptions(screen.getByRole("combobox"), "Dining");
    expect(screen.getByTestId("location-search")).toHaveTextContent(
      "?utm_source=email&category=Dining",
    );
    await userEvent.selectOptions(screen.getByRole("combobox"), "");
    expect(screen.getByTestId("location-search")).toHaveTextContent("?utm_source=email");
  });

  it("shows an empty state when nothing matches", async () => {
    renderPage();
    await userEvent.type(screen.getByRole("searchbox"), "zzzz");
    expect(screen.getByText(/no transactions match search “zzzz”/i)).toBeInTheDocument();
  });

  it("shows an empty state when category filter excludes everything", async () => {
    renderPage();
    await userEvent.selectOptions(screen.getByRole("combobox"), "Dining");
    await userEvent.type(screen.getByRole("searchbox"), "netflix");
    expect(
      screen.getByText(/no transactions match search “netflix” and category “dining”/i),
    ).toBeInTheDocument();
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
});
