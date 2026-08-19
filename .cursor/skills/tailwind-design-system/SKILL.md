---
name: tailwind-design-system
description: Apply Finley's Tailwind CSS 4 design system so pages share layout, color, type, and component recipes. Use when building or restyling pages, adding UI, choosing class names, reviewing visual consistency, or when the user mentions Tailwind, design system, styling, cards, tables, or empty states.
---

# Tailwind Design System

Finley has no separate token package. The design system is **Tailwind CSS 4 utilities composed in JSX**, copied from existing pages. Match those recipes; do not invent a parallel look.

## Stack

- Tailwind v4 via `@tailwindcss/vite` in `vite.config.ts`
- Single CSS entry: `src/index.css` is only `@import "tailwindcss";`
- No `tailwind.config.*`, no CSS modules, no `@apply`, no hex/rgb in `className`

Put styles on elements with utility classes. Extract a React component when the same UI appears more than once (`StatCard`); otherwise compose utilities inline.

## Tokens

Stay on this palette. Do not introduce new hues, radii, or shadows.

| Role | Classes |
|------|---------|
| Page canvas | `bg-slate-50 text-slate-900` |
| Surface | `bg-white` |
| Border | `border-slate-200` |
| Hairline / divider | `divide-slate-100`, `border-slate-100` |
| Muted fill | `bg-slate-50`, `bg-slate-100` |
| Brand / active / progress | `indigo-50`, `indigo-500`, `indigo-700` |
| Positive / income | `text-emerald-600` |
| Warning / over budget | `text-rose-500` |
| Primary text | `text-slate-900` |
| Secondary text | `text-slate-600` |
| Meta / labels | `text-slate-500` |
| Placeholder / empty | `text-slate-400` |

**Type**

- Page title: `text-3xl font-bold tracking-tight`
- Section title: `text-lg font-semibold`
- Body / row primary: `text-sm font-medium`
- Meta: `text-xs text-slate-500`
- Table header: `text-xs uppercase tracking-wide text-slate-500`
- Numeric emphasis: `text-sm font-semibold` (or `text-2xl font-bold` on stat values)

**Shape**

- Cards and tables: `rounded-xl border border-slate-200 bg-white shadow-sm`
- Controls and nav items: `rounded-lg`
- Pills: `rounded-full`
- Card / cell padding: `p-5` on cards; `px-5 py-3` (or `py-3.5`) in lists and tables

## Page anatomy

Every route lives inside `App` chrome. Do not re-create the shell.

```tsx
// App.tsx — already applied; do not duplicate on pages
<div className="flex min-h-screen bg-slate-50 text-slate-900">
  <Sidebar />
  <main className="flex-1 px-10 py-8">{/* routes */}</main>
</div>
```

Page body:

```tsx
<div>
  <h1 className="pb-6 text-3xl font-bold tracking-tight">Page title</h1>
  {/* content */}
</div>
```

Use `pb-1` on the `h1` only when content sits immediately under the title without a toolbar (Overview). Section headings: `mt-10 mb-3 text-lg font-semibold`.

Grids: `grid grid-cols-4 gap-4` for stat rows; `grid grid-cols-3 gap-4` for cards. Keep `gap-4`.

## Recipes

Copy these class strings from existing pages rather than restyling from scratch.

**Card** (`StatCard`, Budgets):

```
rounded-xl border border-slate-200 bg-white p-5 shadow-sm
```

**Table wrap** (Transactions):

```
overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm
```

Table: `w-full text-left text-sm`. Header row: `border-b border-slate-200 bg-slate-50`. Body: `divide-y divide-slate-100`. Rows: `hover:bg-slate-50`. Right-align amounts with `text-right`.

**Search field** (Transactions):

```
mb-4 w-80 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none
```

Always set `type="search"` and `aria-label`.

**Category pill:**

```
rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600
```

**Amount color:** `text-emerald-600` when `amount > 0`, else `text-slate-900`. Format with `formatAmount()` from `src/data/seed.ts`.

**Empty state** (Recurring Bills, empty table):

```
flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-24 text-center
```

In-table empty: `px-5 py-10 text-center text-slate-400`.

**Nav item** (Sidebar `NavLink`): active `bg-indigo-50 text-indigo-700`; idle `text-slate-600 hover:bg-slate-100`. Both: `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors`.

**Progress bar:** track `h-2 w-full overflow-hidden rounded-full bg-slate-100`; fill `h-full rounded-full bg-indigo-500`, `bg-rose-500` at ≥90%.

## Accessibility

- One `h1` per page; use `h2` for sections
- Icon-only or emoji content stays decorative; visible text carries the name
- Interactive table headers stay real `<th>` with a click handler; do not swap for `<div>`
- Do not rely on color alone: pair rose/emerald with labels (`{pct}% used`, `+`/`-` in `formatAmount`)

## Do not

- Add a Tailwind config, custom CSS, or `@theme` tokens unless the user asks to extend the system
- Use arbitrary values (`w-[327px]`, `text-[#1a1a1a]`) when a scale class exists
- Mix in other palettes (blue, zinc, gray, green) — this app is slate + indigo + emerald + rose
- Restyle the sidebar or `main` padding on a single page
- Duplicate `StatCard` markup; import the component
- Dark-mode classes — the product theme is light

## New-page checklist

- [ ] `h1` uses the page-title recipe
- [ ] Surfaces use the card/table recipe (white, `rounded-xl`, `border-slate-200`, `shadow-sm`)
- [ ] Search, table, empty, and pill patterns match Transactions / Recurring Bills
- [ ] Amounts and warnings use emerald / rose as above
- [ ] No new CSS file; utilities only
- [ ] Semantic controls (`searchbox`, headings, table) so tests can query by role

## Source of truth

Read these before inventing classes:

- Shell: `src/App.tsx`, `src/components/Sidebar.tsx`
- Cards: `src/components/StatCard.tsx`, `src/pages/Budgets.tsx`
- Table + search: `src/pages/Transactions.tsx`
- List card: `src/pages/Overview.tsx`, `src/pages/Settings.tsx`
- Empty: `src/pages/RecurringBills.tsx`
