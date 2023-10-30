const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Your Sequelize database configuration

class Booking extends Model {}

Booking.init(
  {
    // Define model attributes (columns)
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // Add more attributes as needed (e.g., car ID, price, etc.)
  },
  {
    sequelize, // Use the configured Sequelize instance
    modelName: 'booking', // Define the table name
  }
);

module.exports = Booking;
