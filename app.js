const express = require("express");
const logger = require("morgan");

const app = express();
const weatherRouter = require("./routes/api/weather");

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/weather", weatherRouter);

module.exports = app;
