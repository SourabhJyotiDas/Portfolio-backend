// const mongoose = require("mongoose");
import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   liveLink: {
      type: String,
      required: true
   },
   githubLink: {
      type: String,
      required: true
   },
   techStack: {
      type: [String],
      required: true
   },
   img: {
      public_id: String,
      url: String,
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

const Project  = mongoose.model("Project", projectSchema);
export default Project;