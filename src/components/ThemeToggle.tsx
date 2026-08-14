import { useTheme } from "../theme";

export default function ThemeToggle({ labeled = false }: { labeled?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      onClick={toggleTheme}
      className={
        labeled
          ? "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          : "inline-flex items-center"
      }
    >
      {labeled && <span>Dark mode</span>}
      <span
        className={`relative inline-flex h-6 w-10 shrink-0 rounded-full transition-colors ${
          isDark ? "bg-indigo-500" : "bg-slate-300 dark:bg-slate-600"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            isDark ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}
