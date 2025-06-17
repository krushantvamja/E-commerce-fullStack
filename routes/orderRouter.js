import express from 'express';
import { createOrderCtrl, getAllOrdersCtrl, getOrderCtrl, updateOrderCtrl, getOrderStatsCtrl } from '../controllers/OrderCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const orderRouter = express.Router();

orderRouter.post('/',isLoggedIn , createOrderCtrl);
orderRouter.get('/', isLoggedIn, getAllOrdersCtrl);
orderRouter.get('/sales/stats', isLoggedIn, getOrderStatsCtrl);
orderRouter.get('/:id', isLoggedIn, getOrderCtrl);
orderRouter.put('/:id', isLoggedIn, updateOrderCtrl);
export default orderRouter; 