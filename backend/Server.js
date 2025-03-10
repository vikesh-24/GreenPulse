import express from "express"; 
import cors from "cors"; 
import dotenv from "dotenv";
import mongoose from "mongoose"; 
import userRouter from "./routes/userRoutes.js";
import donorRouter from "./routes/donorRoutes.js";
import projectRouter from "./routes/projectRoutes.js";

dotenv.config();
const app = express(); 

app.use(cors()); 
app.use(express.json()); 

const uri = process.env.MONGODB_URI; 

mongoose.connect(uri).then(() => {
    console.log("Connected to MongoDB");
})

const port = process.env.PORT || 5001; 

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})

app.get("/",(req,res) => {
    res.send("Hello World da punda");
})

app.use("/api/users",userRouter); 
app.use("/api/donors",donorRouter);
app.use("/api/project",projectRouter);
