const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Your Sequelize database configuration

class Car extends Model {}

Car.init(
  {
    // Define model attributes (columns)
    make: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // ... Other attributes (e.g., color, price, availability, etc.)
  },
  {
    sequelize, // Use the configured Sequelize instance
    modelName: 'car', // Define the table name
  }
);

module.exports = Car;
