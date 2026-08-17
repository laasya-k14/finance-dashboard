import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import Overview from "../pages/Overview";
import { stats } from "../data/seed";

function renderPage() {
  return render(
    <MemoryRouter>
      <Overview />
    </MemoryRouter>,
  );
}

describe("Overview", () => {
  it("renders the page heading", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
  });

  it("renders a card for every stat", () => {
    renderPage();
    for (const stat of stats) {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    }
  });

  it("shows recent activity", () => {
    renderPage();
    expect(screen.getByText("Recent activity")).toBeInTheDocument();
    expect(screen.getByText("Whole Foods Market")).toBeInTheDocument();
  });

  it("uses a dark background and light text", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    const main = container.querySelector("main");
    expect(main).toHaveClass("bg-slate-950", "text-slate-100");
  });

  it("does not darken other pages", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/transactions"]}>
        <App />
      </MemoryRouter>,
    );
    expect(container.querySelector("main")).not.toHaveClass("bg-slate-950");
  });
});
