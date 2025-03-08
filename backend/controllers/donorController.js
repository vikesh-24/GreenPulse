import Donor from "../models/donor.js";


export const addDonor = async (req, res) => {
    try {
        const { name, amount, date, email, phonenumber } = req.body;

        // Ensure date is properly formatted
        const formattedDate = date ? new Date(date) : undefined; 

        const donor = await Donor.create({
            name,
            amount,
            date: formattedDate,  // Ensure date is a valid Date object
            email,
            phonenumber
        });

        if (donor) {
            return res.status(201).json({ message: "Donor Added Successfully", data: donor });
        } else {
            return res.status(400).json({ message: "Error when adding donor" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error during adding donor" });
    }
};

export const getAllDonors = async(req,res) => {
    try {
        const donors = await Donor.find(); 
        if(donors){
            return res.status(200).json({message:"Founded Donors",data:donors});
        }
        else{
            return res.status(400).json({message:"Error when getting donors"});
        }
    } catch (error) {
        console.error(error.message); 
        return res.status(500).json({message:"Error during getting donors"});
        
    }
} 

export const getDonor = async(req,res) => {
    const donorId = req.params.id; 
    try {
        const donor = await Donor.findById({_id:donorId}); 
        if(donor){
            return res.status(200).json({message:"Founded Donor",data:donor});
        }
        else{
            return res.status(400).json({message:"Error when getting donor"});
        }
    } catch (error) {
        console.error(error.message); 
        return res.status(500).json({message:"Error during getting donor"});
        
    }
} 

export const deleteDonor = async(req,res) => {
    const donorId = req.params.id; 
    try {
        const donor = await Donor.findByIdAndDelete({_id:donorId}); 
        if(donor){
            return res.status(200).json({message:"Donor Deleted Successfully"});
        }
        else{
            return res.status(400).json({message:"Error when deleting donor"});
        }
    } catch (error) {
        console.error(error.message); 
        return res.status(500).json({message:"Error during deleting donor"});
        
    }
} 

export const updateDonor = async(req,res) => {
    const donorId = req.params.id; 
    try {
        const donor = await Donor.findByIdAndUpdate({_id:donorId},req.body,{new:true}); 
        if(donor){
            return res.status(200).json({message:"Donor Updated Successfully",data:donor});
        }
        else{
            return res.status(400).json({message:"Error when updating donor"});
        }
    } catch (error) {
        console.error(error.message); 
        return res.status(500).json({message:"Error during updating donor"});
        
    }
}