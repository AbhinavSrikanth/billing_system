const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const Product = require('../models/product');

const Service = sequelize.define('Services', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});



module.exports = Service;
