const express = require("express");
const router = express.Router();
router.get("/", (request, response) => {
  response.render("index", { title: "myExpress", message: "👋 Hello World!" });
});
module.exports = router;
