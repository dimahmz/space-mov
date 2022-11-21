const Express = require("express");
const app = Express();
const error = require("./middleware/error");
const logger = require("./middleware/logger");

app.use(Express.json());

//logging errors
require("./startup/logging")();
//app routes
require("./startup/routes")(app);
// database connection
require("./startup/dbConnection")();
//app config
require("./startup/config")();

app.use(error);

// temlating engines
app.set("view engine", "pug");
app.set("views", "./views");

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = app;
