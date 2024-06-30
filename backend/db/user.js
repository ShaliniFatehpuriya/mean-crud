const mongoose = require("mongoose");
//How the collection will look its just a schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  address: String,
  password: String,
});
//telling the mongoose that the collection name is users and will be of type userSchema
const User = mongoose.model("users", userSchema);
//exporting the model
module.exports = User;
