// Import necessary modules
const sequelize = require("../config/connection"); // Import your configured Sequelize instance
const userData = require("./userData.json"); // Import user seed data
const carData = require("./carData.json"); // Import car seed data
const bookingData = require("./bookingData.json"); // Import booking seed data

// Import your Sequelize models
const { User, Car, Booking } = require("../models");

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Sync the models to the database (creates the tables)
    await sequelize.sync({ force: true });

    // Seed data for users, cars, and bookings
    await User.bulkCreate(userData);
    await Car.bulkCreate(carData);
    await Booking.bulkCreate(bookingData);

    console.log("Database seeded successfully.");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};

// Call the seedDatabase function to populate the database
seedDatabase();
