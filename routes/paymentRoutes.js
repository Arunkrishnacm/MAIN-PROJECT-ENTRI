import express from "express";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";
import { verifyToken } from "../middleWare/authMiddleware.js";

const router = express.Router();

router.post("/create-order", verifyToken, createOrder);
router.post("/verify-payment", verifyToken, verifyPayment);

export default router;
