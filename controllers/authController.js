const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  let userToLogin = await User.findOne({ username: req.body.username });
  if (userToLogin) {
    bcrypt.compare(req.body.password, userToLogin.password, (err, result) => {
      if (result) {
        req.session.userId = userToLogin._id;
        req.session.name = userToLogin.name;
        res.redirect("/smoothie");
      } else {
        res.send("Incorrect Passord");
      }
    });
  }
});

router.post("/signup", async (req, res) => {
  if (req.body.username && req.body.password) {
    let plainTextPassword = req.body.password;

    let existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.send("Username already taken");
    }

    bcrypt.hash(plainTextPassword, 10, async (err, hashedPassword) => {
      if (err) {
        return res.status(500).send("Error hashing password");
      }

      req.body.password = hashedPassword;
      let newUser = await User.create(req.body);

      req.session.userId = newUser._id;
      req.session.name = newUser.name;

      res.redirect("/smoothie");
    });
  } else {
    res.send("Please provide a username and password");
  }
});

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
