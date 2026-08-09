// FIN-4: Recurring Bills page — not yet implemented.
// This page is intentionally an empty state; it gets built live during the
// demo recording (see TICKETS.md).
export default function RecurringBills() {
  return (
    <div>
      <h1 className="pb-6 text-3xl font-bold tracking-tight">Recurring Bills</h1>
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-24 text-center">
        <span className="text-4xl">🔁</span>
        <p className="mt-4 text-sm font-medium text-slate-600">
          Nothing here yet
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Recurring bill tracking is coming soon.
        </p>
      </div>
    </div>
  );
}
