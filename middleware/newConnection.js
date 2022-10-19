const logger = require("debug")("app:start_up");
function request(req, resp, next) {
  logger(`request on ${req.url}`);
  next();
}

module.exports = request;
