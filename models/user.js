const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 4,
      maxlength: 255,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      minlength: 14,
      maxlength: 255,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 1024,
      required: true,
    },
  })
);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(4).max(255).required(),
    email: Joi.string().required().email().min(8).max(255),
    password: Joi.string().min(8).max(255).required(),
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
