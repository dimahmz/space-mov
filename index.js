const Express = require("express");
const mongoose = require("mongoose");
const logger = require("debug")("app:start_up");

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const genres = require("./routes/genres");
const costumers = require("./routes/costumers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const home = require("./routes/home");
const config = require("config");
const request = require("./middleware/newConnection");
const error = require("./middleware/error");

const app = Express();

if (!config.get("jwtKey")) {
  console.error("jwtKey variable must be set");
  process.exit(1);
}
//middlewares

//built-in middleware

app.use(Express.json());

//costume middleware

app.use(request);

//routes

app.use("/api/genres", genres);
app.use("/api/costumers", costumers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/", home);

app.use(error);

// temlating engines
app.set("view engine", "pug");
app.set("views", "./views");

// database connection

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => logger("connect succefully"))
  .catch((err) => logger(err.message));

//starting the server

const port = process.env.PORT || 3000;
app.listen(port, () => logger(`Listening on port ${port}...`));

module.exports = app;
