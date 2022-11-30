const mongoose = require("mongoose");

const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const userSchema = new mongoose.Schema(
  {
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [validateEmail, "Adresse mail invalide"],
      lowercase: true,
      uppercase: false,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      max: 1024,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      default: "./uploads/profil/default_profile.png",
    },
    bio: {
      type: String,
      max: 1024,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
