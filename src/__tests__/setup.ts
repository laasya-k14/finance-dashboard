import "@testing-library/jest-dom";
import { THEME_STORAGE_KEY } from "../theme";

afterEach(() => {
  localStorage.removeItem(THEME_STORAGE_KEY);
  document.documentElement.classList.remove("dark");
});
