const express = require("express");
const { Movie, validate } = require("../models/movies");
const { Genre } = require("../models/genres");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

//http protocols

router.get("/", async (req, res) => {
  const movies = await Movie.find().select({
    title: 1,
    _id: -1,
    genre: { name: 1, _id: -1 },
  });
  return res.send(movies);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  const genreId = req.body.genreId;
  let genre = await Genre.findById(genreId);
  if (!genre) return res.send("this gener doesn't exist ");

  genre = { name: genre.name, _id: genre._id };
  let movie = new Movie({
    title: req.body.title,
    genre,
    dailyRentalRate: req.body.dailyRentalRate,
    numberInstock: req.body.numberInstock,
  });
  movie = await movie.save();
  if (movie) return res.send(movie);

  res.status(404).send("cant add this movie!");
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(req.body.id, {
    title: req.body.title,
    new: true,
  });

  if (movie) return res.send(movie);
  res.status(404).send("this movie doesn't exist!");
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.body.id);
  if (movie) return res.send(movie);
  res.status(404).send("this movie doesn't exist!");
});

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("invalid id");
  const movie = await Movie.findById(req.params.id);
  // logger(movie);
  if (!movie) return res.status(404).send("this movie doesn't exist!");
  return res.send(movie);
});

module.exports = router;
