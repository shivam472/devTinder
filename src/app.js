const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const { errorMiddleware } = require("./middlewares/error");

const app = express();

// auth middlewares
app.use("/admin", adminAuth);
app.use("/user", userAuth);

app.get("/user/:userId/:name", (req, res) => {
  console.log(req.query); // query parameter: /user?id=123&name=shivam -> response { id: '123', name: 'shivam' }
  console.log(req.params); // dynamic routes: /user/123/shivam -> response { userId: '123', name: 'shivam' }
  throw new Error("random error");
  res.send("Hello Shivam!");
});

app.post("/user", (req, res) => {
  res.send("Successfully save user to the DB");
});

app.patch("/user", (req, res) => {
  res.send("Successfully updated the user in the DB");
});

app.put("/user", (req, res) => {
  res.send("Successfully overridden the user in the DB");
});

app.delete("/user", (req, res) => {
  res.send("Successfully deleted the user from the DB");
});

app.get("/", (req, res) => {
  res.send("Welcome Home!");
});

// error middleware to handle any unhandled error
app.use("/", errorMiddleware);

app.listen(7777, () => {
  console.log("Server successfully listening on 7777...");
});
