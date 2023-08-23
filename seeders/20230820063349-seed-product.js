module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create products with pricing and apply taxes based on rules
    const productsData = [
      { name: 'Product A', price: 800 },
      { name: 'Product B', price: 3000 },
      { name: 'Product C', price: 6000 },
      { name: 'Product D', price: 10000 },
      { name: 'Product E', price: 500 },
    ];

    const now = Sequelize.literal('NOW()'); // Current timestamp

    // Insert products with createdAt and updatedAt values
    const createdProducts = await queryInterface.bulkInsert('Products', productsData.map(product => ({
      ...product,
      createdAt: now,
      updatedAt: now,
    })), {});

    // Update the prices of products based on taxes (if needed)
    await queryInterface.sequelize.query(`
      UPDATE "Products"
      SET "price" = "price" + (0.12 * "price")
      WHERE "price" > 1000 AND "price" <= 5000;

      UPDATE "Products"
      SET "price" = "price" + (0.18 * "price")
      WHERE "price" > 5000;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all seeded products
    await queryInterface.bulkDelete('Products', null, {});
  }
};
