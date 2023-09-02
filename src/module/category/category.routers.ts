import express from 'express';
import { categoryController } from './category.controller';


const CategoryRouters = express.Router();

CategoryRouters.post('/categories',categoryController.createCategoryController);

CategoryRouters.get('/categories',categoryController.getAllCategoriesController);

CategoryRouters.get('/categories/:id',categoryController.getSingleCategoryController);

CategoryRouters.put('/categories/:id',categoryController.updateCategoryController);

CategoryRouters.delete('/categories/:id',categoryController.deleteCategoryController);


export default CategoryRouters;