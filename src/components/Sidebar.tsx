import { NavLink } from "react-router-dom";

// Deliberately NOT sticky: the sidebar scrolls with the page. Making it
// sticky is one of the scripted live-demo changes (see TICKETS.md, FIN-5).
const links = [
  { to: "/", label: "Overview", icon: "🏠" },
  { to: "/transactions", label: "Transactions", icon: "🧾" },
  { to: "/budgets", label: "Budgets", icon: "🎯" },
  { to: "/bills", label: "Recurring Bills", icon: "🔁" },
  { to: "/reports", label: "Reports", icon: "📊" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-slate-200 bg-white px-4 py-8">
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
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
