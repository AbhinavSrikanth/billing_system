const Sequelize = require('sequelize');

module.exports = new Sequelize('billing_system', 'whirldata', 'Whirldata@123', {
  host: 'localhost',  // Example: 'localhost'
  dialect: 'postgres', // Example: 'mysql', 'postgres', 'sqlite', etc.
  logging: false, // Set to true to log SQL queries, or provide a custom logging function
});
