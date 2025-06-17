import expressAsyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Category from "../model/Category.js";
import Brand from '../model/Brand.js'
export const createProductCtrl = expressAsyncHandler(async (req,res) => {
    console.log(req.file); 
    // const {name,brand,description,category,sizes,colors,price,totalQty} = req.body;
    // const productExists = await Product.findOne({name});
    // if(productExists){
    //     throw new Error("Product already exists");
    // }
    // const brandFound = await Brand.findOne({
    //     name: brand?.toLowerCase(),
    // });
    // if(!brandFound){
    //     throw new Error("brand not found");
    // }

    
    // const categoryFound = await Category.findOne({
    //     name: category,
    // });
    // if(!categoryFound){
    //     throw new Error("category not found");
    // }
    // // checking if user already exuts
    
    // //create product
    // const product = await Product.create({
    //     name,
    //     brand,
    //     description,
    //     category,
    //     sizes,
    //     colors,
    //     user: req.userAuthId,
    //     price,
    //     totalQty
    // });
    // categoryFound.products.push(product._id);
    // await categoryFound.save();
    // brandFound.products.push(product._id);
    // await brandFound.save();

    // res.json({
    //     status:"success",
    //     message : "Product created successfully",
    //     product
    // })
})

export const getProductsCtrl = expressAsyncHandler(async (req,res) => {
    let productQuery =  Product.find();
    //search by name
    if(req.query.name){
        productQuery = productQuery.find({
            name : {$regex: req.query.name, $options: "i"},
        })
    }
    //search by brand
    if(req.query.brand){
        productQuery = productQuery.find({
            brand : {$regex: req.query.brand, $options: "i"},
        })
    }
    //search by category
    if(req.query.category){
        productQuery = productQuery.find({
            category : {$regex: req.query.category, $options: "i"},
        })
    }
    //search by color
    if(req.query.colors){
        productQuery = productQuery.find({
            colors : {$regex: req.query.colors, $options: "i"},
        })
    }
    //search by size
    if(req.query.sizes){
        productQuery = productQuery.find({
            sizes : {$regex: req.query.sizes, $options: "i"},
        })
    }
    //search by price
    if(req.query.price){
        const PriceRange = req.query.price.split("-");
        productQuery = productQuery.find({
            price : {$gte:PriceRange[0] , $lte:PriceRange[1]},
        })
    }

    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Product.countDocuments();
    productQuery = productQuery.skip(startIndex).limit(limit);

    const pagination = {};
    if(endIndex < total){
        pagination.next = {
            page: page + 1,
            limit: limit
        }
    }
    if(startIndex >0){
        pagination.prev = {
            page: page - 1,
            limit: limit
        }
    }

    const products = await productQuery.populate('reviews');

    res.json({
        status:"success",
        total,
        results : products.length,
        pagination,
        products,
    })
})

export const getProductCtrl = expressAsyncHandler(async (req,res) => {
    const {id} = req.params;
    const product = await Product.findById(id).populate('reviews');
    if(!product){
        throw new Error("Product not found")
    }
    res.json({
        status:"success",
        product,
    });

});

export const updateProductCtrl = expressAsyncHandler(async (req,res) => {
    const {name,brand,description,category,sizes,colors,user,price,totalQty} = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, {
        name,
        brand,
        description,
        category,
        sizes,
        colors,
        user,
        price,
        totalQty
    },
    {new:true}
    );
    res.json({
        status:"success",
        message : "Product updated succesfully",
        product,
    })
});

export const deleteProductCtrl = expressAsyncHandler(async (req,res) =>{
    await Product.findByIdAndDelete(req.params.id);
    
    res.json({
        status:"success",
        message:"product deleted succesfully",
    })
})