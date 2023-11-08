const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const userDataFilePath = path.join(__dirname, "userData.json");
const withAuth = require("../utils/auth");

// Route to render the homepage
router.get("/", (req, res) => {
  // Render the homepage view
  const carData = JSON.parse(fs.readFileSync("seeds/carData.json", "utf8"));
  res.render("homepage", { cars: carData }); // Replace with your actual homepage view name
});
 
// Route to render the about page
router.get("/about", (req, res) => {
  // Render the about view
  res.render("about"); // Replace with your actual about view name
});

// Define a route to render the booking form
router.get('/bookings/new', (req, res) => {
  // Render the booking form and pass the car data to the template
  res.render('bookingForm', { cars: carData });
});

// Route to render the login page
router.get("/login", (req, res) => {
  //If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/logout", (req, res) => {
  //If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/homepage");
    return;
  }

  res.render("login");
});

// Route to render the signup page
router.get("/signup", (req, res) => {
  // Render the signup view
  res.render("signup"); // Replace with your actual signup view name
});

router.get("/cars", withAuth, (req, res) => {
  const carData = JSON.parse(fs.readFileSync("seeds/carData.json", "utf8"));
  res.render("cars", { cars: carData });
});

// User signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already in use in your database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      // Handle duplicate email error
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Read the existing user data from userData.json
    const userData = JSON.parse(fs.readFileSync(userDataFilePath, "utf8"));

    // Check if the email is already in use in userData.json
    const emailExistsInJson = userData.some((user) => user.email === email);
    if (emailExistsInJson) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Create a new user object with hashed password
    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    // Add the new user to the existing user data in userData.json
    userData.push(newUser);

    // Write the updated user data back to userData.json
    fs.writeFileSync(
      userDataFilePath,
      JSON.stringify(userData, null, 2),
      "utf8"
    );

    // Redirect to the user's dashboard or another page
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
