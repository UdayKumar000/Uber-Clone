import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minLength: [3, "Last name must be at least 3 characters long"],
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // Exclude password field from query results by default
  },
  gmail: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Gmail must be at least 5 characters long"],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  socketId: {
    type: String,
  },
});

// methods

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

export const User = mongoose.model("User", userSchema);
