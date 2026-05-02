const mongoose = require("mongoose");

const DATABASE_URI =
  "mongodb+srv://shivamraj472_db_user:LIj3468vsiPxeSWi@cluster0.ejpu26y.mongodb.net/devTinder";

const connectDB = async () => {
  await mongoose.connect(DATABASE_URI);
  console.log("Successfully connected to Database");
};

module.exports = {
  connectDB,
};
