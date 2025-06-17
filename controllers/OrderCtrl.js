import Order from "../model/Order.js";
import Stripe from "stripe";
import Coupon from "../model/Coupon.js";
import dotenv from "dotenv";
dotenv.config();
import expressAsyncHandler from "express-async-handler";
import User from "../model/User.js";
import Product from "../model/Product.js";

const stripe = new Stripe(process.env.STRIPE_KEY);

export const createOrderCtrl = expressAsyncHandler(async (req, res)=>{
    const {orderItems, shippingAddress, totalPrice}  = req.body;
    const {coupon} = req?.query;
    
    const couponFound = await Coupon.findOne({code : coupon?.toUpperCase()});
    if(!couponFound){
        throw new Error("coupon not found");
    }
    if(couponFound?.isExpired){
        throw new Error("Coupon is expired");
    }
   
    const discount = couponFound?.discount /100;
    

    const user = await User.findById(req.userAuthId);
    if(!user?.hasShippingAddress){
        throw new Error("Please provide shipping address");
    }
    if(orderItems?.length <=0){
        throw new Error("No order Item found");
    }

    const order = await Order.create({
        user : user?._id,
        orderItems,
        shippingAddress,
        totalPrice : couponFound ? totalPrice - (discount * totalPrice) : totalPrice,
    })

    console.log(order);

    // const productIds = orderItems.map(item => item._id);
    const products = await Product.find({ _id: { $in: orderItems } });


    orderItems.map(async (order) =>{
        const product = products?.find((product)=>{
            return product?._id.toString() === order?._id.toString();
        });
        if(product){
            product.totalSold += order.qty;
            await product.save();
        }
    })
    user.orders.push(order);
    await user.save();

    const convertedOrders = orderItems.map((item) => {
       return {
         price_data:{
              currency: "usd",
              product_data: {
                 name: item?.name,
                 description: item?.description,
              },
              unit_amount: item?.price * 100, // Stripe expects the amount in cents
         },
         quantity : item?.qty,
       } 
    });

    const session = await stripe.checkout.sessions.create({
        line_items : convertedOrders,
        metadata: {
            orderId : JSON.stringify(order?._id),
        },
        mode: "payment",
        success_url : "http://localhost:3000/success",
        cancel_url : "http://localhost:3000/cancel",
    });
    res.send({url : session.url});
    
});

export const getAllOrdersCtrl = expressAsyncHandler(async(req,res) => {
    const orders = await Order.find();
    res.json({
       status: "success",
       message: "Orders fetched successfully",
       orders,
    })
});

export const getOrderCtrl = expressAsyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id);
    res.json({
        status: "success",
        message: "order fetched succesfully",
        order,
    })
});

export const updateOrderCtrl = expressAsyncHandler(async(req,res) => {
    const id  = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(id, {
        status : req.body.status,
    },{
        new: true,
    });
    res.json({
        status: "success",
        message: "Order updated successfully",
        updatedOrder,
    })
})

export const getOrderStatsCtrl = expressAsyncHandler(async (req,res) => {
    

    //get orders stats
    const orders = await Order.aggregate([
        {       
             $group :{
                _id:null,
                minimumSale:{
                $min : "$totalPrice",
                },
                totalSales : {
                    $sum : "$totalPrice",
                },
                maxSales:{
                    $max: "$totalPrice",      
                },
                avgSales : {
                    $avg: "$totalPrice",   
                },
        }}
    ])
    
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const saleToday = await Order.aggregate([
        {
            $match : {
                createdAt:{
                    $gte : today,
                },
            },
        },
        {
            $group:{
                _id:null,
                totalSales: {
                    $sum : "$totalPrice",
                }
            }
        }
    ])
    res.json({
        success: true,
        message: "Sum of orders ",
        orders,
        saleToday,
    })
})