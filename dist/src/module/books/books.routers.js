"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./books.controller");
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const BooksRouters = express_1.default.Router();
BooksRouters.post('/create-book', authMiddleware_1.default, books_controller_1.booksController.createBookController);
BooksRouters.get('/', books_controller_1.booksController.getAllBooksController);
BooksRouters.get('/:categoryId/category', books_controller_1.booksController.getBooksByCategoryIdController);
BooksRouters.get('/:bookId', books_controller_1.booksController.getBookByIdController);
BooksRouters.put('/:bookId', authMiddleware_1.default, books_controller_1.booksController.updateBookByIdController);
BooksRouters.delete('/:bookId', authMiddleware_1.default, books_controller_1.booksController.deleteBookByIdController);
exports.default = BooksRouters;
