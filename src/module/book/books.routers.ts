import express from 'express';
import { booksController } from './books.controller';


const BooksRouters = express.Router();

BooksRouters.post('/categories',booksController.createCategoryController);

BooksRouters.get('/categories',booksController.getAllCategoriesController);

BooksRouters.get('/categories/:id',booksController.getSingleCategoryController);

BooksRouters.put('/categories/:id',booksController.updateCategoryController);

BooksRouters.delete('/categories/:id',booksController.deleteCategoryController);


export default BooksRouters;