const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");

  //check if no token
  if (!token) {
    return res
      .status(401)
      .json({ code: 1, msg: "No token, authorization denied" });
  }
  // verify token
  try {
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ code: 0, msg: "Token is not valid" });
  }
};
