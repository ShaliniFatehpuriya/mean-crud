const express = require("express");
const router = express.Router();
const {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../handlers/userHandle");

//add a user
router.post("/users", async (req, res) => {
  //add the user using handlers
  let user = await addUser(req.body);
  res.send(user);
});

//get list o fall users
router.get("/users", async (req, res) => {
  //add the user using handlers
  let users = await getUsers();
  res.send(users);
});
router.get("/users/:id", async (req, res) => {
  //add the user using handlers
  let user = await getUserById(req.params["id"]);
  res.send(user);
});

// router.put("/users/:id", async (req, res) => {
//   //add the user using handlers
//   console.log(req.body);
//   let user = await updateUser(req.params["id"], req.body);
//   res.send(user);
// });
router.put("/users/:id", async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request Params:", req.params);

    let user = await updateUser(req.params.id, req.body);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/users/:id", async (req, res) => {
  //add the user using handlers

  let user = await deleteUser(req.params["id"]);
  res.send(user);
});

module.exports = router;
