const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { Sex } = require("../../helpers/constants");
const SALT_WORK_FACTOR = 8;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      default: "Guest",
    },
    sex: {
      type: String,
      enum: {
        values: [Sex.MALE, Sex.FEMALE, Sex.NONE],
        message: "It isn't alowed",
      },
      default: "none",
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: "250" }, true);
      },
    },
    imgIdCloud: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt, null);
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
