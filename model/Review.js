import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required : [true, "product is required"],
    },
    rating:{
        type:Number,
        required: [true, "Rating is required"],
        min : 1,
        max : 5,
    },
    message:{
        type: String,
        required : [true, "message is required"],
    }

},{
    timestamps: true,
});

const Review  = mongoose.model("Review", reviewSchema);

export default Review;