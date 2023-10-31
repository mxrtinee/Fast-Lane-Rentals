// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { Booking } = require('../../models/Booking');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  const { name, date } = req.body;

  try {
    const booking = await Booking.create({ name, date });
    return res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a booking by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date } = req.body;

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update booking data
    await booking.update({ name, date });

    return res.status(200).json({ message: 'Booking updated successfully', booking });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a booking by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Delete the booking
    await booking.destroy();

    return res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;