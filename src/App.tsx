import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Overview from "./pages/Overview";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import RecurringBills from "./pages/RecurringBills";
import Settings from "./pages/Settings";

export default function App() {
  const isOverview = useLocation().pathname === "/";
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />
      <main
        className={`flex-1 px-10 py-8 ${
          isOverview ? "bg-slate-950 text-slate-50" : ""
        }`}
      >
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/bills" element={<RecurringBills />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}
