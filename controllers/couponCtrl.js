import expressAsyncHandler from 'express-async-handler';
import Coupon from "../model/Coupon.js";

// Create a new coupon
export const createCouponCtrl = expressAsyncHandler(async (req, res) => {
    const {discount, startDate, endDate, code} = req.body;
    const codeAlreadyExists = await Coupon.findOne({
        code,
    });
    if(codeAlreadyExists){
        throw new Error("Coupon code already exists");
    }
    if(isNaN(discount)){
        throw new Error("Discount must be a number");
    };
    const coupon = await Coupon.create({
        code : code?.toUpperCase(),
        startDate,
        endDate,
        discount,
        user: req.userAuthId,
    })
    res.status(201).json({
        status:"success",
        message:"coupon created succesfully",
        coupon,
    })
});

export const getAllCouponsCtrl = expressAsyncHandler(async (req,res) => {
    const coupons = await Coupon.find();
    res.status(201).json({
        status: "success",
        message:"all coupons fetched succesfully",
        coupons,
    });
});

export const deleteCouponCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) {
        throw new Error("Coupon not found");
    }
    res.status(200).json({
        status: "success",
        message: "Coupon deleted successfully",
        coupon,
    });
});

export const updateCouponCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { discount, startDate, endDate, code } = req.body;

    const coupon = await Coupon.findById(id);
    if (!coupon) {
        throw new Error("Coupon not found");
    }
    if (isNaN(discount)) {
        throw new Error("Discount must be a number");
    }
    const updatedCoupon = await Coupon.findByIdAndUpdate(
        id,
        {
            code: code?.toUpperCase(),
            startDate,
            endDate,
            discount,
        },
        { new: true }
    );
    res.status(200).json({
        status: "success",
        message: "Coupon updated successfully",
        coupon: updatedCoupon,
    });
}
);