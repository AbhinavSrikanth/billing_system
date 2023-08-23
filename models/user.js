const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull:false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey:true,
    validate: {
      isEmail: true,
    }
    },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  }
});

module.exports = User;
