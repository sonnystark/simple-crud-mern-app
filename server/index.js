const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const UserModel = require("./models/Users");
const cors = require("cors");

// INITIALIZE EXPRESS AND INVOKE IT
const app = express();

// DB CONNECTION USING MONGOOSE
mongoose.connect(process.env.MONGO_URI);

// MIDDLEWARE
app.use(express.json()); // PARSE DATA INTO OBJECTS
app.use(cors()); // CONNECTS TO THE CLIENT SIDE (REACT)

// ROUTES
// GET HANDLER
app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// POST HANDLER
app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(5150, () => {
  console.log("Listening on port 5150");
});
