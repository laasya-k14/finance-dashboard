import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { ThemeProvider, THEME_STORAGE_KEY } from "../theme";

function renderApp(route = "/") {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe("theme toggle", () => {
  it("defaults to light mode", () => {
    renderApp();
    expect(document.documentElement).not.toHaveClass("dark");
    expect(screen.getByRole("switch", { name: "Dark mode" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("switches the app to dark mode from the sidebar", async () => {
    renderApp();
    await userEvent.click(screen.getByRole("switch", { name: "Dark mode" }));
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(screen.getByRole("switch", { name: "Dark mode" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("switches back to light mode", async () => {
    renderApp();
    const toggle = screen.getByRole("switch", { name: "Dark mode" });
    await userEvent.click(toggle);
    await userEvent.click(toggle);
    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
  });

  it("restores a stored dark theme", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    renderApp();
    expect(document.documentElement).toHaveClass("dark");
    expect(screen.getByRole("switch", { name: "Dark mode" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("toggles theme from Settings and shows the current value", async () => {
    renderApp("/settings");
    const themeRow = screen.getByText("Theme").closest("li");
    expect(themeRow).toHaveTextContent("Light");

    await userEvent.click(within(themeRow!).getByRole("switch", { name: "Dark mode" }));

    expect(document.documentElement).toHaveClass("dark");
    expect(themeRow).toHaveTextContent("Dark");
    expect(screen.getAllByRole("switch", { name: "Dark mode" })[0]).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });
});
