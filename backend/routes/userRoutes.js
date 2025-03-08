import express from "express";
import {
    registerUser,
    loginUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    logoutUser
} from "../controllers/userController.js"; 

const userRouter = express.Router(); 

userRouter.get("/allusers",getAllUsers); 
userRouter.get("/user/:id",getUser); 
userRouter.post("/register",registerUser); 
userRouter.post("/login",loginUser); 
userRouter.put("/user/:id",updateUser);
userRouter.delete("/delete/:id",deleteUser);
userRouter.get("/logout",logoutUser);

export default userRouter;

