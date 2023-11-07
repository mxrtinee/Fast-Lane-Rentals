const router = require('express').Router();

// Import individual route files for the resource
const bookingRoutes = require('./bookingRoutes');
const carRoutes = require('./carRoutes');
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');

// Define the base route for the resource (e.g., '/bookings' or '/cars')
router.use('/bookings', bookingRoutes); // Use the booking routes
router.use('/cars', carRoutes); // Use the car routes
router.use('/users', userRoutes); // Use the user routes
router.use('/reviews', reviewRoutes); // Use the review routes

module.exports = router;
