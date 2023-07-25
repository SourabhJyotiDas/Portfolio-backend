// const app = require("./app.js")
// const { connectToDatabase } = require("./config/database.js")
// const cloudinary = require("cloudinary");

import app from "./app.js";
import {connectToDatabase} from "./config/database.js";
import cloudinary from "cloudinary"


connectToDatabase()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
