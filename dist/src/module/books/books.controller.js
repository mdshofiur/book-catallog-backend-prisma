"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksController = exports.getAllBooksController = void 0;
const books_service_1 = require("./books.service");
const apiResponse_1 = require("../../../utils/apiResponse");
/* -------------------------------------------------------------------------- */
/*                           Create book controller                           */
/* -------------------------------------------------------------------------- */
const createBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, genre, price, publicationDate, categoryId } = req.body;
        const newBook = yield books_service_1.booksService.createBookService({ title, author, genre, price, publicationDate, categoryId });
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: 'Book created successfully',
            data: newBook,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            message: `An error occurred while creating the book. ${error.message}`,
        });
    }
});
/* -------------------------------------------------------------------------- */
/*                           Get all books controller                         */
/* -------------------------------------------------------------------------- */
const getAllBooksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, size = 10, sortBy = 'title', sortOrder = 'asc', minPrice, maxPrice, category, search } = req.query;
        const parsedPage = parseInt(page, 10);
        const parsedSize = parseInt(size, 10);
        // Check if minPrice and maxPrice are valid numbers, otherwise set them to undefined
        const parsedMinPrice = !isNaN(parseFloat(minPrice)) ? parseFloat(minPrice) : undefined;
        const parsedMaxPrice = !isNaN(parseFloat(maxPrice)) ? parseFloat(maxPrice) : undefined;
        const books = yield books_service_1.booksService.getAllBooksService(parsedPage, parsedSize, sortBy, sortOrder, parsedMinPrice, parsedMaxPrice, category, search);
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ success: false, statusCode: 500, message: 'Internal server error' });
    }
});
exports.getAllBooksController = getAllBooksController;
/* -------------------------------------------------------------------------- */
/*                     Get Books by category id controller                    */
/* -------------------------------------------------------------------------- */
function getBooksByCategoryIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = req.params.categoryId;
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        const result = yield books_service_1.booksService.getBooksByCategoryIdService(categoryId, page, size);
        if (result.success) {
            res.status(200).json(result);
        }
        else {
            res.status(result.statusCode || 500).json({
                success: false,
                message: result.message || 'Internal server error',
            });
        }
    });
}
/* -------------------------------------------------------------------------- */
/*                               Get Book by id                               */
/* -------------------------------------------------------------------------- */
const getBookByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_service_1.booksService.getBookByIdService(bookId);
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: 'Book fetched successfully',
            data: book,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            message: `An error occurred while fetching the book. ${error.message}`,
        });
    }
});
/* -------------------------------------------------------------------------- */
/*                                   update                                   */
/* -------------------------------------------------------------------------- */
const updateBookByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const bookData = req.body;
        const updatedBook = yield books_service_1.booksService.updateBookByIdService(bookId, bookData);
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: 'Book updated successfully',
            data: updatedBook,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            message: `An error occurred while updating the book. ${error.message}`,
        });
    }
});
/* -------------------------------------------------------------------------- */
/*                        delete book by id controller                        */
/* -------------------------------------------------------------------------- */
const deleteBookByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const deletedBook = yield books_service_1.booksService.deleteBookByIdService(bookId);
        (0, apiResponse_1.sendApiResponse)(res, {
            success: true,
            statusCode: 200,
            message: 'Book deleted successfully',
            data: deletedBook,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            success: false,
            statusCode: 500,
            message: `An error occurred while deleting the book. ${error.message}`,
        });
    }
});
exports.booksController = {
    createBookController,
    getAllBooksController: exports.getAllBooksController,
    getBooksByCategoryIdController,
    getBookByIdController,
    updateBookByIdController,
    deleteBookByIdController,
};
