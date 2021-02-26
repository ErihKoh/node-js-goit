const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const catSchema = new Schema({});

const Cat = model("cat", catSchema);
module.exports = Cat;
