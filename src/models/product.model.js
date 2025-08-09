const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

async function syncAndSeedProduct() {
  await Product.sync({ force: true });
  await Product.bulkCreate([
    { name: 'Product 1', price: 10.99, description: 'Sample product 1' },
    { name: 'Product 2', price: 19.99, description: 'Sample product 2' },
  ]);
  const logger = require('../utils/logger');
  logger.info('Product table synced and dummy data inserted.');
}

module.exports = { Product, syncAndSeedProduct };
