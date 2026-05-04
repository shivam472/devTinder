const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const { errorMiddleware } = require("./middlewares/error");
const { connectDB } = require("./database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    await User.create(req.body);
    res.send("Successfully added user to database");
  } catch (err) {
    res.status(400).send("Invalid request");
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  if (!userEmail) {
    res.status(400).send("Invalid request!");
  }

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

app.delete("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const result = await User.deleteOne({ email: userEmail });
    if (result.deletedCount === 0) res.status(404).send("user not found!");
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

app.patch("/user", async (req, res) => {
  const userEmail = req.body.email;
  const newEmail = req.body.newEmail;
  try {
    const result = await User.updateOne(
      { email: userEmail },
      {
        email: newEmail,
      },
    );
    if (result.matchedCount === 0)
      return res.status(404).send("user not found!");

    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong!");
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
