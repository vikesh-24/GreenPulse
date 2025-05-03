import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        include:'@'
    },
    photo: {
        type: String,
        default: '' // Default empty string for no photo
    },
    role: { 
        type: String, 
        enum: ["user", "doner", "admin"],
        default: "user",  // Default role set to "user"
        required: true 
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
}) 

export const User = mongoose.model("User",userSchema);