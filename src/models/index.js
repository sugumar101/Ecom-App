const sequelize = require('../utils/db');
const Product = require('./product.model');
const User = require('./user.model');

module.exports = {
  sequelize,
  Product,
  User,
};
