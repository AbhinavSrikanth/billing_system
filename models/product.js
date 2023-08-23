// product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const Service=require('../models/services');

const Product = sequelize.define('Products', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});



module.exports = Product;
