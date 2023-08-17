const express = require("express");
const app = express();
const PORT = 3000;
const expressLayouts = require("express-ejs-layouts");
const authRoutes = require("./controllers/authController");
const session = require("express-session");
const smoothieRoutes = require("./controllers/smoothieController");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(expressLayouts);
app.use(
  session({ secret: "somestringreandomdwd", cookie: { maxAge: 3600000 } })
);

app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.use((req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
    return;
  }

  next();
});

app.use("/smoothie", smoothieRoutes);

app.listen(PORT, () => console.log(`Blending on port ${PORT}!`));
