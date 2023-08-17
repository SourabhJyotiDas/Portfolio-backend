
import Project  from "../models/project.js";
import User  from "../models/user.js";
import { errorHandler }  from "../middleware/error.js";
import  cloudinary  from "cloudinary";


export const createProject = async (req, res) => {
   try {

      let user = await User.findOne(req.user.Id);
      if (user.role !== "admin") {
         return errorHandler(res, 400, "You are not allowed to create")
      }

      const { title, description, liveLink, githubLink, techStack, image } = req.body;

      if (!title || !description || !liveLink || !githubLink || !techStack) {
         return errorHandler(res, 400, "Please enter Required value")
      }

      const myCloud = await cloudinary.v2.uploader.upload(image, {
         folder: "Projects"
      });

      await Project.create({
         title,
         description,
         liveLink,
         githubLink,
         techStack,
         img: { public_id: myCloud.public_id, url: myCloud.secure_url },
      })

      res.status(201).json({
         success: true,
         message: "Created Successfully"
      })

   } catch (error) {
      res.status(400).json({
         success: false,
         error: error.message
      })
   }
}


export const getAllProjects = async (req, res) => {
   try {
      const projects = await Project.find({});

      res.status(200).json({
         success: true,
         projects
      })
   } catch (error) {
      res.status(400).json({
         success: false,
         error: error.message
      })
   }
}


export const updateProject = async (req, res) => {
   try {
      let user = await User.findOne(req.user.Id);
      if (user.role !== "admin") {
         return errorHandler(res, 400, "You are not allowed to update")
      }

      const { title, description, liveLink, githubLink, techStack, image  } = req.body;

      const project = await Project.findById(req.params.id);

      if (!project) return errorHandler(res, 404, "project not found");

      if (title) {
         project.title = title;
      }
      if (description) {
         project.description = description;
      }
      if (liveLink) {
         project.liveLink = liveLink;
      }
      if (githubLink) {
         project.githubLink = githubLink;
      }
      if (techStack) {
         project.techStack = techStack;
      }
      if (image) {
         await cloudinary.v2.uploader.destroy(project.img.public_id);

         const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "Projects"
         });

         project.img.public_id = myCloud.public_id;
         project.img.url = myCloud.secure_url;
      }

      await project.save();

      res.status(200).json({
         success: true,
         message: "Updated Successfully",
         project
      })

   } catch (error) {
      res.status(400).json({
         success: true,
         message: error.message
      })
   }
}


export const deleteProject = async (req, res) => {
   try {
      let user = await User.findOne(req.user.Id);
      if (user.role !== "admin") {
         return errorHandler(res, 400, "You are not allowed to delete")
      }
      let project = await Project.findById(req.params.id)

      await cloudinary.v2.uploader.destroy(project.img.public_id);

      await project.deleteOne();

      res.status(200).json({
         success: true,
         message: "Task Deleted Successfully",
      });
   } catch (error) {
      res.status(400).json({
         success: false,
         error: error.message
      })
   }
}