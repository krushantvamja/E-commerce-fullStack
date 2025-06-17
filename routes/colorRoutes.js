import express from 'express';
import { createColorCtrl, deleteColorCtrl, getAllColorCtrl, updateColorCtrl, getSingleColorCtrl} from '../controllers/colorCtrl.js';
import {isLoggedIn} from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

const colorRoutes = express.Router();

colorRoutes.post('/', isLoggedIn, isAdmin,createColorCtrl);
colorRoutes.get('/', isLoggedIn, getAllColorCtrl);
colorRoutes.get('/:id', isLoggedIn, getSingleColorCtrl);
colorRoutes.delete('/:id', isLoggedIn,isAdmin, deleteColorCtrl);
colorRoutes.put('/:id', isLoggedIn,isAdmin, updateColorCtrl);

export default colorRoutes;