# Design system examples

Copy these from the live pages. Prefer the nearest sibling over inventing a variant.

## Page title + card grid (Budgets)

```tsx
<div>
  <h1 className="pb-6 text-3xl font-bold tracking-tight">Budgets</h1>
  <div className="grid grid-cols-3 gap-4">
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* tile body */}
    </div>
  </div>
</div>
```

Use `grid-cols-4` for a four-up stat row (Overview).

## Stat card (component)

`src/components/StatCard.tsx` — reuse this for summary metrics instead of a new card.

```tsx
<div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-slate-500">{stat.label}</span>
    <span className="text-xl">{stat.icon}</span>
  </div>
  <div className="mt-2 text-2xl font-bold">{stat.value}</div>
  <div
    className={`mt-1 text-xs font-medium ${
      stat.direction === "up" ? "text-emerald-600" : "text-rose-500"
    }`}
  >
    {stat.change}
  </div>
</div>
```

## Search + sortable table (Transactions)

```tsx
<input
  type="search"
  placeholder="Search by merchant or category…"
  aria-label="Search transactions"
  className="mb-4 w-80 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none"
/>

<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
  <table className="w-full text-left text-sm">
    <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
      <tr>
        <th className="cursor-pointer px-5 py-3">Date</th>
        <th className="px-5 py-3">Category</th>
        <th className="cursor-pointer px-5 py-3 text-right">Amount</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-100">
      <tr className="hover:bg-slate-50">
        <td className="px-5 py-3 text-slate-500">{t.date}</td>
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
    </tbody>
  </table>
</div>
```

Empty match row: `colSpan={n}` cell with `px-5 py-10 text-center text-slate-400`.

## Divided list (Settings / Overview activity)

```tsx
<div className="rounded-xl border border-slate-200 bg-white shadow-sm">
  <ul className="divide-y divide-slate-100">
    <li className="flex items-center justify-between px-5 py-4">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm text-slate-500">{value}</span>
    </li>
  </ul>
</div>
```

Overview recent activity uses `px-5 py-3.5` and a two-line left column (`text-sm font-medium` + `text-xs text-slate-500`).

## Empty state (Recurring Bills placeholder)

```tsx
<div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-24 text-center">
  <span className="text-4xl">🔁</span>
  <p className="mt-4 text-sm font-medium text-slate-600">Nothing here yet</p>
  <p className="mt-1 text-xs text-slate-400">Recurring bill tracking is coming soon.</p>
</div>
```

When filling this page, replace the dashed empty state with the search + table recipe so it matches Transactions.

## Progress (Budgets)

```tsx
<div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
  <div
    className={`h-full rounded-full ${over ? "bg-rose-500" : "bg-indigo-500"}`}
    style={{ width: `${pct}%` }}
  />
</div>
<div className="mt-2 text-xs text-slate-500">{pct}% used</div>
```

## Anti-examples

Do not do this:

```tsx
// Wrong palette and radius
<div className="rounded-md bg-gray-100 p-4 shadow-lg">
  <h1 className="text-2xl text-blue-600">Bills</h1>
</div>

// Wrong: page-level chrome (already on <main> / App)
<div className="min-h-screen px-10 py-8">…</div>

// Wrong: custom CSS instead of utilities
// src/pages/Bills.css  — never add this
```
