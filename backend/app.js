const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-routes");
var cors = require("cors");

app.use(cors());

//this is a middleware as we're working with Json data on postman requests endpoints
app.use(express.json());
//connect to the database, mongodb GUI has the connection URL
async function connectDb() {
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "UsersDatabase",
  });
}
//connecting and catching the error after this we will create a schema in db folder
connectDb().catch((err) => {
  console.log(err);
});

//request mapping for get request at "/"
app.get("/", (req, res) => {
  res.send("Hello User");
});
app.use(userRoutes);

//creating a server which runs on port number 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
