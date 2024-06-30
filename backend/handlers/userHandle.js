//import the userschema currently used as DB middleware
const User = require("../db/user");

async function addUser(userModel) {
  //add the user
  const user = new User({
    ...userModel,
  });
  await user.save();
  //convert user model to plain JavaScript object
  return user.toObject();
}

async function getUsers() {
  let users = await User.find();

  return users;
}
async function getUserById(id) {
  let user = await User.findById(id);
  return user;
}
async function updateUser(id, userModel) {
  console.log(userModel);
  const filter = { _id: id };
  await User.findOneAndUpdate(filter, userModel);
}

async function deleteUser(id) {
  console.log(id);
  await User.findByIdAndDelete(id);
}

module.exports = { addUser, getUsers, getUserById, updateUser, deleteUser };
