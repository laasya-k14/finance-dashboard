import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../components/Sidebar";

describe("Sidebar", () => {
  it("stays sticky while the page scrolls", () => {
    const { container } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    const aside = container.querySelector("aside");
    expect(aside).toBeTruthy();
    expect(aside?.className).toMatch(/\bsticky\b/);
    expect(aside?.className).toMatch(/\btop-0\b/);
    expect(aside?.className).toMatch(/\bself-start\b/);
    expect(aside?.className).toMatch(/\bh-screen\b/);
  });

  it("renders primary navigation links", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /Overview/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Transactions/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Budgets/i })).toBeInTheDocument();
  });
});
