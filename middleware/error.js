const logger = require("debug")("app:start_up");

module.exports = function (err, req, res, next) {
  logger(err.message);
  res.status(500).send("somthing failed");
};
