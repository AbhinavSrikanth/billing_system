const { CartItems } = require('../models'); // Adjust the path as needed

const cartItemsData = [
  // Your cart items data here
  // For each cart item, make sure to update "itemname" to "name"
];

(async () => {
  try {
    await CartItems.bulkCreate(cartItemsData);
    console.log('Cart items seeded successfully');
  } catch (error) {
    console.error('Error seeding cart items:', error);
  }
})();
