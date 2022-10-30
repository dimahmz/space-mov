const { User, validate } = require("../models/user"),
  express = require("express"),
  _ = require("lodash"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  config = require("config"),
  router = express.Router(),
  auth = require("../middleware/auth");

router.post("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("this user is already resitred!");
  try {
    user = new User(_.pick(req.body, ["name", "email", "password"]));
    console.log(user.generateToken());
    const slat = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, slat);
    await user.save();
    const token = jwt.sign({ _id: user._id }, config.get("jwtKey"));
    return res
      .header("x-auth-token", token)
      .send(_.pick(user, ["name", "email", "password"]));
  } catch (e) {
    console.log(e.message);
    return res.status(404).send(e.message);
  }
});

module.exports = router;
