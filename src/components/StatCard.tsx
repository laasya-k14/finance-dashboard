import type { Stat } from "../data/seed";

export default function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-400">{stat.label}</span>
        <span className="text-xl">{stat.icon}</span>
      </div>
      <div className="mt-2 text-2xl font-bold text-slate-100">{stat.value}</div>
      <div
        className={`mt-1 text-xs font-medium ${
          stat.direction === "up" ? "text-emerald-400" : "text-rose-400"
        }`}
      >
        {stat.change}
      </div>
    </div>
  );
}
