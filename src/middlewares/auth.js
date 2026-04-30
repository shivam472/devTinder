const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorized = token === "abc";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request!");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "abc";
  const isUserAuthorized = token === "abc";
  if (!isUserAuthorized) {
    res.status(401).send("Unauthorized request!");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
