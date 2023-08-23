//Tax calculation logic
function calculateTax(price, itemType) {
    if (itemType === 'product') {
        if (price > 1000 && price <= 5000) {
            return 0.12 * price; // Apply Tax PA
        } else if (price > 5000) {
            return 0.18 * price; // Apply Tax PB
        } else {
            return 200; // Apply Tax PC
        }
    } 
    else if (itemType === 'service') {
        if (price > 1000 && price <= 8000) {
            return 0.10 * price; // Apply Tax SA
        } else if (price > 8000) {
            return 0.15 * price; // Apply Tax SB
        } else {
            return 100; // Apply Tax SC
        }
    }
}

module.exports= calculateTax;