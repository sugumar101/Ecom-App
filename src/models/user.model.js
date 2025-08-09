const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

// Define the User model directly
const User = sequelize.define('User', {
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  userType: {
    type: DataTypes.ENUM('Normal', 'Business'),
    allowNull: false,
    defaultValue: 'Normal'
  }
});

// Export the User model as an object
module.exports = { User };

// Add sync and dummy data function
async function syncAndSeedUser() {
  await User.sync({ force: true }); // Drops table if exists, then recreates
  await User.bulkCreate([
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      password: 'password123', // You may want to hash this if used for auth
      userType: 'normal',
    },
    {
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane@example.com',
      password: 'password456',
      userType: 'business',
    },
  ]);
  const logger = require('../utils/logger');
  logger.info('User table synced and dummy data inserted.');
}

module.exports.syncAndSeedUser = syncAndSeedUser;
