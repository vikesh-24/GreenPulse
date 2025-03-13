import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    goals: {
        type: [String], 
        required: true
    },
    status: {
        type: String,
        enum: ["Not Started", "In Progress", "Completed", "On Hold"],
        default: "Not Started",
        required: true
    }
});

const Project = mongoose.model("Project", projectSchema);

export default Project;