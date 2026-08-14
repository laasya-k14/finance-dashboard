import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

// Deliberately NOT sticky: the sidebar scrolls with the page. Making it
// sticky is one of the scripted live-demo changes (see TICKETS.md, FIN-5).
const links = [
  { to: "/", label: "Overview", icon: "🏠" },
  { to: "/transactions", label: "Transactions", icon: "🧾" },
  { to: "/budgets", label: "Budgets", icon: "🎯" },
  { to: "/bills", label: "Recurring Bills", icon: "🔁" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-10 flex items-center gap-2 px-2">
        <span className="text-2xl">🪙</span>
        <span className="text-xl font-bold tracking-tight">Finley</span>
      </div>
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`
            }
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-8">
        <ThemeToggle compact />
      </div>
    </aside>
  );
}
