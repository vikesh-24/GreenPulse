import Goal from "../models/goal.js"; // Import the Goal model

// Create Goal

export const addGoal = async (req, res) => {
    try {
        // Log the received data
        console.log('Received goal data:', req.body);

        const { goalType, targetValue, currentValue, startDate, endDate, status } = req.body;

        // Ensure startDate and endDate are properly formatted
        const formattedStartDate = startDate ? new Date(startDate) : undefined;
        const formattedEndDate = endDate ? new Date(endDate) : undefined;

        // Create the goal in the database
        const goal = await Goal.create({
            goalType,
            targetValue,
            currentValue,  // Include currentValue here
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            status
        });

        if (goal) {
            return res.status(201).json({ message: "Goal Added Successfully", data: goal });
        } else {
            return res.status(400).json({ message: "Error when adding goal" });
        }
    } catch (error) {
        console.error('Error during goal creation:', error.message);
        return res.status(500).json({ message: "Error during adding goal" });
    }
};

// Get All Goals
export const getAllGoals = async (req, res) => {
    try {
        const goals = await Goal.find(); 
        if (goals) {
            return res.status(200).json({ message: "Found Goals", data: goals });
        } else {
            return res.status(400).json({ message: "Error when getting goals" });
        }
    } catch (error) {
        console.error(error.message); 
        return res.status(500).json({ message: "Error during getting goals" });
    }
};

// Get Goal by ID
export const getGoal = async (req, res) => {
    const goalId = req.params.id; 
    try {
        const goal = await Goal.findById({ _id: goalId });
        if (goal) {
            return res.status(200).json({ message: "Goal Found", data: goal });
        } else {
            return res.status(400).json({ message: "Error when getting goal" });
        }
    } catch (error) {
        console.error(error.message); 
        return res.status(500).json({ message: "Error during getting goal" });
    }
};

// Delete Goal
export const deleteGoal = async (req, res) => {
    const goalId = req.params.id; 
    try {
        const goal = await Goal.findByIdAndDelete({ _id: goalId });
        if (goal) {
            return res.status(200).json({ message: "Goal Deleted Successfully" });
        } else {
            return res.status(400).json({ message: "Error when deleting goal" });
        }
    } catch (error) {
        console.error(error.message); 
        return res.status(500).json({ message: "Error during deleting goal" });
    }
};

// Update Goal
export const updateGoal = async (req, res) => {
    const goalId = req.params.id; 
    try {
        const goal = await Goal.findByIdAndUpdate({ _id: goalId }, req.body, { new: true });
        if (goal) {
            return res.status(200).json({ message: "Goal Updated Successfully", data: goal });
        } else {
            return res.status(400).json({ message: "Error when updating goal" });
        }
    } catch (error) {
        console.error(error.message); 
        return res.status(500).json({ message: "Error during updating goal" });
    }
};
