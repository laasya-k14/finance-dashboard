# Searching transactions

The Transactions page includes a search box above the table.

## How search works

Type a merchant name or a category into the search box. The table
filters as you type — you do not need to press Enter. To search for
something else, edit or clear the box; the results update with each
change.

Searches match against the merchant name and the category of each
transaction. Amounts and dates are not searched.

The search field is a controlled input bound to React state. It is not
given a changing `key`, so it does not remount when the filtered result
count changes. The text you type stays in the box while the table
refreshes.

## Tips

- Searches are case-insensitive.
- Combine search with the column headers to sort the matched results by
  date, merchant, or amount.
