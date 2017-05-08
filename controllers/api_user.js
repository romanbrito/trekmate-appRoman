var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/api/user/id", function (req, res) {
  res.render("index");
});

router.get("/api/");


module.exports = router;
