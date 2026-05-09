const express = require("express");
const { userAuth, SECRET_KEY } = require("./middlewares/auth");
const { errorMiddleware } = require("./middlewares/error");
const { connectDB } = require("./database");

const bcrypt = require("bcrypt");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, age } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      gender,
      age,
    });
    res.send("Successfully added user to database");
  } catch (err) {
    res.status(400).send(`Invalid request: ${err.message}`);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Invalid credentials!");

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Invalid credentials");

    const passwordHash = user.password;
    const isMatch = await bcrypt.compare(password, passwordHash);
    if (!isMatch) return res.status(401).send("Invalid credentials");

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
    });
    res.send("Successfully logged in!");
  } catch (err) {
    res.status(500).send(`Something went wrong! ${err.message}`);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    return res.send(user);
  } catch (err) {
    res.status(500).send(`Something went wrong! ${err.message}`);
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
    if (result.deletedCount === 0)
      return res.status(404).send("user not found!");
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
    console.error(err);
  });
