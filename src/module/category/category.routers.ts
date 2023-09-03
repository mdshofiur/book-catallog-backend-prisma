import express from 'express';
import { categoryController } from './category.controller';
import authenticate from '../../middleware/authMiddleware';


const CategoryRouters = express.Router();

CategoryRouters.post('/categories',authenticate, categoryController.createCategoryController);

CategoryRouters.get('/categories',categoryController.getAllCategoriesController);

CategoryRouters.get('/categories/:id',categoryController.getSingleCategoryController);

CategoryRouters.put('/categories/:id',authenticate,categoryController.updateCategoryController);

CategoryRouters.delete('/categories/:id',authenticate,categoryController.deleteCategoryController);


export default CategoryRouters;