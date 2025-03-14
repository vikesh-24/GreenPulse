import {User} from "../models/user.js"; 
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt";

export const registerUser = async(req,res) => {
    try {
        const {firstname,lastname,email,age,password} = req.body;
        
        const existingUser = await User.findOne({email}); 

        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
      
        
        const salt = await bcrypt.genSalt(10); 
        if(password.length < 8 || password.length > 20){
            return res.status(400).json({message:"Password must be between 8 and 20 characters"});
        }
        const hashedPassword = await bcrypt.hash(password,salt);

        

        const user = await User.create({
            firstname,
            lastname,
            email,
            age,
            password:hashedPassword
        }) 
        if(user){
           return res.status(201).json({message:"User registered successfully",data:user});
        }
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message:"Error when registering user"});
    }
} 

export const loginUser = async(req,res) => {
    try {
    const {email,password} = req.body;
    const user = await User.findOne({email}); 

    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password); 

    if(!isPasswordCorrect){
        return res.status(401).json({message:"Invalid Password"});
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; 
   

    const token = jwt.sign({id:user._id},JWT_SECRET_KEY,{expiresIn:"1h"}); 

    res.setHeader("Authorization",`Bearer ${token}`); 
    return res.status(200).json({message:"User Logged In Successfully",token,data:user});

    
    return 
        
    } catch (error) {
        console.error(error.message); 
        return res.status(500).json({message:"Error When Logging In"});
    }

} 

export const getUser = async(req,res) => {
    const userId = req.params.id; 
    try {
        const user = await User.findById(userId); 
        return res.status(200).json({message:"User Found",data:user});
    } catch (error) {
        console.error(error.message); 
        return res.status(500).json({message:"Error When Getting User"});
        
    }
} 

export const getAllUsers = async(req,res) => {
    try {
        const users = await User.find(); 
        return res.status(200).json({message:"Users Found",data:users});
    } catch (error) {
        console.error(error.message); 
        return res.status(500).json({message:"Error When Getting Users"});
        
    }
} 

export const updateUser = async(req,res) => {
    const userId = req.params.id; 
    try {
        const user = await User.findById(userId); 
        if(!user){
            return res.status(404).json({message:"User Not Found"});
        }

        const updatedUser = await User.findByIdAndUpdate(userId,
            {
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                age:req.body.age
            },
            {new:true}
        )
        return res.status(200).json({message:"User Updated Successfully",data:updatedUser});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message:"Error When Updating User"});
    }
} 

export const deleteUser = async(req,res) => {
    const userId = req.params.id; 
    try{
        const user = await User.findById(userId);
        if(user){
            await User.findByIdAndDelete(userId);
            return res.status(200).json({message:"User Deleted Successfully"});
        }
        else{
            return res.status(404).json({message:"User Not Found"});
        }

    }
    catch(error){
        console.error(error.message); 
        return res.status(500).json({message:"Error When Deleting User"});
    }
} 

export const logoutUser = async(req,res) => {
    res.setHeader("Authorization",""); 
    return res.status(200).json({message:"User Logged Out Successfully"});
}