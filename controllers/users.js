const jwt = require("jsonwebtoken");
// const path = require("path");
const fs = require("fs").promises;
// const Jimp = require("jimp");
const { promisify } = require("util");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const Users = require("../model/users");
const { HttpCode } = require("../helpers/constants");
// const createFolderIsExist = require("../helpers/create-dir");

const SECRET_WORD = process.env.JWT_SECRET;
// const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadCloud = promisify(cloudinary.uploader.upload);

const reg = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findByEmail(email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        data: "Conflict",
        message: "Email is already use",
      });
    }
    const newUser = await Users.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatar,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.validPassword(password);
    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        data: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_WORD, { expiresIn: "2h" });
    await Users.updateToken(id, token);

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
  const userId = req.user.id;
  await Users.updateToken(userId, null);
  return res.status(HttpCode.NO_CONTENT).json({ message: "Nothing" });
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const {
      public_id: imgIdCloud,
      secure_url: avatarUrl,
    } = await saveAvatarToCloud(req);
    await Users.updateAvatar(id, avatarUrl, imgIdCloud);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: {
        avatarUrl,
      },
    });
  } catch (e) {
    next(e);
  }
};

// const saveAvatarToStatic = async (req) => {
//   const id = req.user.id;
//   const pathFile = req.file.path;
//   const newNameAvatar = `${Date.now()}-${req.file.originalname}`;
//   const img = await Jimp.read(pathFile);
//   await img
//     .autocrop()
//     .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
//     .writeAsync(pathFile);
//   await createFolderIsExist(path.join(AVATARS_OF_USERS, id));
//   await fs.rename(pathFile, path.join(AVATARS_OF_USERS, id, newNameAvatar));
//   const avatarUrl = path.normalize(path.join(id, newNameAvatar));
//   try {
//     await fs.unlink(
//       path.join(process.cwd(), AVATARS_OF_USERS, req.user.avatar)
//     );
//   } catch (e) {
//     console.log(e.message);
//   }
//   return avatarUrl;
// };

const saveAvatarToCloud = async (req) => {
  const pathFile = req.file.path;
  const result = await uploadCloud(pathFile, {
    public_id: req.user.imgIdCloud?.replace("Photo/", ""),
    folder: "Photo",
    transformation: { width: 250, height: 250, crop: "fill" },
  });
  // cloudinary.uploader.destroy(req.user.imgIdCloud, (err, result) => {
  //   console.log(err, result);
  // });
  try {
    await fs.unlink(pathFile);
  } catch (e) {
    console.log(e.message);
  }
  return result;
};
// 1111
module.exports = { reg, login, logout, avatars };
