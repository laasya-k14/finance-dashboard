import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Budgets from "./pages/Budgets";
import Overview from "./pages/Overview";
import RecurringBills from "./pages/RecurringBills";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";

export default function App() {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />
      <main className="flex-1 px-10 py-8">
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
