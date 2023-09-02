import express from 'express';
import { booksController } from './books.controller';


const BooksRouters = express.Router();


BooksRouters.post('/create-book', booksController.createBookController);

BooksRouters.get('/', booksController.getAllBooksController);

BooksRouters.get('/:categoryId/category', booksController.getBooksByCategoryIdController);

export default BooksRouters;