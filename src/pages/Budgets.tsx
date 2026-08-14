import { budgets } from "../data/seed";

export default function Budgets() {
  return (
    <div>
      <h1 className="pb-6 text-3xl font-bold tracking-tight">Budgets</h1>
      <div className="grid grid-cols-3 gap-4">
        {budgets.map((b) => {
          const pct = Math.min(100, Math.round((b.spent / b.limit) * 100));
          const over = pct >= 90;
          return (
            <div
              key={b.category}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{b.category}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  ${b.spent.toFixed(0)} / ${b.limit}
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={`h-full rounded-full ${over ? "bg-rose-500" : "bg-indigo-500"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">{pct}% used</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
