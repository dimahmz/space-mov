const express = require("express");
const { Costumer, validate } = require("../models/costumers");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
require("express-async-errors");

//http protocols

router.get("/", async (req, res) => {
  const costumer = await Costumer.find().select("name isGold phone");
  return res.send(costumer);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  const { name, isGold, phone } = req.body;
  let costumer = new Costumer({ name, isGold, phone });

  costumer = await costumer.save();
  if (costumer) return res.send(costumer);

  res.status(404).send("cant add this genre!");
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  const costumer = await Costumer.findByIdAndUpdate(req.params.id, {
    name: req.params.name,
    new: true,
  });

  if (costumer) return res.send(costumer);
  res.status(404).send("this Costumer doesn't exist!");
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const costumer = await Costumer.findByIdAndRemove(req.body.id);
  if (costumer) return res.send(costumer);
  res.status(404).send("this Costumer doesn't exist!");
});

router.get("/:id", async (req, res) => {
  const costumer = await Costumer.findById(req.body.id);
  if (costumer) return res.send(costumer);
  res.status(404).send("this Costumer doesn't exist!");
});

module.exports = router;
