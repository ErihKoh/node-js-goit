const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User: Users, Gender } = require("../models");
const { HttpCode } = require("../helpers/constants");

require("dotenv").config();
const SECRET_WORD = process.env.JWT_SECRET;

const reg = async (req, res, next) => {
  try {
    const { name, email, password, sex = "none" } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        data: "Conflict",
        message: "Email is already use",
      });
    }
    const gender = await Gender.findOne({ where: { name: sex } });
    const newUser = await Users.create({
      name,
      email,
      password: await bcrypt.hash(password, bcrypt.genSaltSync(10), null),
      sex: gender.id,
    });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        data: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_WORD, { expiresIn: "2h" });
    user.token = token;
    await user.save();

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await Users.update({ token: null }, { where: { id } });
  return res.status(HttpCode.NO_CONTENT).json({ message: "Nothing" });
};

module.exports = { reg, login, logout };
