// const express = require("express");
// const { register, login, logout, me } = require("../controller/user");
// const { isAuthenticated } = require("../middleware/auth");

import express from "express";
import { register, login, logout, me } from "../controller/user.js";
import  { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();


router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, me);

export default router;