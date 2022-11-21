const Express = require("express");
const mongoose = require("mongoose");
const winston = require("winston");

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
const logger = require("./middleware/logger");

const app = Express();


if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      level: "debug",
    })
    );
  }

process.on("uncaughtException", (er)=>{
  logger.error(er.message,er);
  process.exit(1);
});

process.on("unhandledRejection", (er)=>{
  logger.error(er.message,er);
  process.exit(1);
});
  
  if (!config.get("jwtKey")) {
    logger.error("jwtKey variable must be set");
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

const mongoDbUri = `mongodb+srv://hamzaAdmin:${process.env.db_password}@cluster0.hutqdah.mongodb.net/vidly?retryWrites=true&w=majority`;
mongoose
  .connect(mongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info(" Mongoose is connected"))
  .catch((e) => logger.error(`MongoDB connection error: ${e.message}`));

//starting the server

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = app;
