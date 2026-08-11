import { render, screen } from "@testing-library/react";
import { stats } from "../data/seed";
import Overview from "../pages/Overview";

describe("Overview", () => {
  it("renders the page heading", () => {
    render(<Overview />);
    expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
  });

  it("renders a card for every stat", () => {
    render(<Overview />);
    for (const stat of stats) {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    }
  });

  it("shows recent activity", () => {
    render(<Overview />);
    expect(screen.getByText("Recent activity")).toBeInTheDocument();
    expect(screen.getByText("Whole Foods Market")).toBeInTheDocument();
  });
});
