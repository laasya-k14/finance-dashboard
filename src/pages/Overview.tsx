import StatCard from "../components/StatCard";
import { stats, transactions, formatAmount } from "../data/seed";

export default function Overview() {
  const recent = transactions.slice(0, 6);
  return (
    <div>
      <h1 className="pb-6 text-3xl font-bold tracking-tight">Overview</h1>
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <h2 className="mt-10 mb-3 text-lg font-semibold">Recent activity</h2>
      <div className="rounded-xl border border-slate-700 bg-slate-900 shadow-sm">
        <ul className="divide-y divide-slate-800">
          {recent.map((t) => (
            <li key={t.id} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <div className="text-sm font-medium text-slate-100">{t.merchant}</div>
                <div className="text-xs text-slate-400">
                  {t.date} · {t.category}
                </div>
              </div>
              <span
                className={`text-sm font-semibold ${
                  t.amount > 0 ? "text-emerald-400" : "text-slate-100"
                }`}
              >
                {formatAmount(t.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
