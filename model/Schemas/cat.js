const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const catSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for cat"],
    unique: true,
  },
  age: {
    type: Number,
    min: 1,
    max: 25,
  },
  isVaccinated: {
    type: Boolean,
    default: false,
  },
  features: {
    type: Array,
    set: (data) => (!data ? [] : data),
  },
  date: { type: Date, default: () => Date.now },
  owner: {
    name: String,
    age: Number,
    address: String,
  },
});

const Cat = model("cat", catSchema);

module.exports = Cat;
