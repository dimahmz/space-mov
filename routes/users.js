const { User, validate } = require("../models/user"),
  express = require("express"),
  router = express.Router();
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(404).send("this user is already resitred!");
  try {
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.send(user);
  } catch (e) {
    console.log(e);
    return res.status(404).send(e);
  }
});

module.exports = router;
