import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import Settings from "../pages/Settings";
import { ThemeProvider } from "../theme";

function renderSettings() {
  return render(
    <ThemeProvider>
      <Settings />
    </ThemeProvider>,
  );
}

function renderApp() {
  return render(
    <ThemeProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe("theme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "";
  });

  it("defaults to light mode", () => {
    renderSettings();
    const toggle = screen.getByRole("switch", { name: "Dark mode" });
    expect(toggle).toHaveAttribute("aria-checked", "false");
    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("toggles dark mode from Settings and persists it", async () => {
    renderSettings();
    await userEvent.click(screen.getByRole("switch", { name: "Dark mode" }));
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("finley-theme")).toBe("dark");
    expect(screen.getByRole("switch", { name: "Dark mode" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("restores the saved dark theme on load", () => {
    localStorage.setItem("finley-theme", "dark");
    renderSettings();
    expect(document.documentElement).toHaveClass("dark");
    expect(screen.getByRole("switch", { name: "Dark mode" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("toggles dark mode from the sidebar", async () => {
    renderApp();
    const sidebarToggle = screen.getByRole("button", {
      name: "Switch to dark mode",
    });
    await userEvent.click(sidebarToggle);
    expect(document.documentElement).toHaveClass("dark");
    expect(screen.getByRole("button", { name: "Switch to light mode" })).toBeInTheDocument();
  });
});
