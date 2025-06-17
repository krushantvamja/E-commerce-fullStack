import expressAsyncHandler from 'express-async-handler';
import Brand from '../model/Brand.js';

export const createBrandCtrl = expressAsyncHandler(async (req,res) => {
    const {name} = req.body;
    const BrandFound = await Brand.findOne({name});
    if(BrandFound){
        throw new Error('Brand already exists');
    }
    const brand = await Brand.create({
        name : name.toLowerCase(),
        user: req.userAuthId,
    })
    res.json({
        status:"success",
        message: "Brand created succesfully",
        brand,
    })
});

export const getAllBrandsCtrl = expressAsyncHandler(async(req,res)=>{
    const brands = await Brand.find();
    res.json({
        status:"success",
        message: "Brands fetched successfully",
        brands,
    })
});
 
// single category
export const getSingleBrandCtrl = expressAsyncHandler(async(req,res)=>{
    const brands = await Brand.findById(req.params.id);
    res.json({
        status:"success",
        message: "brand fetched successfully",
        brands,
    })
});

// update category
export const updateBrandCtrl = expressAsyncHandler(async (req,res) => {
    const {name} = req.body;
    const brands = await Brand.findByIdAndUpdate(req.params.id, {
        name,
    },
    {new:true}
    );
    res.json({
        status:"success",
        message : "Brand updated succesfully",
        brands,
    })
});

// delete category
export const deleteBrandCtrl = expressAsyncHandler(async (req,res) =>{
    await Brand.findByIdAndDelete(req.params.id);
    
    res.json({
        status:"success",
        message:"brand deleted succesfully",
    })
})