import mongoose from "mongoose"; 

const donorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
    email:{
        type:String,
        required:true,
        include:'@'
    },
    phonenumber:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['refunded','not-refunded','pending'],
        default:'not-refunded'
    }
}); 

const Donor = mongoose.model("Donor",donorSchema);

export default Donor;