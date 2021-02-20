const express = require("express");
const { query, validationResult } = require("express-validator");

const got = require("got");
const router = express.Router();
require("dotenv").config();

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  next();
};

router.get(
  "/",
  [query("lat").isNumeric(), query("lon").isNumeric()],
  validator,
  async (req, res, next) => {
    const { lat, lon } = req.query;
    const apiKey = process.env.API_KEY;
    try {
      const response = await got(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          searchParams: {
            lat,
            lon,
            appid: apiKey,
          },
        }
      );

      const { weather, wind, name } = JSON.parse(response.body);
      res.json({ weather, wind, name });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
