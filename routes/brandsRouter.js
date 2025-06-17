import express from 'express';
import { createBrandCtrl, deleteBrandCtrl, getAllBrandsCtrl, updateBrandCtrl, getSingleBrandCtrl} from '../controllers/brandsCtrl.js';
import {isLoggedIn} from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

const brandsRoutes = express.Router();

brandsRoutes.post('/', isLoggedIn,isAdmin, createBrandCtrl);
brandsRoutes.get('/', isLoggedIn, getAllBrandsCtrl);
brandsRoutes.get('/:id', isLoggedIn, getSingleBrandCtrl);
brandsRoutes.delete('/:id', isLoggedIn,isAdmin, deleteBrandCtrl);
brandsRoutes.put('/:id', isLoggedIn,isAdmin, updateBrandCtrl);

export default brandsRoutes;