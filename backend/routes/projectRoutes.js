import express from "express";
import {
    addProject,
    getProject,
    getAllProjects,
    deleteProject,
    updateProject
} from "../controllers/projectController.js";

const projectRouter = express.Router();

projectRouter.get("/projects", getAllProjects);
projectRouter.get("/project/:id", getProject);
projectRouter.post("/addproject", addProject);
projectRouter.delete("/delete/:id", deleteProject);
projectRouter.put("/project/:id", updateProject);

export default projectRouter;