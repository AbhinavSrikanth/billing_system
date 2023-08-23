const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Admin = sequelize.define('Admins', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Admin;
