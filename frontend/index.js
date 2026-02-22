import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";
import authRoutes from "./routes/authRoutes.js";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRoutes.js";
import technicianRouter from "./routes/technicianRoutes.js";
import serviceRoute from "./routes/serviceRoute.js";
import cookieParser from "cookie-parser";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


// routes
app.use("/api/auth", authRoutes);
app.use("/api/user",userRouter);
app.use("/api/admin",adminRouter);
app.use("/api/technician",technicianRouter);
app.use("/api/services",serviceRoute);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});



app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
