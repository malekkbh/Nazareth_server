const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  pass: String,
});

const USER_MODEL = model("user", userSchema);

module.exports = USER_MODEL;
