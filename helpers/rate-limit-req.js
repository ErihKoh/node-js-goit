const rateLimit = require("express-rate-limit");
const { HttpCode } = require("./constants");

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 2,
  handler: (req, res, next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad Request",
      message: "Too many registarations, please try again later",
    });
  },
});

module.exports = { createAccountLimiter };
