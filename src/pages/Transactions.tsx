import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { transactions, formatAmount, type Category } from "../data/seed";

type SortKey = "date" | "merchant" | "amount";

const categories = [...new Set(transactions.map((t) => t.category))].sort();

export default function Transactions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [ascending, setAscending] = useState(false);

  const rawCategory = searchParams.get("category") ?? "";
  const category: Category | "" = categories.includes(rawCategory as Category)
    ? (rawCategory as Category)
    : "";

  function setCategory(next: Category | "") {
    const params = new URLSearchParams(searchParams);
    if (next) params.set("category", next);
    else params.delete("category");
    setSearchParams(params, { replace: true });
  }

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = transactions.filter((t) => {
      if (category && t.category !== category) return false;
      if (!q) return true;
      return (
        t.merchant.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    });
    const sorted = [...filtered].sort((a, b) => {
      let cmp: number;
      if (sortKey === "amount") cmp = a.amount - b.amount;
      else cmp = a[sortKey].localeCompare(b[sortKey]);
      return ascending ? cmp : -cmp;
    });
    return sorted;
  }, [query, category, sortKey, ascending]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) setAscending((v) => !v);
    else {
      setSortKey(key);
      setAscending(key !== "date");
    }
  }

  const arrow = (key: SortKey) =>
    sortKey === key ? (ascending ? " ↑" : " ↓") : "";

  const emptyMessage = (() => {
    const parts: string[] = [];
    if (category) parts.push(`category “${category}”`);
    if (query.trim()) parts.push(`search “${query.trim()}”`);
    if (parts.length === 0) return "No transactions match.";
    if (parts.length === 1) return `No transactions match ${parts[0]}.`;
    return `No transactions match ${parts[0]} and ${parts[1]}.`;
  })();

  return (
    <div>
      <h1 className="pb-6 text-3xl font-bold tracking-tight">Transactions</h1>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by merchant or category…"
          aria-label="Search transactions"
          className="w-80 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category | "")}
          aria-label="Filter by category"
          className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
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
          <tbody className="divide-y divide-slate-100">
            {rows.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 text-slate-500">{t.date}</td>
                <td className="px-5 py-3 font-medium">{t.merchant}</td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {t.category}
                  </span>
                </td>
                <td
                  className={`px-5 py-3 text-right font-semibold ${
                    t.amount > 0 ? "text-emerald-600" : "text-slate-900"
                  }`}
                >
                  {formatAmount(t.amount)}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
