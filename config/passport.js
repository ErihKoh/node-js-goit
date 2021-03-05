const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const Users = require("../models").User;

require("dotenv").config();
const SECRET_WORD = process.env.JWT_SECRET;

const params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_WORD,
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await Users.findOne({ where: { id: payload.id } });
      if (!user) {
        return done(new Error("User not found"));
      }

      if (!user.token) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);
