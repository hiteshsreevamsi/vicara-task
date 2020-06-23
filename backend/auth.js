const jwt = require("jsonwebtoken");

const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-header-token");
  if (!token) res.status(400).json({ msg: "Token is not present" });
  try {
    const decode = jwt.verify(token, config.get("jwtSecret"));
    req.user = decode.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ msg: "Token is not valid" });
  }
};
