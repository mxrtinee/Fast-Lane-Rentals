// models/Review.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Import your Sequelize database configuration

class Review extends Model {}

Review.init(
  {
    // Define model attributes (columns)
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // Reference the User model if you have one
        key: 'id',
      },
    },
    carId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Car', // Reference the Car model if you have one
        key: 'id',
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
    },
    // You can add more attributes as needed
  },
  {
    sequelize, // Use the configured Sequelize instance
    modelName: 'review', // Define the table name
  }
);

module.exports = Review;
