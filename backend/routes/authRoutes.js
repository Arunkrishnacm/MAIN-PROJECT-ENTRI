import express from "express";
import { register, login, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/api/register", register);
router.post("/api/login", login);
router.post("/api/logout", logout);

export default router;
