interface SavingsGoal {
  name: string;
  target: number;
  saved: number;
}

const goal: SavingsGoal = {
  name: "Emergency fund",
  target: 15000,
  saved: 9750,
};

export default function SavingsGoalCard() {
  const pct = Math.round((goal.saved / goal.target) * 100);
  return (
    <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Savings goal</h2>
        <span className="text-xl">🏦</span>
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-sm font-medium text-slate-600">{goal.name}</span>
        <span className="text-sm text-slate-500">
          ${goal.saved.toLocaleString()} of ${goal.target.toLocaleString()}
        </span>
      </div>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2 text-xs font-medium text-emerald-600">
        {pct}% of the way there
      </div>
    </div>
  );
}
