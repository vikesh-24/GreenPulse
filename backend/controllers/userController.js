import { User } from "../models/user.js"; 
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs/promises";

export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, age, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    if (password.length < 8 || password.length > 20) {
      return res.status(400).json({ message: "Password must be between 8 and 20 characters" });
    }
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with photo field
    const user = await User.create({
      firstname,
      lastname,
      email,
      age,
      role,
      password: hashedPassword,
      photo: '' // Initialize with empty string
    });

    if (user) {
      return res.status(201).json({ 
        message: "User registered successfully", 
        data: user 
      });
    }

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error when registering user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: "1h" });

    // Attach the token to the response headers
    res.setHeader("Authorization", `Bearer ${token}`);

    // Return the user data along with the token and role
    return res.status(200).json({
      message: "User Logged In Successfully",
      token,
      firstname: user.firstname,
      data: user,
      role: user.role // Ensure you send the user's role
    });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error When Logging In" });
  }
};

export const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    return res.status(200).json({ message: "User Found", data: user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error When Getting User" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "Users Found", data: users });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error When Getting Users" });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    // Find the user by ID
    const user = await User.findById(userId);

    // If user is not found
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Update user properties
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.age = req.body.age || user.age;

    // Save the updated user
    const updatedUser = await user.save();

    // Return the updated user
    return res.status(200).json({ message: "User Updated Successfully", data: updatedUser });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error When Updating User" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (user) {
      await User.findByIdAndDelete(userId);
      return res.status(200).json({ message: "User Deleted Successfully" });
    } else {
      return res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error When Deleting User" });
  }
};

export const logoutUser = async (req, res) => {
  res.setHeader("Authorization", "");
  return res.status(200).json({ message: "User Logged Out Successfully" });
};

export const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user already has a photo, you might want to delete the old file
    // This is optional and depends on your requirements
    if (user.photo) {
      const oldPhotoPath = path.join(__dirname, '..', user.photo);
      try {
        await fs.unlink(oldPhotoPath);
      } catch (error) {
        console.error('Error deleting old photo:', error);
        // Continue with the update even if old photo deletion fails
      }
    }

    // Update user's photo field with the file path
    user.photo = `/uploads/${req.file.filename}`;
    await user.save();

    return res.status(200).json({ 
      message: "Photo uploaded successfully", 
      data: user 
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error uploading photo" });
  }
};
