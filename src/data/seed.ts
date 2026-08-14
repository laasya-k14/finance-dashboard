// All data is hard-coded and deterministic so the app renders identically
// on every run (this repo is used as a filming subject for demo recordings).

export interface Stat {
  label: string;
  value: string;
  change: string;
  direction: "up" | "down";
  icon: string;
}

export interface Transaction {
  id: string;
  date: string; // fixed ISO date strings — never computed from "now"
  merchant: string;
  category: Category;
  amount: number; // negative = spend, positive = income
}

export type Category =
  | "Groceries"
  | "Dining"
  | "Transport"
  | "Utilities"
  | "Entertainment"
  | "Health"
  | "Income"
  | "Shopping";

export interface Budget {
  category: Category;
  limit: number;
  spent: number;
}

export const stats: Stat[] = [
  { label: "Total Balance", value: "$24,580.00", change: "+2.4%", direction: "up", icon: "💰" },
  { label: "Monthly Income", value: "$6,250.00", change: "+0.0%", direction: "up", icon: "📈" },
  { label: "Monthly Spend", value: "$3,847.20", change: "-4.1%", direction: "down", icon: "💳" },
  { label: "Upcoming Bills", value: "$1,132.00", change: "3 due soon", direction: "down", icon: "📅" },
];

export const transactions: Transaction[] = [
  { id: "t01", date: "2026-08-07", merchant: "Whole Foods Market", category: "Groceries", amount: -86.42 },
  { id: "t02", date: "2026-08-07", merchant: "Acme Corp Payroll", category: "Income", amount: 3125.0 },
  { id: "t03", date: "2026-08-06", merchant: "Blue Bottle Coffee", category: "Dining", amount: -7.5 },
  { id: "t04", date: "2026-08-05", merchant: "Uber", category: "Transport", amount: -18.35 },
  { id: "t05", date: "2026-08-05", merchant: "Netflix", category: "Entertainment", amount: -15.99 },
  { id: "t06", date: "2026-08-04", merchant: "Pacific Gas & Electric", category: "Utilities", amount: -142.8 },
  { id: "t07", date: "2026-08-03", merchant: "Trader Joe's", category: "Groceries", amount: -54.17 },
  { id: "t08", date: "2026-08-03", merchant: "Chipotle", category: "Dining", amount: -12.85 },
  { id: "t09", date: "2026-08-02", merchant: "Shell Gas Station", category: "Transport", amount: -48.6 },
  { id: "t10", date: "2026-08-01", merchant: "CVS Pharmacy", category: "Health", amount: -23.4 },
  { id: "t11", date: "2026-07-31", merchant: "Amazon", category: "Shopping", amount: -67.89 },
  { id: "t12", date: "2026-07-30", merchant: "Spotify", category: "Entertainment", amount: -10.99 },
  { id: "t13", date: "2026-07-29", merchant: "Safeway", category: "Groceries", amount: -93.21 },
  { id: "t14", date: "2026-07-28", merchant: "Comcast Internet", category: "Utilities", amount: -79.99 },
  { id: "t15", date: "2026-07-27", merchant: "Sweetgreen", category: "Dining", amount: -14.25 },
  { id: "t16", date: "2026-07-26", merchant: "Lyft", category: "Transport", amount: -22.1 },
  { id: "t17", date: "2026-07-25", merchant: "One Medical", category: "Health", amount: -150.0 },
  { id: "t18", date: "2026-07-24", merchant: "Acme Corp Payroll", category: "Income", amount: 3125.0 },
  { id: "t19", date: "2026-07-23", merchant: "Target", category: "Shopping", amount: -112.34 },
  { id: "t20", date: "2026-07-22", merchant: "AMC Theatres", category: "Entertainment", amount: -32.0 },
];

export const budgets: Budget[] = [
  { category: "Groceries", limit: 500, spent: 233.8 },
  { category: "Dining", limit: 200, spent: 34.6 },
  { category: "Transport", limit: 150, spent: 89.05 },
  { category: "Utilities", limit: 250, spent: 222.79 },
  { category: "Entertainment", limit: 100, spent: 58.98 },
  { category: "Shopping", limit: 300, spent: 180.23 },
];

export function formatAmount(amount: number): string {
  const sign = amount < 0 ? "-" : "+";
  return `${sign}$${Math.abs(amount).toFixed(2)}`;
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

// Fixed "today" for bill reminders so the page never depends on Date.now().
export const BILL_AS_OF_DATE = "2026-08-14";

export type Cadence = "Weekly" | "Monthly" | "Quarterly" | "Yearly";

export type BillStatus = "Overdue" | "Due soon" | "Upcoming";

export interface RecurringBill {
  id: string;
  name: string;
  amount: number;
  cadence: Cadence;
  nextDue: string; // fixed ISO date — never computed from "now"
}

export const recurringBills: RecurringBill[] = [
  { id: "b01", name: "Apartment Rent", amount: 1850.0, cadence: "Monthly", nextDue: "2026-09-01" },
  { id: "b02", name: "Pacific Gas & Electric", amount: 142.8, cadence: "Monthly", nextDue: "2026-08-16" },
  { id: "b03", name: "Comcast Internet", amount: 79.99, cadence: "Monthly", nextDue: "2026-08-18" },
  { id: "b04", name: "Verizon Wireless", amount: 85.0, cadence: "Monthly", nextDue: "2026-08-20" },
  { id: "b05", name: "Netflix", amount: 15.99, cadence: "Monthly", nextDue: "2026-09-05" },
  { id: "b06", name: "Spotify", amount: 10.99, cadence: "Monthly", nextDue: "2026-08-30" },
  { id: "b07", name: "State Farm Auto", amount: 426.0, cadence: "Quarterly", nextDue: "2026-09-12" },
  { id: "b08", name: "Planet Fitness", amount: 24.99, cadence: "Monthly", nextDue: "2026-08-22" },
  { id: "b09", name: "New York Times", amount: 17.0, cadence: "Monthly", nextDue: "2026-08-10" },
  { id: "b10", name: "Amazon Prime", amount: 139.0, cadence: "Yearly", nextDue: "2026-11-03" },
  { id: "b11", name: "Farmers Market CSA", amount: 40.0, cadence: "Weekly", nextDue: "2026-08-23" },
];

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function daysUntilDue(nextDue: string, asOf: string = BILL_AS_OF_DATE): number {
  const due = Date.parse(`${nextDue}T00:00:00.000Z`);
  const from = Date.parse(`${asOf}T00:00:00.000Z`);
  return Math.round((due - from) / MS_PER_DAY);
}

export function getBillStatus(nextDue: string, asOf: string = BILL_AS_OF_DATE): BillStatus {
  const days = daysUntilDue(nextDue, asOf);
  if (days < 0) return "Overdue";
  if (days <= 7) return "Due soon";
  return "Upcoming";
}

export function monthlyEquivalent(amount: number, cadence: Cadence): number {
  switch (cadence) {
    case "Weekly":
      return (amount * 52) / 12;
    case "Monthly":
      return amount;
    case "Quarterly":
      return amount / 3;
    case "Yearly":
      return amount / 12;
  }
}

export function monthlyRecurringTotal(bills: RecurringBill[] = recurringBills): number {
  return bills.reduce((sum, bill) => sum + monthlyEquivalent(bill.amount, bill.cadence), 0);
}
