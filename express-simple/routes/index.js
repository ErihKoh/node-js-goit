const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const path = require("path");
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

router.post("/contact", async (req, res, next) => {
  try {
    await fs.writeFile(
      path.join(__dirname, "..", "model", "message.json"),
      JSON.stringify(req.body, null, 2)
    );
    res.redirect("/");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
