const router = require("express").Router();
const withAuth = require('../utils/auth');
const { Booking, User, Car } = require("../models");

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
   //If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/about', (req, res) => {
  res.render('about');
});

// User signup route
router.get('/signup', (req, res) => {
  res.render('signup'); // Render the signup form view
});

router.post('/signup', async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // You should add validation and error handling here (e.g., checking if the email is unique)

    // Create a new user in your database
    const newUser = await User.create({
      username,
      email,
      password, // You should hash the password before storing it
    });

    // Set the user as logged in by creating a session
    req.session.logged_in = true;
    req.session.user_id = newUser.id; // Store user ID in the session

    // Redirect to the user's dashboard or another page
    res.redirect('/dashboard');
  } catch (err) {
    // Handle any errors, such as validation errors or database issues
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  // Clear the user's session to log them out
  req.session.destroy(() => {
    res.redirect('/'); // Redirect to the home page after logout
  });
});

module.exports = router;