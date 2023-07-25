import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getAllProjects, createProject, updateProject, deleteProject } from "../controller/project.js";


const router = express.Router();


router.route("/getallproject").get(getAllProjects);

router.route("/upload").post(isAuthenticated, createProject);

router.route("/update/:id").put(isAuthenticated, updateProject);

router.route("/delete/:id").delete(isAuthenticated, deleteProject);



export default router;