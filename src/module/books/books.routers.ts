import express from 'express';
import { booksController } from './books.controller';


const BooksRouters = express.Router();


BooksRouters.post('/create-book', booksController.createBookController);

BooksRouters.get('/', booksController.getAllBooksController);

BooksRouters.get('/:categoryId/category', booksController.getBooksByCategoryIdController);

BooksRouters.get('/:bookId', booksController.getBookByIdController);

BooksRouters.put('/:bookId', booksController.updateBookByIdController);

BooksRouters.delete('/:bookId', booksController.deleteBookByIdController);

export default BooksRouters;