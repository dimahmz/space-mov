const mongoose = require("mongoose");
const logger = require("debug")("app:start_up");
const Joi = require("joi");

const Costumer = mongoose.model(
  "Costumer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlenght: 255,
      trim: true,
    },
    isGold: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlenght: 20,
      // pattern:/+/
    },
  })
);

async function addCostumer({ name, phone, isGold }) {
  let costumer = new Costumer({ name, phone, isGold });
  costumer = await costumer.save();
  logger(costumer);
}

function validateCostumer(costumer) {
  const schema = {
    name: Joi.string().min(3).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(10).required(),
  };
  return Joi.validate(costumer, schema);
}

exports.Costumer = Costumer;
exports.validate = validateCostumer;
