import express from "express";
import { loginUserCtrl, registerUserCtrl, userProfileCtrl, updateShippingAdressCtrl } from "../controllers/userCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const UserRoutes = express.Router();

UserRoutes.get('/test', (req,res) => {
    res.send("API is working");
})
UserRoutes.post('/register', (req, res, next) => {
    console.log("🔍 Register route hit with data:", req.body);
    next();
}, registerUserCtrl);
UserRoutes.post('/login',loginUserCtrl);
UserRoutes.get('/profile',isLoggedIn,userProfileCtrl);
UserRoutes.put('/update/shipping',isLoggedIn,updateShippingAdressCtrl);


export default UserRoutes;
