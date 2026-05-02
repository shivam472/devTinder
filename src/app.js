const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const { errorMiddleware } = require("./middlewares/error");
const { connectDB } = require("./database");

const app = express();

connectDB()
  .then(() => {
    app.listen(7777, () => {
      console.log("Server successfully listening on 7777...");
    });
  })
  .catch((err) => {
    console.log("Couldn't connect to the database");
  });
