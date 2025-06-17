import User from "../model/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/genrateToken.js";
import expressAsyncHandler from "express-async-handler";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

// Register User
export const registerUserCtrl = expressAsyncHandler(async (req, res, next) => {
    try {
        console.log("🔍 Register route hit", req.body);

        const { fullName, email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log("⚠️ User already exists");
            return res.status(400).json({
                status: "fail",
                message: "User already exists",
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        console.log("✅ User registered:", user);

        // Send response
        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});



// Login User
export const loginUserCtrl = expressAsyncHandler(async (req, res) => {
    try {
        console.log("🔍 Login route hit");

        const { email, password } = req.body;

        // Check if the user exists
        const userFound = await User.findOne({ email });

        if (!userFound) {
            console.log("❌ User not found");
            return res.status(401).json({ status: "fail", message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            console.log("❌ Incorrect password");
            return res.status(401).json({ status: "fail", message: "Invalid email or password" });
        }

        console.log("✅ User logged in successfully:", userFound.fullName);
        res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            user: { id: userFound._id, fullName: userFound.fullName, email: userFound.email },
            token: generateToken(userFound._id),
        });
    } catch (error) {
        console.error("❌ Error logging in:", error.message);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});


// User Profile
export const userProfileCtrl = expressAsyncHandler(async (req, res) => {
   const user = await User.findById(req.userAuthId).populate("orders");
   res.json({
    status: "success",
    message: "user profiled fetched successfully",
    user,
   })
});


export const updateShippingAdressCtrl = expressAsyncHandler(async (req, res) => {
    const {firstName,LastName,address,city,postalCode,province,country,phoneNumber} = req.body;
    const user = await User.findByIdAndUpdate(req.userAuthId, {
        shippingAddress : {
            firstName,
            LastName,
            address,
            city,
            postalCode,
            province,
            country,
            phoneNumber
        },
        hasShippingAddress : true,
    },{
        new :true,
    });  
    res.json({
        status:"success",
        message: "Shipping address updated successfully",
        user,
    })
});


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTNjMDFiN2MwZjg4M2U5MGUwNmM3MiIsImlhdCI6MTc0Mjk5NjM4OCwiZXhwIjoxNzQzMjU1NTg4fQ.cYLfJdQEeoeXoSyWl1G-L82I0rpkpaze_U41WYIrRgM
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTNjMDFiN2MwZjg4M2U5MGUwNmM3MiIsImlhdCI6MTc0Mjk5NjY1MSwiZXhwIjoxNzQzMjU1ODUxfQ.3ELtcZ4iLhhF4HMc4ENpHKq4Z_4x0E6Mtu8O0C8sVOs