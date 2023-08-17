const mongoose = require("../db/connection");

const smoothieSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: String,
  image: String,
  price: Number,
});

const Smoothie = new mongoose.model("Smoothie", smoothieSchema);

module.exports = Smoothie;
