import express from "express";
import { verifyToken } from "../middleWare/authMiddleware.js";
import { authorizeRoles } from "../middleWare/roleMiddleware.js";
import { createService, } from "../controllers/serviceController.js";

const router = express.Router();

router.post("/create",verifyToken,authorizeRoles("user"),createService);



export default router;