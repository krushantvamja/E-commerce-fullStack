import expressAsyncHandler from 'express-async-handler';
import Color from '../model/Color.js';

export const createColorCtrl = expressAsyncHandler(async (req,res) => {
    const {name} = req.body;
    const colorFound = await Color.findOne({name});
    if(colorFound){
        throw new Error('color already exists');
    }
    const color = await Color.create({
        name,
        user: req.userAuthId,
    })
    res.json({
        status:"success",
        message: "Color created succesfully",
        color,
    })
});

export const getAllColorCtrl = expressAsyncHandler(async(req,res)=>{
    const colors = await Color.find();
    res.json({
        status:"success",
        message: "Colors fetched successfully",
        colors,
    })
});
 
// single category
export const getSingleColorCtrl = expressAsyncHandler(async(req,res)=>{
    const colors = await Color.findById(req.params.id);
    res.json({
        status:"success",
        message: "color fetched successfully",
        colors,
    })
});

// update category
export const updateColorCtrl = expressAsyncHandler(async (req,res) => {
    const {name} = req.body;
    const colors = await Color.findByIdAndUpdate(req.params.id, {
        name,
    },
    {new:true}
    );
    res.json({
        status:"success",
        message : "color updated succesfully",
        colors,
    })
});

// delete category
export const deleteColorCtrl = expressAsyncHandler(async (req,res) =>{
    await Color.findByIdAndDelete(req.params.id);
    
    res.json({
        status:"success",
        message:"color deleted succesfully",
    })
})