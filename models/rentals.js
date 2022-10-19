const { Movie } = require("./movies");
const mongoose = require("mongoose");
const Joi = require("joi");
const logger = require("debug")("app:start_up");

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

async function addRental({ costumer, movie }, id, payement) {
  var { _id, name, isGold, phone, payement } = costumer,
    { title, dailyRentalRate } = movie;
  let rental = new Rental({
    costumer: { _id, name, isGold, phone, payement },
    movie: { _id: id, title, dailyRentalRate },
    payement,
  });
  try {
    rental.save();
    Movie.findByIdAndUpdate(id, { numberInstock: { $inc: -1 } });
  } catch (er) {
    logger(er);
  }
}

//to delete all document

// Rental.deleteMany().then((document) => logger(document));

// const movie = {
//   title: "US",
//   dailyRentalRate: 4,
// };
// const costumer = {
//   _id: "634b464fd0c43ab5a6207259",
//   name: "Osama",
//   isGold: true,
//   phone: "5366392233",
//   payement: 10,
// };
// addRental({ costumer, movie }, "634c18942fd979f3bebc2d16", 10);

exports.Rental = Rental;
exports.validate = validateRental;
