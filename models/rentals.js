const mongoose = require("mongoose");
const Joi = require("joi");

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          minlength: 2,
          maxlenght: 255,
          trim: true,
        },
        dailyRentalRate: {
          type: Number,
          default: 0,
          min: 0,
          max: 500,
        },
      }),
      required: true,
    },
    costumer: {
      type: new mongoose.Schema({
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
        },
      }),
    },
    dateOut: {
      type: Date,
      default: Date.now,
      required: true,
    },
    dateReturned: {
      type: Date,
    },
    payment: {
      type: Number,
      required: true,
      min: 0,
    },
  })
);

function validateRental(Rental) {
  const schema = {
    costumerId: Joi.objectId(),
    movieId: Joi.objectId(),
    payment: Joi.number().required().min(0),
  };
  return Joi.validate(Rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;
