const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const CartItems = sequelize.define('CartItems', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'User',
            key: 'email',
        },
    },
    productname: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'Product',
            key: 'name',
        },
    },
    servicename: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'Service',
            key: 'name',
        },
    },
});


module.exports=CartItems;
