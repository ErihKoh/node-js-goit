const { Schema, model, SchemaTypes } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const catSchema = new Schema(
  {
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
    //   date: { type: Date, default: () => Date.now },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

// catSchema.virtual("strAge").get(function () {
//   return `${this.age} лет`;
// });

catSchema.plugin(mongoosePaginate);

const Cat = model("cat", catSchema);

module.exports = Cat;
