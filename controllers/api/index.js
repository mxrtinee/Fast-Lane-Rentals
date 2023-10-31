const express = require('express');
const router = express.Router();

// Import individual route files for the resource
const bookingRoutes = require('./bookingRoutes');
const carRoutes = require('./carRoutes');
const userRoutes = require('./userRoutes');

// Define the base route for the resource (e.g., '/bookings' or '/cars')
router.use('/bookings', bookingRoutes); // Use the booking routes
router.use('/cars', carRoutes); // Use the car routes
router.use('/users', userRoutes); // Use the user routes

module.exports = router;
