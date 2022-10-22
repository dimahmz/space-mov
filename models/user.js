const mongoose = require("mongoose");
const logger = require("debug")("app:start_up");
const Joi = require("joi");

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    name: {
      required: true,
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
);

function validateUser(user) {
  const schema = {
    name: Joi.string().required().min(3),
    password: Joi.string().required().min(8),
    email: Joi.string().required(),
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
