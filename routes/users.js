const { User, validate } = require("../models/user"),
  express = require("express"),
  _ = require("lodash"),
  router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(404).send("this user is already resitred!");

  try {
    user = new User(_.pick(req.body, ["name", "email", "password"]));
    await user.save();
    res.send(_.pick(user, ["name", "email"]));
  } catch (e) {
    console.log(e.message);
    return res.status(404).send(e.message);
  }
});

module.exports = router;
