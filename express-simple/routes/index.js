var express = require("express");
var router = express.Router();
const { articles } = require("../model/data.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Главная" });
});

router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Связаться со мной" });
});

router.get("/blog", function (req, res, next) {
  res.render("blog", { title: "Блог", articles });
});
module.exports = router;
