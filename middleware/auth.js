const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("request denied, token not provided");
  try {
    const decodedPayload = jwt.verify(token, config.get("jwtKey"));
    req.user = decodedPayload;
    next();
  } catch (ex) {
    console.log(ex);
    res.status(400).send("token is invalid!");
  }
};
