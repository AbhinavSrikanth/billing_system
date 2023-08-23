'use strict';

const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('CartItems', 'user_email', {
      type: Sequelize.STRING,
      references: {
        model: 'Users',
        key: 'email',
      },
      allowNull: true,
    });

    await queryInterface.addColumn('CartItems', 'productname', {
      type: Sequelize.STRING,
      references: {
        model: 'Products',
        key: 'name',
      },
      allowNull: true,
    });

    await queryInterface.addColumn('CartItems', 'servicename', {
      type: Sequelize.STRING,
      references: {
        model: 'Services',
        key: 'name',
      },
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('CartItems', 'productname');
    await queryInterface.removeColumn('CartItems', 'servicename');
  }
};
