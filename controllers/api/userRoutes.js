const router = require("express").Router();
const User = require("../../models/User");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const userDataFilePath = path.join(__dirname, "../../seeds/userData.json");

// creating a new user
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
    const userData = JSON.parse(fs.readFileSync(userDataFilePath, "utf8"));
    // Create a new user object with hashed password
    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    userData.push(newUser);

    fs.writeFileSync(
      userDataFilePath,
      JSON.stringify(userData, null, 2),
      "utf8"
    );

    // Redirect to the user's dashboard or another page
    res.redirect("/homepage");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// log in
router.post("/login", async (req, res) => {
  try {
    // Read userData.json file
    const userData = JSON.parse(fs.readFileSync(userDataFilePath, "utf8"));

    // Find user by email
    const dbUserData = userData.find((user) => user.email === req.body.email);
    if (!dbUserData) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
    }

    // Check if the password is correct using bcrypt
    const validPassword = await bcrypt.compare(
      req.body.password,
      dbUserData.password
    );
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
    }

    // Proceed with login
    req.session.save(() => {
      req.session.logged_in = true;
      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204);
      res.redirect("/login");
      console.log("loggedout");
    });
  } else {
    res.status(404).end();
  }
});

// updates user information
router.put("/:id", async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id);

    if (!dbUserData) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    dbUserData.email = req.body.email || dbUserData.email;
    dbUserData.username = req.body.username || dbUserData.username;

    if (req.body.password) {
      dbUserData.password = req.body.password;
    }

    await dbUserData.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// deletes a user
router.delete("/:id", async (req, res) => {
  try {
    const dbUserData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dbUserData) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
