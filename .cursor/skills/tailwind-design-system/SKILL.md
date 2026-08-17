---
name: tailwind-design-system
description: Apply Finley's Tailwind CSS 4 design system so new pages and components match existing style. Use when building or restyling pages, cards, tables, forms, navigation, empty states, or StatCards, and when the user mentions Tailwind, design system, visual consistency, styling, or UI polish.
---

# Tailwind design system

Finley styles exclusively with Tailwind CSS 4 utility classes in JSX. Do not add CSS modules, extra stylesheets, or inline `style` except for a single dynamic value (for example progress-bar width).

Setup already exists — do not recreate it:

- Plugin: `@tailwindcss/vite` in `vite.config.ts`
- Entry: `src/index.css` contains only `@import "tailwindcss";`
- Import: `src/main.tsx` imports `./index.css`

There is no custom `@theme` block. Stay inside the token set below instead of inventing new colors, radii, or type sizes.

## Before writing classes

1. Copy the closest existing page (`Overview`, `Transactions`, `Budgets`, `Settings`) rather than designing from scratch.
2. Reuse `StatCard` for summary metrics. Do not duplicate its markup.
3. Match heading, card, table, and search recipes exactly — including spacing and radius.
4. Prefer semantic elements (`h1`/`h2`, `<table>`, `<nav>`, labeled inputs) over extra wrappers.

## Tokens

Use only these palettes:

| Role | Classes |
|------|---------|
| Page canvas | `bg-slate-50 text-slate-900` |
| Surface | `bg-white` |
| Primary text | default / `text-slate-900` |
| Secondary / nav | `text-slate-600` |
| Meta | `text-slate-500` |
| Muted / empty | `text-slate-400` |
| Hairline | `border-slate-200`, `divide-slate-100` |
| Input border | `border-slate-300` |
| Subtle fill | `bg-slate-50` (thead), `bg-slate-100` (hover, chips, tracks) |
| Brand | `bg-indigo-50 text-indigo-700` (active nav), `bg-indigo-500` (bars), `focus:border-indigo-500` |
| Positive | `text-emerald-600` (income, “up”) |
| Negative | `text-rose-500` / `bg-rose-500` (over budget, “down”) |

Do not introduce `blue-*`, `gray-*`, `green-*`, `red-*`, `zinc-*`, or arbitrary hex via `bg-[#…]`.

Radii: `rounded-xl` (cards, tables, empty states), `rounded-lg` (inputs, nav items), `rounded-full` (chips, progress tracks).

Shadows: `shadow-sm` on raised surfaces only.

## Page chrome

App shell lives in `App.tsx` — pages render only the inner column:

```tsx
<div className="flex min-h-screen bg-slate-50 text-slate-900">
  <Sidebar />
  <main className="flex-1 px-10 py-8">{/* routes */}</main>
</div>
```

Every page starts the same way:

```tsx
<div>
  <h1 className="pb-6 text-3xl font-bold tracking-tight">Page title</h1>
  {/* content */}
</div>
```

Section headings (Overview “Recent activity”): `mt-10 mb-3 text-lg font-semibold`.

Layout grids: `grid grid-cols-4 gap-4` (stat row), `grid grid-cols-3 gap-4` (card grid). Keep `gap-4`.

## Recipes

Copy these class strings verbatim.

**Card / panel** (StatCard, budget tiles, settings list, tables):

`rounded-xl border border-slate-200 bg-white shadow-sm`

Inner padding: `p-5` on standalone cards; list/table rows use `px-5` with `py-3`, `py-3.5`, or `py-4`.

**StatCard** — import `src/components/StatCard.tsx`. Label `text-sm font-medium text-slate-500`, value `mt-2 text-2xl font-bold`, change `mt-1 text-xs font-medium` plus `text-emerald-600` / `text-rose-500`.

**Search input** (Transactions):

```
mb-4 w-80 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none
```

Always set `type="search"` and `aria-label`.

**Data table**:

- Wrapper: `overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm`
- Table: `w-full text-left text-sm`
- Thead: `border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500`
- Header cells: `px-5 py-3` (`text-right` on amount)
- Body: `divide-y divide-slate-100`
- Rows: `hover:bg-slate-50`
- Category chip: `rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600`
- Filter empty: `px-5 py-10 text-center text-slate-400`

**Stacked list** (Overview activity, Settings):

`rounded-xl border …` wrapper, `ul` with `divide-y divide-slate-100`, rows `flex items-center justify-between px-5 py-3.5` (or `py-4`).

**Empty state** (Recurring Bills placeholder):

```
flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-24 text-center
```

Title `text-sm font-medium text-slate-600`, subtitle `mt-1 text-xs text-slate-400`.

**Progress** (Budgets): track `mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100`; fill `h-full rounded-full` plus `bg-indigo-500` or `bg-rose-500` when `pct >= 90`. Width via `style={{ width: `${pct}%` }}` only.

**Nav item** (`Sidebar`): `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors`. Active `bg-indigo-50 text-indigo-700`. Inactive `text-slate-600 hover:bg-slate-100`.

## Money and status

- Format with `formatAmount` from `src/data/seed.ts`.
- `amount > 0`: `text-emerald-600`; otherwise `text-slate-900`.
- Amount columns: `text-right font-semibold`.
- Directional stats: `up` → `text-emerald-600`, `down` → `text-rose-500`.

## Accessibility

- One `h1` per page; `h2` for sections. Query headings in tests via `getByRole("heading", { name })`.
- Search: `aria-label` matching the placeholder intent (see Transactions).
- Tables: real `<table>` / `<th>` / `<td>`, not div grids.
- Sortable headers stay `<th>` with visible sort affordance.
- Do not rely on color alone for over-budget or income vs spend — keep the existing text (`% used`, `+/-` amounts).

## Anti-patterns

- New files under `src/**/*.css` or `@apply` in `index.css`
- Arbitrary values (`p-[13px]`, `w-[327px]`) when a scale class exists
- Changing page title classes (`text-2xl`, `font-semibold`, skipping `tracking-tight`)
- Sidebar or main padding changes unless the ticket is specifically about the shell (FIN-5)
- Emoji as the only label; keep a text heading/label beside icons

## New page checklist

- [ ] `h1` uses `pb-6 text-3xl font-bold tracking-tight`
- [ ] Surfaces use the card recipe (`rounded-xl border-slate-200 bg-white shadow-sm`)
- [ ] Colors stay in slate / indigo / emerald / rose
- [ ] Search, tables, and lists copy Transactions / Overview class strings
- [ ] Summary metrics use `StatCard`
- [ ] Interactive controls have accessible names
- [ ] Empty and filtered-empty states match existing copy hierarchy
