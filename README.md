# 📕 Module 06 - Loops, Iteration and High Order Array Methods - Lesson 11.02 Array.method Method — Order Summary Aggregator

## 🎯 Objective  
Build a function that takes a list of shopping cart items and produces a **summary report** with:  
- ✅ Total number of items purchased  
- ✅ Grand total of all purchases  
- ✅ Totals grouped by category  
- ✅ Category with the highest total (Top Category)  
- ✅ Formatted currency output (e.g., `€51.48`)  

---

## 🧮 Implementation  

```javascript
// Helper function to format numbers as currency
function formatCurrency(value, currency = "€") {
  return `${currency}${value.toFixed(2)}`;
}

function buildOrderSummary(cart) {
  const summary = cart.reduce((acc, item) => {
    const lineTotal = item.price * item.qty;

    // Count items
    acc.itemsCount += item.qty;

    // Compute grand total
    acc.grandTotal += lineTotal;

    // Group totals by category
    acc.totalsByCategory[item.category] =
      (acc.totalsByCategory[item.category] || 0) + lineTotal;

    return acc;
  }, { itemsCount: 0, grandTotal: 0, totalsByCategory: {} });

  // Round and format totals
  summary.grandTotal = formatCurrency(summary.grandTotal);
  for (const cat in summary.totalsByCategory) {
    summary.totalsByCategory[cat] = formatCurrency(summary.totalsByCategory[cat]);
  }

  // Determine top category
  const top = Object.entries(summary.totalsByCategory).reduce((best, [cat, total]) => {
    const numericTotal = parseFloat(total.replace("€", ""));
    if (numericTotal > best.max) return { max: numericTotal, cat };
    return best;
  }, { max: -Infinity, cat: null });

  summary.topCategory = top.cat;

  return summary;
}

// Example usage
const cart = [
  { id: 1, name: 'Notebook',     category: 'Stationery', price: 4.50, qty: 3 },
  { id: 2, name: 'Pencil',       category: 'Stationery', price: 1.20, qty: 5 },
  { id: 3, name: 'USB-C Cable',  category: 'Electronics', price: 9.99, qty: 2 },
  { id: 4, name: 'Water Bottle', category: 'Lifestyle',   price: 12.00, qty: 1 }
];

console.log(buildOrderSummary(cart));
```

---

## 📊 Sample Output  

```js
{
  itemsCount: 11,
  grandTotal: "€51.48",
  totalsByCategory: {
    Stationery: "€19.50",
    Electronics: "€19.98",
    Lifestyle: "€12.00"
  },
  topCategory: "Electronics"
}
```

---

## 🚀 Key Takeaways  
- The `reduce()` method is ideal for **aggregation tasks** like reports, summaries, or analytics.  
- Always initialize the accumulator object with proper defaults (`{}` for objects, `0` for numbers).  
- Can derive **multiple insights** in a single pass, making `reduce()` powerful and efficient.  
- A helper like `formatCurrency()` ensures consistent, user-friendly display of numeric totals.  
