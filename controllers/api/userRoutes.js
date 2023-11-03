const router = require("express").Router();
const { User } = require("../../models/User");

// creating a new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json({ user: dbUserData, message: "User created successfully. You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
});

// log in
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "User not found. Please try again with a different email or sign up." });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again! " });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      res
        .status(200)
        .json({ user: dbUserData, message: "Your are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
});

// logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
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
