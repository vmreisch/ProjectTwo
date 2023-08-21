const mongoose = require("../db/connection");

const orderSchema = new mongoose.Schema({
  userId: { ref: "User", type: mongoose.Schema.Types.ObjectId },
  smoothies: [{ ref: "Smoothie", type: mongoose.Schema.Types.ObjectId }],
  isComplete: Boolean,
  total: Number,
});

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
