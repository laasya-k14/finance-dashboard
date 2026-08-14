import type { Stat } from "../data/seed";

export default function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {stat.label}
        </span>
        <span className="text-xl">{stat.icon}</span>
      </div>
      <div className="mt-2 text-2xl font-bold">{stat.value}</div>
      <div
        className={`mt-1 text-xs font-medium ${
          stat.direction === "up"
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-rose-500 dark:text-rose-400"
        }`}
      >
        {stat.change}
      </div>
    </div>
  );
}
