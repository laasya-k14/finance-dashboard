---
name: tailwind-design-system
description: Apply Finley's Tailwind CSS 4 design system so pages and components share layout, color, type, and component recipes. Use when building or restyling pages, writing className utilities, adding cards/tables/forms/empty states, reviewing UI consistency, or when the user mentions Tailwind, styling, design system, or visual polish.
---

# Tailwind design system

Finley styles exclusively with Tailwind CSS 4 utility classes in JSX. There is no `tailwind.config`, no CSS modules, and no component CSS files. Tokens live in class names; the design system is the set of recipes already used on Overview, Transactions, Budgets, Settings, and the sidebar.

Copy those recipes. Do not invent a parallel look.

## Setup (do not change unless asked)

- Tailwind 4 via `@tailwindcss/vite` in `vite.config.ts`
- Global import only: `@import "tailwindcss";` in `src/index.css`
- `src/index.css` stays a one-line import. Do not add `@theme`, `@layer`, or page-specific CSS there
- Apply utilities with `className` on React elements

## Before writing classes

1. Open a sibling page that already does the same job (table → `src/pages/Transactions.tsx`, cards → `src/pages/Budgets.tsx` / `src/components/StatCard.tsx`, list → `src/pages/Settings.tsx` or Overview recent activity, empty state → `src/pages/RecurringBills.tsx`).
2. Reuse the same heading, surface, spacing, and color classes.
3. Prefer an existing component (`StatCard`) over duplicating markup.
4. Only then compose a new class string — still from the palette and recipes below.

Full copy-paste recipes: [examples.md](examples.md)

## Tokens

Stay inside this palette. Do not switch to `gray-*`, `zinc-*`, `blue-*`, or arbitrary hex/`[...]` colors.

| Role | Classes |
|------|---------|
| Page canvas | `bg-slate-50 text-slate-900` |
| Surface (cards, tables, sidebar) | `bg-white border-slate-200 shadow-sm` |
| Hairline / row dividers | `divide-slate-100` `border-slate-200` |
| Muted text | `text-slate-500` (secondary), `text-slate-400` (empty/placeholder), `text-slate-600` (nav idle) |
| Brand / accent / focus | `indigo-50` `indigo-500` `indigo-700` |
| Positive / income | `text-emerald-600` |
| Danger / over budget | `text-rose-500` `bg-rose-500` |
| Chip fill | `bg-slate-100 text-slate-600` |
| Input border | `border-slate-300` → `focus:border-indigo-500` |

### Type scale

| Element | Classes |
|---------|---------|
| Page title (`h1`) | `text-3xl font-bold tracking-tight` plus `pb-6` (use `pb-1` only when a tight grid follows, as on Overview) |
| Section title (`h2`) | `mt-10 mb-3 text-lg font-semibold` |
| Body / table cell | `text-sm` |
| Emphasis in a cell | `font-medium` or `font-semibold` |
| Meta, captions, table headers | `text-xs`; headers also `uppercase tracking-wide text-slate-500` |
| Stat value | `text-2xl font-bold` |

### Spacing and radius

- App shell: sidebar `w-60 shrink-0 … px-4 py-8`; main `flex-1 px-10 py-8`
- Card padding: `p-5`; list/table cell padding: `px-5 py-3` (or `py-3.5` / `py-4` for list rows)
- Grid gap: `gap-4`
- Section break after a card grid: `mt-10`
- Surfaces: `rounded-xl`; controls and nav items: `rounded-lg`; chips: `rounded-full`
- Progress track: `h-2 overflow-hidden rounded-full bg-slate-100`

## Page shell

Every page is a fragment inside `App`'s `<main>`. Do not wrap a page in another `min-h-screen` or second sidebar.

```tsx
export default function PageName() {
  return (
    <div>
      <h1 className="pb-6 text-3xl font-bold tracking-tight">Page Name</h1>
      {/* surface */}
    </div>
  );
}
```

Layout chrome lives in `src/App.tsx` (`flex min-h-screen bg-slate-50 text-slate-900`) and `src/components/Sidebar.tsx`. Match nav active/hover classes if you touch the sidebar; do not restyle the shell while implementing a page.

## Component recipes

Use these class strings verbatim unless the existing sibling uses a documented exception.

**Card / stat / budget tile**

`rounded-xl border border-slate-200 bg-white p-5 shadow-sm`

**Table / settings list surface**

`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm`

**Search field** (see Transactions)

`mb-4 w-80 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none`

Always set `type="search"` and `aria-label`.

**Category chip**

`rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600`

**Empty state**

`flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-24 text-center`

Title: `mt-4 text-sm font-medium text-slate-600`. Subtitle: `mt-1 text-xs text-slate-400`.

**Amounts**

- Income (`amount > 0`): `text-emerald-600`
- Spend: `text-slate-900` (not rose)
- Format with `formatAmount()` from `src/data/seed.ts`

**Nav item** (sidebar)

Idle: `text-slate-600 hover:bg-slate-100`. Active: `bg-indigo-50 text-indigo-700`. Shared: `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors`.

**Progress bar**

Fill `bg-indigo-500`; switch to `bg-rose-500` at ≥ 90% used.

## Practices

- Utilities only. No inline `style` except true dynamic values (e.g. progress `width: ${pct}%`).
- Prefer Tailwind scale tokens (`w-80`, `gap-4`) over arbitrary values (`w-[320px]`).
- Semantic HTML: `h1`/`h2`, `<table>` for tabular data, `<nav>` in the sidebar, buttons for actions.
- Interactive tables: sortable headers are `cursor-pointer`; body rows `hover:bg-slate-50`; empty match row uses `text-slate-400` and a short sentence.
- Accessibility: visible labels or `aria-label` on inputs; do not rely on color alone (pair rose fill with “% used” text).
- Keep pages deterministic: seed data, no `Date.now()` in UI copy.

## Do not

- Add a new color family, gradient, or drop shadow heavier than `shadow-sm`
- Introduce CSS-in-JS, `@apply` in CSS files, or a `tailwind.config.*`
- Restyle one page as a one-off (different radius, different heading size, different card border)
- Use rose for ordinary spend amounts
- Put page layout padding on the page itself (`px-10 py-8` belongs on `<main>`)

## Review checklist

When adding or changing UI, confirm:

- [ ] Heading uses the page-title recipe
- [ ] Surfaces use the card/table class string
- [ ] Colors are slate + indigo + emerald/rose only
- [ ] Spacing matches a sibling page
- [ ] Search/sort/empty patterns match Transactions when those features exist
- [ ] No new CSS file or `index.css` rules
