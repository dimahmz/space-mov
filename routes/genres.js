const express = require("express");
const { Genre, validate } = require("../models/genres");
const router = express.Router();
const auth = require("../middleware/auth");

//http protocols

router.get("/", async (req, res) => {
  const Genres = await Genre.find().select({ name: 1, _id: -1 });
  return res.send(Genres);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const name = req.body.name;
  let genre = new Genre({ name });

  genre = await genre.save();
  if (genre) return res.send(genre);

  res.status(404).send("cant add this genre!");
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.params.name,
    new: true,
  });

  if (genre) return res.send(genre);
  res.status(404).send("this genre doesn't exist!");
});

router.delete("/:id", auth, async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (genre) return res.send(genre);
  res.status(404).send("this genre doesn't exist!");
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (genre) return res.send(genre);
  res.status(404).send("this genre doesn't exist!");
});

module.exports = router;
