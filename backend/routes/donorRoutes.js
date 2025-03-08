import express from "express"; 
import{
    addDonor,
    getDonor,
    getAllDonors,
    deleteDonor,
    updateDonor
} from "../controllers/donorController.js";;

const donorRouter = express.Router(); 

donorRouter.get("/donors",getAllDonors);
donorRouter.get("/donor/:id",getDonor); 
donorRouter.post("/adddonor",addDonor); 
donorRouter.delete("/delete/:id",deleteDonor);
donorRouter.put("/donor/:id",updateDonor);

export default donorRouter;