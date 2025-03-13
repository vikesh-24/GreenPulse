import express from "express"; 
import cors from "cors"; 
import dotenv from "dotenv";
import mongoose from "mongoose"; 
import userRouter from "./routes/userRoutes.js";
import donorRouter from "./routes/donorRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import goalRouter from "./routes/goalRoutes.js"; // Import the new goal router

dotenv.config();

const app = express(); 

// Middleware to enable CORS and parse JSON
app.use(cors()); 
app.use(express.json()); 

// MongoDB URI from environment variables
const uri = process.env.MONGODB_URI; 

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });

// Set port to either environment variable or fallback to 5001
const port = process.env.PORT || 5001; 

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// Default route (Optional)
app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

// Use routers for different resources
app.use("/api/users", userRouter); 
app.use("/api/donors", donorRouter);
app.use("/api/projects", projectRouter);  // Use `/projects` instead of `/project` for consistency

// Add the goal routes
app.use("/api/goals", goalRouter);  // Add new route for goals
