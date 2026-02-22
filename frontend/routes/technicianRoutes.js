import express from "express";
import {verifyToken} from "../middleWare/authMiddleware.js";
import { authorizeRoles } from "../middleWare/roleMiddleware.js";
import { getAssignedServices } from "../controllers/technicianController.js";
import { updateServiceStatus } from "../controllers/technicianController.js";

const router = express.Router();

router.get("/dashboard",verifyToken,authorizeRoles("technician"),(req,res)=>{
    res.json({message:"Welcome to technician dashboard"})
})

router.get("/assigned-services",verifyToken,authorizeRoles("technician"),getAssignedServices)
router.put("/update-service-status/:id",verifyToken,authorizeRoles("technician"),updateServiceStatus)
export default router;