const jwt = require("jsonwebtoken");
const User = require("../models/user");

const SECRET_KEY = "DEVTINDER@7477";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).send("Authentication required");

    const decoded = jwt.verify(token, SECRET_KEY); // throws on invalid/expired
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).send("Authentication required");

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      return res.status(401).send("Authentication required");
    }
    console.error("userAuth unexpected error:", err);
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  userAuth,
  SECRET_KEY,
};
