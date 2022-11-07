const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genres");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlenght: 255,
      trim: true,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInstock: {
      type: Number,
      default: 0,
      min: 0,
      max: 500,
    },
    dailyRentalRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 500,
    },
  })
);



function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(2).max(255).required(),
    numberInstock: Joi.number().min(0).max(500).required(),
    dailyRentalRate: Joi.number().min(0).max(500).required(),
    genreId: Joi.objectId().required(),
  };
  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
