const mongoose = require("../db/connection");

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
