const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config'); 
const Order = sequelize.define('Orders', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    total_amount: {
        type: DataTypes.NUMERIC,
        allowNull: false
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'User', // Reference the User model
            key: 'email' // Reference the 'email' column in the User model
        }
    }
});

// Define associations if needed (e.g., belongsTo, hasMany, etc.)

module.exports = Order;
