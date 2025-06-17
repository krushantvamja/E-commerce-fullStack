import express from "express";
import Stripe from "stripe";
import dbConnect from "../config/dbConnect.js";
import dotenv from "dotenv";
import UserRoutes from '../routes/usersRoutes.js';
import brandRoutes from '../routes/brandsRouter.js';
import colorRouter from '../routes/colorRoutes.js'; 
import ProductRoutes from '../routes/productRoutes.js';
import categoriesRouter from '../routes/categoriesRoutes.js';
import OrderRoutes from '../routes/orderRouter.js';
// import async from "express-async-handler";
import { globalErrHandler, notFound } from "../middlewares/globalErrHandler.js";
import ReviewRouter from "../routes/ReviewRouter.js";
import Order from "../model/Order.js";
import CouponRoutes from "../routes/couponRoutes.js";
dotenv.config();
//db connect
dbConnect();
const app = express();

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = new Stripe(process.env.STRIPE_KEY);

// If you are testing your webhook locally with the Stripe CLI you
// can find the endpoint's secret by running `stripe listen`
// Otherwise, find your endpoint's secret in your webhook settings in the Developer Dashboard
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// This example uses Express to receive webhooks


// Match the raw body to content type application/json
app.post('/webhooks', express.raw({type: 'application/json'}),async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log("✅ Verified webhook event:", event.type);
    // console.log(event);
  }
  catch (err) {
    console.error("❌ Stripe Webhook Error:", err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }
   if(event.type === "checkout.session.completed"){
    // update the order
    const session = event.data.object;
    const {orderId} = session.metadata;
    const paymentStatus = session.payment_status;
    const paymentMethod = session.payment_method_types[0];
    const totalAmount = session.amount_total;
    const currency = session.currency;
    
    const order = await Order.findByIdAndUpdate(JSON.parse(orderId),{
        totalPrice: totalAmount / 100, // Convert cents to dollars
        currency,
        paymentStatus,
        paymentMethod,
    },{
        new:true,
    });
    console.log(order);
    console.log("🔔 Webhook received:", event.type);
console.log("Session metadata:", event.data.object.metadata);

   }else{
    return;
   }
  // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntent = event.data.object;
//       console.log('PaymentIntent was successful!');
//       break;
//     case 'payment_method.attached':
//       const paymentMethod = event.data.object;
//       console.log('PaymentMethod was attached to a Customer!');
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});





app.use(express.json());

//routes
app.get("/", (req, res) => {
    res.send("API is running...");   
})


app.use('/api/v1/users/',UserRoutes);
app.use('/api/v1/products/',ProductRoutes);
app.use('/api/v1/categories/', categoriesRouter);
app.use('/api/v1/brands/', brandRoutes);
app.use('/api/v1/colors/', colorRouter);
app.use('/api/v1/reviews/', ReviewRouter);
app.use('/api/v1/orders/', OrderRoutes);
app.use('/api/v1/coupons/', CouponRoutes);


//middlewares
app.use(notFound);
app.use(globalErrHandler);

export default app;
