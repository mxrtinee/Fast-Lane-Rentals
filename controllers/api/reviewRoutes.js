const express = require("express");
const router = express.Router();
const { Review, Car } = require("../../models");

// Create a new review for a car
router.post("/", async (req, res) => {
  try {
    // Assuming you have a user ID and car ID associated with the review
    const { userId, carId, content, rating } = req.body;

    // Check if the car exists
    const car = await Car.findByPk(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Create a new review
    const review = await Review.create({ userId, carId, content, rating });

    return res.status(201).json({ message: "Review created successfully", review });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get reviews for a specific car
router.get("/:carId", async (req, res) => {
  try {
    const { carId } = req.params;

    // Find all reviews associated with the car
    const reviews = await Review.findAll({
      where: { carId },
    });

    return res.status(200).json(reviews);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
