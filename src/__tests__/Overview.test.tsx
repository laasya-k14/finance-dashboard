import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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
});
