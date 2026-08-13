import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function renderSidebar() {
  return render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>,
  );
}

describe("Sidebar", () => {
  it("stays sticky while the page scrolls", () => {
    renderSidebar();

    const aside = screen.getByRole("complementary");
    expect(aside).toHaveClass("sticky", "top-0", "self-start", "h-screen");
  });

  it("renders primary navigation links", () => {
    renderSidebar();

    expect(screen.getByRole("link", { name: /Overview/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Transactions/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Budgets/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Recurring Bills/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Settings/i })).toBeInTheDocument();
  });
});
