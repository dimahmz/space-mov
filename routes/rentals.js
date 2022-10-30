const express = require("express");
const { Rental, validate } = require("../models/rentals");
const { Movie } = require("../models/movies");
const { Costumer } = require("../models/costumers");
const logger = require("debug")("app:start_up");
const router = express.Router();
const auth = require("../middleware/auth");

//http protocols

router.get("/", async (req, res) => {
  const movies = await Rental.find().select("-_id -_v").sort("dateOut");
  return res.send(movies);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const costumer = await Costumer.findById(req.body.costumerId),
    movie = await Movie.findById(req.body.movieId);
  // logger(costumer, movie);
  if (!movie || !costumer)
    return res.send.status(400)(
      `this ${movie ? "costumer" : "movie"} gener doesn't exist `
    );
  if (movie.numberInstock == 0)
    return res.status(400).send("movie is out of stock");
  let rental = new Rental({
    costumer: {
      //_id is set, because mongoose will generate new one automatically
      _id: costumer._id,
      name: costumer.name,
      phone: costumer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
    payment: req.body.payment,
  });
  // two phase commit
  rental
    .save()
    .then(() => {
      movie.numberInstock--;
      movie.save();
      res.send(rental);
    })
    .catch((e) => {
      logger(e);
      res.status(404).send("cant add this rental!");
      movie.numberInstock++;
      movie.save();
      Rental.findByIdAndDelete(rental._id);
    });
});

module.exports = router;
