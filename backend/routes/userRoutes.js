import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  logoutUser,
  uploadPhoto
} from "../controllers/userController.js";
import authenticateUser from "../middleware/authenticateUser.js"; // Import the middleware
import upload from "../middleware/uploadMiddleware.js";

const userRouter = express.Router();

userRouter.get("/allusers", getAllUsers);
userRouter.get("/user/:id", getUser); // Route for fetching a user by ID
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/user/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);
userRouter.get("/logout", logoutUser);
userRouter.post("/upload-photo/:id", authenticateUser, upload.single('photo'), uploadPhoto);

// Protect the profile route with the authentication middleware
userRouter.get("/user/me", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Use userId from the decoded token
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User found", data: user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error fetching user data" });
  }
});

export default userRouter;
