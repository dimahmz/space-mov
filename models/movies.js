const mongoose = require("mongoose");
const logger = require("debug")("app:start_up");
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

async function addMovie({ title, genre, numberInstock, dailyRentalRate }) {
  let movie = new Movie({ title, genre, numberInstock, dailyRentalRate });
  movie = await movie.save();
  logger(movie);
}

// addMovie({
//   title: "Cast Away",
//   genre: {
//     _id: "634fd5b6da858a8e691a550b",
//     name: "Drama",
//   },
//   numberInstock: 4,
//   dailyRentalRate: 39,
// });
// {
//   title: "Inception",
//   genre: {
//     _id: "634fd59ada858a8e691a5509",
//     name: "adventure",
//   },
//   numberInstock: 19,
//   dailyRentalRate: 48,
// };

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(2).max(255).required(),
    numberInstock: Joi.number().min(0).max(500).required(),
    dailyRentalRate: Joi.number().min(0).max(500).required(),
    genreId: Joi.string().min(10).max(30).required(),
  };
  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
