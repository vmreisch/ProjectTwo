const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vmreisch:lB8gFhNbeB55DIpO@cluster0.prvhg3n.mongodb.net/lifestyle-smoothies"
);

mongoose.connection.on("connected", () => console.log("MongoDB is blending!"));
mongoose.connection.on("error", () =>
  console.log("MongoDB blender not spinning")
);

module.exports = mongoose;
