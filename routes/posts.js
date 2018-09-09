const express = require("express");
const router = express.Router();

// This service is to test Template engine Pug.
router.get("/", (req, res) => {
  res.render("index", { title: "My Express App", message: "Hello World..." });
});

router.get("/:year/:month", (req, res) => {
  res.send({ params: req.params, query: req.query });
});

module.exports = router;