import express from "express";
import {verifyToken } from "../middleWare/authMiddleware.js";
import { authorizeRoles } from "../middleWare/roleMiddleware.js";
import { assignTechnician, getAllServices, getAllUsers } from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard",verifyToken,authorizeRoles("admin"),(req,res)=>{
    res.json({message:"Welcome to admin dashboard"})
})

router.put("/assign-service/:id",verifyToken,authorizeRoles("admin"),assignTechnician)

router.get("/services",verifyToken,authorizeRoles("admin"),getAllServices)

router.get("/users",verifyToken,authorizeRoles("admin"),getAllUsers)

export default router;