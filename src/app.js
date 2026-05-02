const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const { errorMiddleware } = require("./middlewares/error");
const { connectDB } = require("./database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Shivam",
    lastName: "Pandey",
    email: "shivam@pandey.com",
    password: "shivam@123",
    gender: "male",
  });

  try {
    await user.save();
    res.send("Successfully added user to database");
  } catch (err) {
    res.status(400).send("Invalid request");
  }
});

connectDB()
  .then(() => {
    app.listen(7777, () => {
      console.log("Server successfully listening on 7777...");
    });
  })
  .catch((err) => {
    console.log("Couldn't connect to the database");
  });
