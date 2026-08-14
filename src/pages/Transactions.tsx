import { useMemo, useState } from "react";
import { transactions, formatAmount } from "../data/seed";

type SortKey = "date" | "merchant" | "amount";

export default function Transactions() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [ascending, setAscending] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = transactions.filter(
      (t) =>
        t.merchant.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q),
    );
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
      setAscending(key !== "date");
    }
  }

  const arrow = (key: SortKey) =>
    sortKey === key ? (ascending ? " ↑" : " ↓") : "";

  return (
    <div>
      <h1 className="pb-6 text-3xl font-bold tracking-tight">Transactions</h1>
      <input
        key={rows.length}
        type="search"
        defaultValue={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by merchant or category…"
        aria-label="Search transactions"
        className="mb-4 w-80 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
            <tr>
              <th className="cursor-pointer px-5 py-3" onClick={() => toggleSort("date")}>
                Date{arrow("date")}
              </th>
              <th className="cursor-pointer px-5 py-3" onClick={() => toggleSort("merchant")}>
                Merchant{arrow("merchant")}
              </th>
              <th className="px-5 py-3">Category</th>
              <th className="cursor-pointer px-5 py-3 text-right" onClick={() => toggleSort("amount")}>
                Amount{arrow("amount")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
                <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{t.date}</td>
                <td className="px-5 py-3 font-medium">{t.merchant}</td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {t.category}
                  </span>
                </td>
                <td
                  className={`px-5 py-3 text-right font-semibold ${
                    t.amount > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-slate-100"
                  }`}
                >
                  {formatAmount(t.amount)}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-slate-400">
                  No transactions match “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
