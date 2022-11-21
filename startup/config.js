const config = require("config");

module.exports = () => {
  if (!config.get("jwtKey")) {
    throw new Error("jwtKey variable must be set");
  }
};
