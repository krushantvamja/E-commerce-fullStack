import expressAsyncHandler from 'express-async-handler';
import Category from '../model/Category.js';

export const createCategoryCtrl = expressAsyncHandler(async (req,res) => {
    const {name} = req.body;
    const CategoryFound = await Category.findOne({name});
    if(CategoryFound){
        throw new Error('Category already exists');
    }
    const category = await Category.create({
        name,
        user: req.userAuthId,
        image: req.file.path,
    })
    res.json({
        status:"success",
        message: "Category created succesfully",
        category,
    })
});

export const getAllCategoriesCtrl = expressAsyncHandler(async(req,res)=>{
    const categories = await Category.find();
    res.json({
        status:"success",
        message: "Categories fetched successfully",
        categories,
    })
});
 
// single category
export const getSingleCategoryCtrl = expressAsyncHandler(async(req,res)=>{
    const categories = await Category.findById(req.params.id);
    res.json({
        status:"success",
        message: "Categories fetched successfully",
        categories,
    })
});

// update category
export const updateCategoryCtrl = expressAsyncHandler(async (req,res) => {
    const {name} = req.body;
    const categories = await Category.findByIdAndUpdate(req.params.id, {
        name,
    },
    {new:true}
    );
    res.json({
        status:"success",
        message : "Category updated succesfully",
        categories,
    })
});

// delete category
export const deleteCategoryCtrl = expressAsyncHandler(async (req,res) =>{
    await Category.findByIdAndDelete(req.params.id);
    
    res.json({
        status:"success",
        message:"category deleted succesfully",
    })
})