var express = require("express");
var router = express.Router();
var db = require("../models");

// routes

router.get("/", function (req, res) {
  res.render("frontpage");
});

// router.get("/api/")


module.exports = router;
