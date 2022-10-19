const mongoose = require("mongoose");
const logger = require("debug")("app:start_up");

async function addGenre(name) {
  const newGenre = new genre({ name });
  const genreDoc = await newGenre.save();
  logger(genreDoc);
}

//Shema and Model

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

exports.Genre = genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre;
