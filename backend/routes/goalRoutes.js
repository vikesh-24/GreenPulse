import express from "express";
import {
    addGoal,
    getGoal,
    getAllGoals,
    deleteGoal,
    updateGoal
} from "../controllers/goalController.js"; // Import the Goal controller

const goalRouter = express.Router();

// Route to get all goals
goalRouter.get("/getgoal", getAllGoals);

// Route to get a specific goal by its ID
goalRouter.get("/getgoal/:id", getGoal); 

// Route to create a new goal
goalRouter.post("/addgoal", addGoal); 

// Route to delete a goal by its ID
goalRouter.delete("/delete/:id", deleteGoal);

// Route to update a goal by its ID
goalRouter.put("/putgoal/:id", updateGoal);

export default goalRouter;
