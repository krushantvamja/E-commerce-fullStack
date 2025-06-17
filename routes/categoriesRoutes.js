import express from 'express';
import { createCategoryCtrl, deleteCategoryCtrl, getAllCategoriesCtrl, updateCategoryCtrl, getSingleCategoryCtrl} from '../controllers/categoriesCtrl.js';
import {isLoggedIn} from '../middlewares/isLoggedIn.js';
import categoryFileUpload from '../config/categoryUpload.js';

const categoriesRoutes = express.Router();

categoriesRoutes.post('/', isLoggedIn,categoryFileUpload.single('file'), createCategoryCtrl);
categoriesRoutes.get('/', isLoggedIn, getAllCategoriesCtrl);
categoriesRoutes.get('/:id', isLoggedIn, getSingleCategoryCtrl);
categoriesRoutes.delete('/:id', isLoggedIn, deleteCategoryCtrl);
categoriesRoutes.put('/:id', isLoggedIn, updateCategoryCtrl);

export default categoriesRoutes;