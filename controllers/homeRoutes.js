const express = require("express");
const router = express.Router();

// Route to render the homepage
router.get("/homepage", (req, res) => {
  // Render the homepage view
  res.render("homepage"); // Replace with your actual homepage view name
});

// Route to render the about page
router.get("/about", (req, res) => {
  // Render the about view
  res.render("about"); // Replace with your actual about view name
});

// Route to render the login page
router.get('/login', (req, res) => {
  //If a session exists, redirect the request to the homepage
 if (req.session.logged_in) {
   res.redirect('/homepage');
   return;
 }

 res.render('login');
});

// Route to render the signup page
router.get("/signup", (req, res) => {
  // Render the signup view
  res.render("signup"); // Replace with your actual signup view name
});

router.get("/cars", (req, res) => {
  res.render("cars");
});

// User signup route
router.post("/signup", async (req, res) => {
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
    res.redirect("/userPage");
  } catch (err) {
    // Handle any errors, such as validation errors or database issues
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Logout route
router.get("/logout", (req, res) => {
  // Clear the user's session to log them out
  req.session.destroy(() => {
    res.redirect("/"); // Redirect to the home page after logout
  });
});

module.exports = router;
