const express = require('express');
const router = express.Router();
const { Car } = require('../../models/Car');

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.findAll();
    return res.status(200).json(cars);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new car
router.post('/', async (req, res) => {
  const { make, model, year } = req.body;

  try {
    const car = await Car.create({ make, model, year });
    return res.status(201).json({ message: 'Car created successfully', car });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a car by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { make, model, year } = req.body;

  try {
    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Update car data
    await car.update({ make, model, year });

    return res.status(200).json({ message: 'Car updated successfully', car });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a car by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Delete the car
    await car.destroy();

    return res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;