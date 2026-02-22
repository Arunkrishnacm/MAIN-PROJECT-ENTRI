import express from "express";
import { verifyToken } from "../middleWare/authMiddleware.js";
import { authorizeRoles } from "../middleWare/roleMiddleware.js";
import { getUserServices } from "../controllers/serviceController.js";

const router = express.Router();
router.get("/profile",verifyToken,(req,res)=>{
    res.json(req.user)
}
)

router.get("/my-services",verifyToken,authorizeRoles("user"),getUserServices);

export default router;