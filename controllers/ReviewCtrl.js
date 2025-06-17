import expressAsyncHandler from 'express-async-handler';
import Review from "../model/Review.js";
import Product from "../model/Product.js";  


export const createReview = expressAsyncHandler(async (req,res) => {
    const {message, rating, product} = req.body;
    const {ProductId} = req.params;
    const ProductFound = await Product.findById(ProductId).populate('reviews');
    if(!ProductFound){
        throw new Error('product not found');
    }
    const hasReviewed = ProductFound?.reviews?.find((review) => {
        return review?.user.toString() === req.userAuthId.toString();
    });
    if(hasReviewed){
        throw new Error('you have already reviewed this product');
    }
    const review = await Review.create({
        message,
        rating, 
        product: ProductFound?._id,
        user: req.userAuthId,
        });
    
    ProductFound.reviews.push(review._id);
    await ProductFound.save();
    res.status(201).json({
        status: 'success',
        message: 'review created successfully',
    });
});
