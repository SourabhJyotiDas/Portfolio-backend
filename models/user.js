
// const mongoose = require("mongoose")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Please enter a name"],
   },

   email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: [true, "Email already exists"],
   },

   password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
   },

   role: {
      type: String,
      default: "user",
   },
});

userSchema.pre("save", async function (next) {
   if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
   }
   next();
});

userSchema.methods.generateToken = function () {
   return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

userSchema.methods.matchPassword = async function (password) {
   return await bcrypt.compare(password, this.password);
};

// module.exports = mongoose.model("User", userSchema);
const Payment = mongoose.model("User", userSchema);
export default Payment;