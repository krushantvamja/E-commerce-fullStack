import express from "express";
import {isLoggedIn} from "../middlewares/isLoggedIn.js";
import { createReview } from "../controllers/ReviewCtrl.js";

const ReviewRouter = express.Router();

ReviewRouter.post('/:ProductId',isLoggedIn, createReview);

export default ReviewRouter;