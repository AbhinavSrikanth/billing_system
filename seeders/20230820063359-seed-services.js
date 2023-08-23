module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create services with pricing and apply taxes based on rules
    const servicesData = [
      { name: 'Service X', price: 800 },
      { name: 'Service Y', price: 3000 },
      { name: 'Service Z', price: 7000 },
      { name: 'Service W', price: 12000 },
      { name: 'Service V', price: 500 },
    ];

    const now = Sequelize.literal('NOW()'); // Current timestamp

    // Insert services with createdAt and updatedAt values
    const createdServices = await queryInterface.bulkInsert('Services', servicesData.map(service => ({
      ...service,
      createdAt: now,
      updatedAt: now,
    })), {});

    // Update the prices of services based on taxes (if needed)
    await queryInterface.sequelize.query(`
      UPDATE "Services"
      SET "price" = "price" + (0.10 * "price")
      WHERE "price" > 1000 AND "price" <= 8000;

      UPDATE "Services"
      SET "price" = "price" + (0.15 * "price")
      WHERE "price" > 8000;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all seeded services
    await queryInterface.bulkDelete('Services', null, {});
  }
};
