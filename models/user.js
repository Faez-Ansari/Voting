var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/**
 * User Schema
 */

var userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username not provided "],
  },
  ssn: {
    type: Number,
    required: [true, "ssn not provided "],
  },
  role: {
    type: String,
    enum: ["normal", "admin"],
    required: [true, "Please specify user role"],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
