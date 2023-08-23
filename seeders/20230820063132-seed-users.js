'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'user1',
        email: 'user1@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
