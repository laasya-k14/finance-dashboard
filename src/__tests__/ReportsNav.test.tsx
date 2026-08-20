import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";

function renderApp(initialPath = "/") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  );
}

describe("Reports navigation", () => {
  it("shows a Reports link in the sidebar", () => {
    renderApp();
    expect(screen.getByRole("link", { name: /reports/i })).toBeInTheDocument();
  });

  it("navigates to the Reports page", async () => {
    renderApp();
    await userEvent.click(screen.getByRole("link", { name: /reports/i }));
    expect(screen.getByRole("heading", { name: "Reports" })).toBeInTheDocument();
    expect(screen.getByText(/spending reports are coming soon/i)).toBeInTheDocument();
  });
});
