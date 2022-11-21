const mongoose = require("mongoose");
const logger = require("../middleware/logger");

const mongoDbUri = `mongodb+srv://hamzaAdmin:${process.env.db_password}@cluster0.hutqdah.mongodb.net/vidly?retryWrites=true&w=majority`;

module.exports = () => {
  mongoose
    .connect(mongoDbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info(" Mongoose is connected"))
    .catch((e) => logger.error(`MongoDB connection error: ${e.message}`));
};
