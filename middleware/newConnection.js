const logger = require("./logger");
function request(req, resp, next) {
  logger.debug(`request on ${req.url}`);
  next();
}

module.exports = request;
