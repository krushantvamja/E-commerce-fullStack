import express from "express";
import { createProductCtrl, deleteProductCtrl } from "../controllers/ProductCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {getProductsCtrl, getProductCtrl, updateProductCtrl} from "../controllers/ProductCtrl.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";
const ProductRoutes = express.Router();

ProductRoutes.post('/',isLoggedIn,isLoggedIn,isAdmin, upload.array("files"), createProductCtrl);
ProductRoutes.get('/', getProductsCtrl);
ProductRoutes.get('/:id',getProductCtrl);
ProductRoutes.put('/:id',isLoggedIn,isAdmin,updateProductCtrl);
ProductRoutes.delete('/:id/delete',isLoggedIn,isAdmin,deleteProductCtrl);

export default ProductRoutes;

