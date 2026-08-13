export interface BarChartDatum {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarChartDatum[];
  formatValue?: (value: number) => string;
}

const DEFAULT_COLORS = [
  "bg-indigo-500",
  "bg-sky-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-violet-500",
];

function defaultFormat(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function BarChart({ data, formatValue = defaultFormat }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 0);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-52 items-end gap-3" role="list" aria-label="Expense amounts by category">
        {data.map((item, index) => {
          const heightPct = max === 0 ? 0 : (item.value / max) * 100;
          const color = item.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];
          return (
            <div
              key={item.label}
              role="listitem"
              className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
            >
              <span className="text-xs font-semibold text-slate-700">{formatValue(item.value)}</span>
              <div
                className={`w-full max-w-16 rounded-t-md ${color}`}
                style={{ height: `${heightPct}%` }}
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex gap-3">
        {data.map((item) => (
          <div key={item.label} className="min-w-0 flex-1 text-center">
            <span className="block truncate text-xs font-medium text-slate-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
