import Project from "../models/project.js";

// Add a new project
export const addProject = async (req, res) => {
    try {
        const { name, type, description, startDate, endDate, status } = req.body;

        const project = await Project.create({
            name,
            type,
            description,
            startDate,
            endDate,
            status
        });

        if (project) {
            return res.status(201).json({ message: "Project Added Successfully", data: project });
        } else {
            return res.status(400).json({ message: "Error when adding project" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error during adding project" });
    }
};

// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        if (projects) {
            return res.status(200).json({ message: "Found Projects", data: projects });
        } else {
            return res.status(400).json({ message: "Error when getting projects" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error during getting projects" });
    }
};

// Get a single project by ID
export const getProject = async (req, res) => {
    const projectId = req.params.id;
    try {
        const project = await Project.findById({ _id: projectId });
        if (project) {
            return res.status(200).json({ message: "Found Project", data: project });
        } else {
            return res.status(400).json({ message: "Error when getting project" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error during getting project" });
    }
};

// Delete a project by ID
export const deleteProject = async (req, res) => {
    const projectId = req.params.id;
    try {
        const project = await Project.findByIdAndDelete({ _id: projectId });
        if (project) {
            return res.status(200).json({ message: "Project Deleted Successfully" });
        } else {
            return res.status(400).json({ message: "Error when deleting project" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error during deleting project" });
    }
};

// Update a project by ID
export const updateProject = async (req, res) => {
    const projectId = req.params.id;
    try {
        const project = await Project.findByIdAndUpdate({ _id: projectId }, req.body, { new: true });
        if (project) {
            return res.status(200).json({ message: "Project Updated Successfully", data: project });
        } else {
            return res.status(400).json({ message: "Error when updating project" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error during updating project" });
    }
};