import express from 'express';
import { createCouponCtrl, getAllCouponsCtrl,deleteCouponCtrl,updateCouponCtrl } from '../controllers/couponCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';
const CouponRoutes = express.Router();

// Route to create a new coupon
CouponRoutes.post("/", isLoggedIn,isAdmin,createCouponCtrl);
CouponRoutes.get("/",isLoggedIn, getAllCouponsCtrl);
CouponRoutes.delete("/delete/:id", isLoggedIn, isAdmin, deleteCouponCtrl);
CouponRoutes.put("/update/:id", isLoggedIn, isAdmin, updateCouponCtrl);
export default CouponRoutes;