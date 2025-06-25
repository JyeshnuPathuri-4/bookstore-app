const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["buyer", "author", "admin"],
    default: "buyer",
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String, // URL to image
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

const User = mongoose.model("User", userSchema);
module.exports = User;
