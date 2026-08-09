const settings = [
  { label: "Currency", value: "USD ($)" },
  { label: "Start of week", value: "Monday" },
  { label: "Email reports", value: "Weekly" },
  { label: "Theme", value: "Light" },
];

export default function Settings() {
  return (
    <div>
      <h1 className="pb-6 text-3xl font-bold tracking-tight">Settings</h1>
      <div className="max-w-lg rounded-xl border border-slate-200 bg-white shadow-sm">
        <ul className="divide-y divide-slate-100">
          {settings.map((s) => (
            <li key={s.label} className="flex items-center justify-between px-5 py-4">
              <span className="text-sm font-medium">{s.label}</span>
              <span className="text-sm text-slate-500">{s.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
