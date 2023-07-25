
// const { errorHandler } = require("../middleware/error");
// const User = require("../models/user");

import  { errorHandler } from "../middleware/error.js";
import User from "../models/user.js";


export const register = async (req, res) => {
   try {
      const { name, email, password } = req.body;

      if (!name || !email || !password)
         return errorHandler(res, 400, "Please enter all fields");

      let user = await User.findOne({ email });

      if (user) return errorHandler(res, 400, "User already registered with this email");

      user = await User.create({
         name,
         email,
         password,
      });

      const token = await user.generateToken(); // Generate Random token everytime

      const options = {
         expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
         httpOnly: true,
      };
      

      res.status(201).cookie("token", token, options).json({
         success: true,
         message: `Welcome ${user.name} to my Portfolio`,
      });
   } catch (error) {
      res.status(400).json({
         success: false,
         error: error.message,
      });
   }
}

export const login = async (req, res) => {
   try {
      const { email, password } = req.body;

      const user = await User.findOne({ "email": email }).select("+password");

      if (!user) {
         return res.status(400).json({
            success: false,
            message: "User does not exist",
         });
      }

      const isMatch = await user.matchPassword(password); // return True or False

      if (!isMatch) {
         return res.status(400).json({
            success: false,
            message: "Incorrect password",
         });
      }

      const token = await user.generateToken();

      const options = {
         expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
         httpOnly: true,
      };

      res.status(200).cookie("token", token, options).json({
         success: true,
         message: `Welcome back ${user.name}`,
      });

   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

export const logout = async (req, res) => {
   try {
      res
         .status(200)
         .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
         .json({
            success: true,
            message: "Logged out successfully",
         });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

export const me = async (req, res) => {
   try {
      const user = await User.findById(req.user._id);

      res.status(200).json({
         success: true,
         user,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
}