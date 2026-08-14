# Searching transactions

The Transactions page includes a search box and a custom date range above
the table.

## How search works

Type a merchant name or a category into the search box and press Enter to
run the search. The table reloads with the matching transactions. To search
for something else, clear the box and enter a new term, then press Enter
again.

Searches match against the merchant name and the category of each
transaction. Amounts and dates are not searched.

## Date range

Use the From and To date fields to limit the table to transactions whose
calendar date falls inside that range (inclusive on both ends). Leave either
field empty for an open-ended bound. Dates are compared as `YYYY-MM-DD`
calendar days, not as timezone-shifted timestamps, so a transaction on the
day before From (or the day after To) will not appear.

## Tips

- Searches are case-insensitive.
- The table resets to the first page of results each time you press Enter.
- Combine search with the date range and the column headers to sort the
  matched results by date, merchant, or amount.
