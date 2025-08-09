const { Sequelize } = require('sequelize');

// SQLite database configuration
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './ecomdb.sqlite',
  logging: false,
});

module.exports = sequelize;
