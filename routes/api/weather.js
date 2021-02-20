const express = require("express");
const got = require("got");
const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res, next) => {
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

    res.json(JSON.parse(response.body));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
