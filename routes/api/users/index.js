const express = require("express");
const router = express.Router();
const validate = require("./validation");
const userController = require("../../../controllers/users");
const guard = require("../../../helpers/guard");
const { createAccountLimiter } = require("../../../helpers/rate-limit-req");
const upload = require("../../../helpers/upload");

router.post(
  "/registration",
  createAccountLimiter,
  validate.regUser,
  userController.reg
);
router.post("/login", validate.loginUser, userController.login);
router.post("/logout", guard, userController.logout);
router.patch(
  "/avatar",
  guard,
  upload.single("avatar"),
  validate.validateUploadAvatar,
  userController.avatars
);

module.exports = router;
