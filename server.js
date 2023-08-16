const express = require("express");
const app = express();
const PORT = 3000;
const expressLayouts = require("express-ejs-layouts");
const User = require("./models/user");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("account/login");
});

app.post("/login", async (req, res) => {
  console.log(req.body);

  let userToLogin = await User.findOne({ username: req.body.username });
  if (userToLogin) {
    if (userToLogin.password === req.body.password) {
      res.send("Logged in");
    } else {
      res.send("Invalid User");
    }
  }
});
app.post("/signup", async (req, res) => {
  console.log(req.body);
  if (req.body.username && req.body.password) {
    let newUser = await User.create(req.body);

    res.send(newUser);
  }
});

app.get("/signup", (req, res) => {
  res.render("account/signup");
});

app.listen(PORT, () => console.log(`Blending on port ${PORT}!`));
