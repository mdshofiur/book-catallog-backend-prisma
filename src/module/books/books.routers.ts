import express from 'express';
import { booksController } from './books.controller';
import authenticate from '../../middleware/authMiddleware';


const BooksRouters = express.Router();


BooksRouters.post('/create-book',authenticate, booksController.createBookController);

BooksRouters.get('/', booksController.getAllBooksController);

BooksRouters.get('/:categoryId/category', booksController.getBooksByCategoryIdController);

BooksRouters.get('/:bookId', booksController.getBookByIdController);

BooksRouters.put('/:bookId',authenticate, booksController.updateBookByIdController);

BooksRouters.delete('/:bookId', authenticate, booksController.deleteBookByIdController);

export default BooksRouters;