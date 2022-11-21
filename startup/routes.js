const genres = require("../routes/genres");
const costumers = require("../routes/costumers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const home = require("../routes/home");

module.exports = (app) => {
  app.use("/api/genres", genres);
  app.use("/api/costumers", costumers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/", home);
};
