// models/index.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config'); // Adjust the path accordingly

const User = require('../models/user');
const Product = require('../models/product');
const Service = require('../models/services'); 
const CartItems=require('../models/cart');
const Order=require('../models/order');
const Admin=require('../models/admin')

module.exports = {
    User,
    Product,
    Service,
    CartItems,
    Order,
    Admin
};