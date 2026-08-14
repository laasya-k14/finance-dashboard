import { useMemo, useState } from "react";
import {
  recurringBills,
  formatCurrency,
  getBillStatus,
  monthlyRecurringTotal,
  daysUntilDue,
  type BillStatus,
} from "../data/seed";

type SortKey = "name" | "amount" | "cadence" | "nextDue";

const statusClass: Record<BillStatus, string> = {
  Overdue: "bg-rose-100 text-rose-700",
  "Due soon": "bg-amber-100 text-amber-800",
  Upcoming: "bg-slate-100 text-slate-600",
};

const sortButtonClass =
  "cursor-pointer bg-transparent p-0 text-xs font-medium uppercase tracking-wide text-slate-500";

function dueLabel(nextDue: string): string {
  const days = daysUntilDue(nextDue);
  if (days < 0) {
    const n = Math.abs(days);
    return `${n} day${n === 1 ? "" : "s"} ago`;
  }
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `In ${days} days`;
}

export default function RecurringBills() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("nextDue");
  const [ascending, setAscending] = useState(true);

  const monthlyTotal = monthlyRecurringTotal();
  const overdue = recurringBills.filter((b) => getBillStatus(b.nextDue) === "Overdue");
  const dueSoon = recurringBills.filter((b) => getBillStatus(b.nextDue) === "Due soon");
  const dueSoonAmount = dueSoon.reduce((sum, b) => sum + b.amount, 0);
  const overdueAmount = overdue.reduce((sum, b) => sum + b.amount, 0);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = recurringBills.filter((b) => {
      const status = getBillStatus(b.nextDue).toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        b.cadence.toLowerCase().includes(q) ||
        status.includes(q)
      );
    });
    const sorted = [...filtered].sort((a, b) => {
      let cmp: number;
      if (sortKey === "amount") cmp = a.amount - b.amount;
      else cmp = a[sortKey].localeCompare(b[sortKey]);
      return ascending ? cmp : -cmp;
    });
    return sorted;
  }, [query, sortKey, ascending]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) setAscending((v) => !v);
    else {
      setSortKey(key);
      setAscending(true);
    }
  }

  const arrow = (key: SortKey) =>
    sortKey === key ? (ascending ? " ↑" : " ↓") : "";

  const ariaSort = (key: SortKey): "ascending" | "descending" | "none" => {
    if (sortKey !== key) return "none";
    return ascending ? "ascending" : "descending";
  };

  return (
    <div>
      <h1 className="pb-6 text-3xl font-bold tracking-tight">Recurring Bills</h1>

      <section aria-label="Bills summary" className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-slate-500">Monthly recurring</div>
          <div className="mt-2 text-2xl font-bold">{formatCurrency(monthlyTotal)}</div>
          <div className="mt-1 text-xs font-medium text-slate-500">
            {recurringBills.length} bills
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-slate-500">Due soon</div>
          <div className="mt-2 text-2xl font-bold">{formatCurrency(dueSoonAmount)}</div>
          <div className="mt-1 text-xs font-medium text-amber-700">
            {dueSoon.length} bill{dueSoon.length === 1 ? "" : "s"} in the next 7 days
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-slate-500">Overdue</div>
          <div className="mt-2 text-2xl font-bold">{formatCurrency(overdueAmount)}</div>
          <div className="mt-1 text-xs font-medium text-rose-600">
            {overdue.length} bill{overdue.length === 1 ? "" : "s"} past due
          </div>
        </div>
      </section>

      {(overdue.length > 0 || dueSoon.length > 0) && (
        <div
          role="status"
          className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-900"
        >
          <span className="font-semibold">Reminder: </span>
          {overdue.length > 0 && (
            <>
              {overdue.length} overdue ({formatCurrency(overdueAmount)})
              {dueSoon.length > 0 ? " and " : "."}
            </>
          )}
          {dueSoon.length > 0 && (
            <>
              {dueSoon.length} due soon ({formatCurrency(dueSoonAmount)}).
            </>
          )}
        </div>
      )}

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, cadence, or status…"
        aria-label="Search recurring bills"
        className="mb-4 w-80 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none"
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">
            Recurring bills with amount, billing cadence, next due date, and reminder status
          </caption>
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" aria-sort={ariaSort("name")} className="px-5 py-3">
                <button type="button" onClick={() => toggleSort("name")} className={sortButtonClass}>
                  Name{arrow("name")}
                </button>
              </th>
              <th scope="col" aria-sort={ariaSort("cadence")} className="px-5 py-3">
                <button type="button" onClick={() => toggleSort("cadence")} className={sortButtonClass}>
                  Cadence{arrow("cadence")}
                </button>
              </th>
              <th scope="col" aria-sort={ariaSort("nextDue")} className="px-5 py-3">
                <button type="button" onClick={() => toggleSort("nextDue")} className={sortButtonClass}>
                  Next due{arrow("nextDue")}
                </button>
              </th>
              <th scope="col" className="px-5 py-3">
                Status
              </th>
              <th scope="col" aria-sort={ariaSort("amount")} className="px-5 py-3 text-right">
                <button type="button" onClick={() => toggleSort("amount")} className={sortButtonClass}>
                  Amount{arrow("amount")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((b) => {
              const status = getBillStatus(b.nextDue);
              return (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium">{b.name}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {b.cadence}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-500">
                    <div>{b.nextDue}</div>
                    <div className="text-xs">{dueLabel(b.nextDue)}</div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClass[status]}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-semibold">
                    {formatCurrency(b.amount)}
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-slate-400">
                  No bills match “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
