//TODO 📕 Module 06 - Loops, Iteration and High Order Array Methods - Lesson 11.02 Array.method Method — Order Summary Aggregator


//TODO 🧩 Step 6: Project Integration — Order Summary Aggregator

//* 🖼️ Scenario

//  You are building the backend logic for a small shop’s checkout page. The UI needs a compact summary built from raw cart items.

const cart = [
    { id: 1, name: 'Notebook',     category: 'Stationery', price: 4.50,  qty: 3 },
    { id: 2, name: 'Pencil',       category: 'Stationery', price: 1.20,  qty: 5 },
    { id: 3, name: 'USB-C Cable',  category: 'Electronics', price: 9.99, qty: 2 },
    { id: 4, name: 'Water Bottle', category: 'Lifestyle',   price: 12.00, qty: 1 }
];

//* 🎯 Your Objective

//  Write `buildOrderSummary(cart)` that returns an object with:

// {
//   itemsCount: number,                            // total units across all lines
//   grandTotal: number,                            // sum of (price * qty), fixed to 2 decimals
//   totalsByCategory: { [cat]: number }            // money per category
// }

//* 🧱 Starter Template

function buildOrderSummary(cart) {
    const summary = cart.reduce((acc, item) => {
        // 1) line total
        const lineTotal = item.price * item.qty;

        // 2) total units
        acc.itemsCount += item.qty;

        // 3) grand total
        acc.grandTotal += lineTotal;

        // 4) totals by category
        acc.totalsByCategory[item.category] = (acc.totalsByCategory[item.category] || 0) + lineTotal;

        return acc;
    }, { itemsCount: 0, grandTotal: 0, totalsByCategory: {} });

    // round grandTotal to 2 decimals (avoid float artifacts)
    summary.grandTotal = Number(summary.grandTotal.toFixed(2));

    // optionally also round category totals
    for (const cat in summary.totalsByCategory) {
        summary.totalsByCategory[cat] = Number(summary.totalsByCategory[cat].toFixed(2));
    }

    return summary;
}

// Example usage:
console.log(buildOrderSummary(cart));

//* ✅ Expected Shape (values will depend on the data)

// {
//     itemsCount: 11,
//     grandTotal: 49.89,
//     totalsByCategory: {
//         Stationery:  (4.50 * 3 + 1.20 * 5), // 13.50 + 6.00 = 19.50
//         Electronics: (9.99 * 2),          // 19.98
//         Lifestyle:   (12.00 * 1)          // 12.00
//     }
// };

//* ✨ Hints

//  • Start from an object accumulator: `{ itemsCount: 0, grandTotal: 0, totalsByCategory: {} }`.
//  • Compute `lineTotal` once per item; reuse it.
//  • Use defaulting when adding to a category: `(acc.totalsByCategory[cat] || 0) + lineTotal`.
//  • Round after the reduce loop.

//* 🌶️ Optional Stretch

//  Add `topCategory` (the category with the largest total):

// const { topCategory } = Object.entries(summary.totalsByCategory).reduce((acc, [cat, total]) => {
//     if (total > acc.max) return { max: total, topCategory: cat };
//     return acc;
// }, { max: -Infinity, topCategory: null });

//  Attach it to `summary.topCategory`.


//! Solution

function buildOrderSummary(cart) {
    // Reduce to gather totals and counts in a summary object
    const summary = cart.reduce((acc, item) => {
        const lineTotal = item.price * item.qty;
        acc.itemsCount += item.qty;
        acc.grandTotal += lineTotal;
        acc.totalsByCategory[item.category] = 
            (acc.totalsByCategory[item.category] || 0) + lineTotal;
        return acc;
    }, { itemsCount: 0, grandTotal: 0, totalsByCategory: {} });

    // Round grandTotal and category totals to 2 decimals
    summary.grandTotal = Number(summary.grandTotal.toFixed(2));
    for (const cat in summary.totalsByCategory) {
        summary.totalsByCategory[cat] =
            Number(summary.totalsByCategory[cat].toFixed(2));
    }

    // Optional stretch: Find topCategory (category with largest total)
    const top = Object.entries(summary.totalsByCategory)
        .reduce(
            (best, [cat, total]) => total > best.max ? { max: total, cat } : best,
            { max: -Infinity, cat: null }
        );
    summary.topCategory = top.cat;

    return summary;
}

console.log(buildOrderSummary(cart));

