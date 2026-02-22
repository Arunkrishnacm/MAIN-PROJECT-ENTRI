
import bcrypt from "bcrypt";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";



// Registration route
const saltRounds = 10;
export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role:role || "user",
        });

        await user.save();
        

        return res.status(201).json({
            message: "User registered successfully",
        });

    } catch (err) {
        return res.status(500).json({
            message: "Registration failed",
            error: err.message,
        });
    }
};


// Login route
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id:user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax"
        });

        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        return res.status(400).json({ message: "Login failed" });
    }
};



export const logout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
}

